import { Container, Title, Description } from "./description-tab-styled";
import voca from "voca";
import { useMediaQuery } from "@material-ui/core";
interface IDescriptionTab {
  ref_name: string;
  ref_description: string;
  description: string;
  levelName: string;
  _id: string;
}

const DescriptionTab = ({
  ref_name,
  ref_description,
  description,
  levelName,
  _id,
}: IDescriptionTab) => {
  const matchMedia = useMediaQuery("(max-width: 800px)");

  return (
    <Container>
      <Title>
        {!matchMedia && (
          <>
            {voca.titleCase(levelName) || "Specie"} :{" "}
            {voca.titleCase(ref_name) || voca.titleCase(_id)}
          </>
        )}
      </Title>
      <Description>
        {(ref_description || "") + " " + (description || "")}
      </Description>
    </Container>
  );
};

export default DescriptionTab;
