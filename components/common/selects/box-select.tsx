import { Container, Options, Option, Error } from "./box-select-styled";
import React from "react";

interface IPrepare {
  key: string;
  render: string;
}

interface IBoxSelect {
  options: any[];
  prepare: IPrepare;
  value: any;
  onChoose(option: any): void;
  error?: any;
}

const BoxSelect = ({
  value,
  options,
  prepare,
  onChoose,
  error,
}: IBoxSelect) => {
  const isSelected = (option) => {
    if (value) {
      return value[prepare.key] === option[prepare.key];
    }
    return false;
  };

  const choose = (option: any) => (event: any) => {
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

export default React.memo(BoxSelect);
