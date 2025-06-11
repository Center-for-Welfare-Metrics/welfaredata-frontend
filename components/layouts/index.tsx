import { useContext } from "react";
import NavBar from "../navbar";
import { Container, Content } from "./deafult-styled";
import UserContext from "@/context/user";
import { GeneralAddButton } from "../GeneralAddButton";

interface IDefaultLayout {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: IDefaultLayout) => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <NavBar />
      <Content>{children}</Content>
      {user && <GeneralAddButton />}
    </Container>
  );
};

export default DefaultLayout;
