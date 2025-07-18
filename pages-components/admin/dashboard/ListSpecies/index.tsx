import { Skeleton } from "@mui/material";

import { useGetSpecies } from "@/api/react-query/species/useGetSpecies";
import { AddButton } from "@/components/AddButton";
import { SpecieCard } from "@/components/Cards/SpecieCard";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { useSetCreateSpecieModal } from "modals/CreateSpecieModal/hooks";
import { ThemeColors } from "theme/globalStyle";
import { CtaCreate } from "@/components/CtaCreate";
import { SpecieCardSize } from "@/components/Cards/SpecieCard/const";
import { CardSkeletonLoading } from "@/components/Cards/components/CardSkeletonLoading";
import { useTheme } from "next-themes";
import { getProcessogramUrls } from "@/utils/processogram-theme";

export const ListSpecies = () => {
  const { data: species, isLoading } = useGetSpecies();

  const { resolvedTheme } = useTheme();

  const speciesList = species ?? [];

  const hasSpecies = speciesList.length > 0;

  const setCreateSpecie = useSetCreateSpecieModal();

  const createSpecie = () => {
    setCreateSpecie({});
  };

  return (
    <FlexColumn align="flex-start" width="100%" mt={1}>
      <FlexRow>
        <Text>Species {hasSpecies ? `(${speciesList.length})` : ``}</Text>
        <AddButton onClick={createSpecie} />
      </FlexRow>
      {isLoading ? (
        <FlexRow mt={1} gap={1} flexWrap="wrap" justify="flex-start">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeletonLoading
              key={index}
              width={SpecieCardSize.width}
              height={SpecieCardSize.height}
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
                  processogram_urls={getProcessogramUrls({
                    item: specie,
                    resolvedTheme,
                  })}
                />
              ))}
            </FlexRow>
          ) : (
            <>
              <CtaCreate
                onClick={createSpecie}
                width={SpecieCardSize.width}
                height={SpecieCardSize.height}
              >
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
