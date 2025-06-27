import { css, styled } from "styled-components";
import { ThemeColors } from "theme/globalStyle";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectInput = styled.div`
  padding: 0.5rem 0 0.5rem 0;
  border: none;
  background-color: transparent;
  color: ${ThemeColors.white};
  border-bottom: 1px solid ${ThemeColors.blue};
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  &.focused {
    border-bottom: 1px solid ${ThemeColors.blue};
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  border: none;
  background-color: ${ThemeColors.black};
  color: ${ThemeColors.white};
  outline: none;
  font-size: 14px;
  border-bottom: 1px solid ${ThemeColors.blue};

  &:focus {
    border-bottom: 1px solid ${ThemeColors.blue};
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${ThemeColors.black};
  border: 1px solid ${ThemeColors.blue};
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

export const DropdownItem = styled.div<{ $isSelected: boolean }>`
  padding: 0.5rem;
  color: ${ThemeColors.white};
  cursor: pointer;
  font-size: 14px;

  ${(props) =>
    props.$isSelected &&
    css`
      background-color: ${ThemeColors.blue};
    `}

  &:hover {
    background-color: ${ThemeColors.blue};
  }
`;

type LabelProps = {
  $hasValue: boolean;
  $isFocused: boolean;
};

export const Label = styled.label<LabelProps>`
  color: ${ThemeColors.blue};
  position: absolute;
  transform: translateY(105%);
  ${css`
    bottom: 0;
    z-index: auto;
    font-size: 12px;
    color: ${ThemeColors.blue};
  `}
`;

export const Error = styled.span`
  font-size: 12px;
  color: ${ThemeColors.red};
  white-space: pre-wrap;
  font-weight: bold;
  margin-top: 4px;
`;

export const Placeholder = styled.span`
  color: ${ThemeColors.white};
`;

export const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  border-style: solid;
  border-width: 0.125rem 0.125rem 0 0;
  content: "";
  display: inline-block;
  height: 0.45rem;
  position: relative;
  vertical-align: center;
  width: 0.45rem;
  transform: ${(props) => (props.$isOpen ? "rotate(135deg)" : "rotate(45deg)")};
  transition: transform 0.2s ease;
`;

export const NoResults = styled.div`
  padding: 0.5rem;
  color: ${ThemeColors.gray};
  text-align: center;
  font-size: 14px;
`;
