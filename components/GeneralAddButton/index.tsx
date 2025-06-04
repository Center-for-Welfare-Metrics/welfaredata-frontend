import { useSetCreateElementModal } from "modals/CreateProcessogramModal/hooks";
import { Plus } from "react-feather";
import styled, { keyframes } from "styled-components";
import { ThemeColors } from "theme/globalStyle";

export const GeneralAddButton = () => {
  const setCreateProessogram = useSetCreateElementModal();

  const createProcessogram = () => {
    setCreateProessogram({});
  };

  return (
    <Container onClick={createProcessogram}>
      <Plus size={24} />
    </Container>
  );
};

const TopAnimation = keyframes`
  50%{
    transform: translateY(5px);
  }  

  100%{
    transform: translateY(0px);
  }
`;

const Container = styled.div`
  bottom: 1rem;
  right: 1rem;
  position: absolute;
  background-color: ${ThemeColors.gray};
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.25s;
  &:hover {
    border: 2px solid ${ThemeColors.white};
    animation: ${TopAnimation} 5s ease-in-out infinite;
  }
`;
