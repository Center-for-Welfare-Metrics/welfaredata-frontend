import { useNavBar } from "@/context/useNavBar/NavBarProvider";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export const AdminLayout = ({ children }: Props) => {
  const { loggedInNavBarRect } = useNavBar();

  return (
    <Container
      style={{
        height: `calc(100vh - ${loggedInNavBarRect?.height}px)`,
      }}
    >
      {children}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 0 0;
  padding-inline: 1rem;
  display: flex;
  justify-content: space-around;
`;

export const ManagementCardDefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 3rem;
`;

export const ManagementTitle = styled.h1`
  color: white;
  margin: 0;
  align-self: flex-start;
`;
