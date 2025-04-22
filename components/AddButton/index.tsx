import React, { useState } from "react";
import styled from "styled-components";
import { Plus } from "react-feather";
import { ThemeColors } from "theme/globalStyle";

const Button = styled.button`
  background-color: ${ThemeColors.deep_blue};
  color: ${ThemeColors.white};
  border: 1px solid transparent;
  border-radius: 999px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  justify-content: center;
  overflow: hidden;
  height: 24px;
  width: 24px;
  padding: 0;

  transition: border 0.25s ease-in-out;

  &:hover {
    border: 1px solid ${ThemeColors.blue};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  onClick?: () => void;
};

export const AddButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <IconWrapper>
        <Plus color={ThemeColors.white} size={16} />
      </IconWrapper>
    </Button>
  );
};
