import { Container, Options, Option, Error } from "./box-select-styled";
import React from "react";

interface IPrepare {
  key: string;
  render: string;
}

interface IBoxSelect<T> {
  options: T[];
  prepare: IPrepare;
  value: T | null;
  onChoose(option: T): void;
  error?: string;
}

const BoxSelect = <T extends Record<string, any>>({
  value,
  options,
  prepare,
  onChoose,
  error,
}: IBoxSelect<T>) => {
  const isSelected = (option: T): boolean => {
    if (value) {
      return value[prepare.key] === option[prepare.key];
    }
    return false;
  };

  const choose =
    (option: T) =>
    (event: React.MouseEvent<HTMLDivElement>): void => {
      onChoose(option);
    };

  return (
    <Container>
      <Options>
        {options.map((option) => (
          <Option
            onClick={choose(option)}
            selected={isSelected(option)}
            key={option[prepare.key]}
          >
            {option[prepare.render]}
          </Option>
        ))}
      </Options>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default React.memo(BoxSelect) as typeof BoxSelect;
