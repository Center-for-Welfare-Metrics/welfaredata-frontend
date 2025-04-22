import { useGetSpecies } from "@/api/react-query/species/useGetSpecies";
import { SpecieCard } from "@/components/Cards/SpecieCard";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";

export const ListSpecies = () => {
  const { data: species, isLoading } = useGetSpecies();

  const speciesList = species ?? [];

  const hasSpecies = speciesList.length > 0;

  return (
    <FlexColumn align="flex-start" width="100%" px={4} mt={4}>
      <FlexRow>
        <Text>Species List {hasSpecies ? `(${speciesList.length})` : ``}</Text>
      </FlexRow>
      {hasSpecies ? (
        <>
          {speciesList.map((specie) => (
            <SpecieCard
              key={specie._id}
              _id={specie._id}
              name={specie.name}
              pathname={specie.pathname}
              image_url=""
            />
          ))}
        </>
      ) : (
        <>
          <CreateSpecieCta>
            <Text>
              No species found. <br />
              Click here to create your first species!
            </Text>
          </CreateSpecieCta>
        </>
      )}
    </FlexColumn>
  );
};

const CreateSpecieCta = styled.button`
  margin-top: 1rem;
  background-color: transparent;
  height: auto;
  width: 200px;
  border: 1px solid ${ThemeColors.deep_blue};
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.25s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;
