import styled from "styled-components";

export const UploadYoutube = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 4px;
  width: fit-content;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const Title = styled.div`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.blue};
`;

export const Section = styled.div`
  padding-top: 1rem;
  position: relative;
`;

export const Container = styled.div`
  padding-top: 0;
  padding-right: 1rem;
  color: white;
`;
