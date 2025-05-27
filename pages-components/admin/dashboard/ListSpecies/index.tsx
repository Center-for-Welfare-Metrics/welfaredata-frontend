import { Skeleton } from "@mui/material";

import { useGetSpecies } from "@/api/react-query/species/useGetSpecies";
import { AddButton } from "@/components/AddButton";
import { SpecieCard } from "@/components/Cards/SpecieCard";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { useSetCreateSpecieModal } from "modals/CreateSpecieModal/hooks";
import { ThemeColors } from "theme/globalStyle";
import { CtaCreate } from "@/components/CtaCreate";

export const ListSpecies = () => {
  const { data: species, isLoading } = useGetSpecies();

  const speciesList = species ?? [];

  const hasSpecies = speciesList.length > 0;

  const setCreateSpecie = useSetCreateSpecieModal();

  const createSpecie = () => {
    setCreateSpecie({});
  };

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
              animation="wave"
              sx={{
                bgcolor: ThemeColors.deep_blue,
              }}
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
                  description={specie.description}
                  processogramsCount={specie.processogramsCount}
                  productionModulesCount={specie.productionModulesCount}
                  processogram_urls={specie.processograms_urls}
                />
              ))}
            </FlexRow>
          ) : (
            <>
              <CtaCreate onClick={createSpecie}>
                <Text>
                  No species found. <br />
                  Click here to create your first species!
                </Text>
              </CtaCreate>
            </>
          )}
        </>
      )}
    </FlexColumn>
  );
};
