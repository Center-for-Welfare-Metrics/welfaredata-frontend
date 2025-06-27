import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import {
  Container,
  SelectContainer,
  SelectInput,
  DropdownContainer,
  DropdownItem,
  Label,
  Error,
  SearchInput,
  Placeholder,
  NoResults,
} from "./styled";
import { ChevronDown, Plus } from "react-feather";
import { Text } from "../Text";
import { FlexRow } from "../desing-components/Flex";
import { ThemeColors } from "theme/globalStyle";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface ISelectBase {
  options: SelectOption[];
  error?: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  customStyle?: React.CSSProperties;
}

export interface ISelectProps extends ISelectBase {
  name?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  defaultValue?: string | number;
  noOptionsText?: string;
  onClickAdd?: (inputValue: string) => void;
}

export const Select = forwardRef<HTMLDivElement, ISelectProps>(
  (
    {
      name,
      options,
      value,
      onChange,
      error,
      label,
      placeholder,
      disabled = false,
      searchable = true,
      defaultValue,
      customStyle,
      noOptionsText = "No options available",
      onClickAdd,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedValue, setSelectedValue] = useState<
      string | number | undefined
    >(defaultValue || value);
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Update internal state when value prop changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    const handleToggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSearchValue("");
      }
    };

    const handleOptionSelect = (option: SelectOption) => {
      setSelectedValue(option.value);
      onChange?.(option.value);
      setIsOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    };

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    const getSelectedLabel = () => {
      const selected = options.find((option) => option.value === selectedValue);
      return selected ? selected.label : placeholder || "";
    };

    const hasValue = selectedValue !== undefined && selectedValue !== "";

    return (
      <Box width="100%">
        <Container style={customStyle} ref={containerRef}>
          <SelectContainer>
            <Label $hasValue={hasValue} $isFocused={isOpen} htmlFor={name}>
              {label}
            </Label>

            <SelectInput
              className={`${isOpen ? "focused" : ""} ${disabled ? "disabled" : ""}`}
              onClick={handleToggleDropdown}
              ref={ref}
              id={name}
            >
              {hasValue ? (
                <span>{getSelectedLabel()}</span>
              ) : (
                <Placeholder>{placeholder || "Select an option"}</Placeholder>
              )}
              <ChevronDown />
            </SelectInput>

            {isOpen && (
              <DropdownContainer>
                {searchable && (
                  <SearchInput
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    ref={searchInputRef}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <DropdownItem
                      key={option.value}
                      $isSelected={selectedValue === option.value}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option.label}
                    </DropdownItem>
                  ))
                ) : (
                  <>
                    <NoResults>{noOptionsText}</NoResults>
                  </>
                )}
                {!!onClickAdd && (
                  <DropdownItem
                    onClick={() => {
                      onClickAdd(searchValue);
                    }}
                    $isSelected={false}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      display: "flex",
                      justifyContent:
                        filteredOptions.length === 0 ? "center" : "flex-start",
                    }}
                  >
                    <FlexRow gap={0.25} align="center">
                      <Text variant="body2">Create</Text>
                      <Plus size={14} color={ThemeColors.white} />
                    </FlexRow>
                  </DropdownItem>
                )}
              </DropdownContainer>
            )}
          </SelectContainer>

          {error && <Error>{error}</Error>}
        </Container>
      </Box>
    );
  }
);

Select.displayName = "Select";
