import styled from "styled-components";
import { Skeleton } from "@mui/material";

import { useGetSpecies } from "@/api/react-query/species/useGetSpecies";
import { AddButton } from "@/components/AddButton";
import { SpecieCard } from "@/components/Cards/SpecieCard";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { useSetCreateSpecieModal } from "modals/CreateSpecieModal/hooks";
import { ThemeColors } from "theme/globalStyle";

export const ListSpecies = () => {
  const { data: species } = useGetSpecies();

  const speciesList = species ?? [];

  const hasSpecies = speciesList.length > 0;

  const setCreateSpecie = useSetCreateSpecieModal();

  const createSpecie = () => {
    setCreateSpecie({});
  };

  const isLoading = true;

  return (
    <FlexColumn align="flex-start" width="100%" px={4} mt={4}>
      <FlexRow>
        <Text>Species {hasSpecies ? `(${speciesList.length})` : ``}</Text>
        <AddButton onClick={createSpecie} />
      </FlexRow>
      {isLoading ? (
        <FlexRow mt={1} gap={1} flexWrap="wrap" justify="flex-start">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={200}
              height={150}
            />
          ))}
        </FlexRow>
      ) : (
        <>
          {hasSpecies ? (
            <FlexRow mt={1} gap={1} flexWrap="wrap" justify="flex-start">
              {speciesList.map((specie) => (
                <SpecieCard
                  key={specie._id}
                  _id={specie._id}
                  name={specie.name}
                  pathname={specie.pathname}
                  image_url=""
                />
              ))}
            </FlexRow>
          ) : (
            <>
              <CreateSpecieCta onClick={createSpecie}>
                <Text>
                  No species found. <br />
                  Click here to create your first species!
                </Text>
              </CreateSpecieCta>
            </>
          )}
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
