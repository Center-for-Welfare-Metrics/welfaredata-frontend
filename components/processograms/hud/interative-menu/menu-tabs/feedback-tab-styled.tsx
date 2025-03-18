import styled, { css } from "styled-components";

export const HeaderText = styled.div`
  margin-bottom: 1rem;
  max-width: 500px;
  margin-inline: auto;
`;

type InputProps = {
  ischecked: boolean;
};

export const CheckButton = styled.label<InputProps>`
  width: 1rem;
  height: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  > div {
    border: 2px solid black;
    box-sizing: border-box;
    transition: background-color 250ms;
    background-color: ${({ theme, ischecked }) =>
      ischecked ? theme.colors.blue : theme.colors.black};
    width: 100%;
    height: 100%;
  }
`;

export const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  input {
    display: none;
  }
  margin-top: 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 2rem;
`;

export const FeedBackForm = styled.div`
  padding-right: 0.5rem;
  max-width: 500px;
  margin-inline: auto;
`;

export const Container = styled.div``;
