import { getPublicSpeciesList } from "@/api/react-query/public/useGetPublicProcessograms";
import { PublicSpecieCard } from "@/components/Cards/SpecieCard/PublicCard";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { useNavBar } from "@/context/useNavBar/NavBarProvider";
import { getProcessogramUrls } from "@/utils/processogram-theme";
import { useTheme } from "next-themes";
import styled from "styled-components";
import { media } from "styles/media";
import { Specie } from "types/species";

type HomeProps = {
  species: Specie[];
};

const Home = ({ species }: HomeProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Container gap={2}>
        <FlexColumn align="center" justify="center" width="100%" mt={1} mb={1}>
          <Text variant="h1">Choose a species to explore</Text>
          <Text variant="body1">
            Select a species to view its production modules and production
            systems.
          </Text>
        </FlexColumn>
        <CardsList justify="flex-start" flexWrap="wrap" gap={1}>
          {species.map((specie) => (
            <PublicSpecieCard
              key={specie._id}
              name={specie.name}
              pathname={specie.pathname}
              description={specie.description}
              processogram_urls={getProcessogramUrls({
                item: specie,
                resolvedTheme,
              })}
              productionModulesCount={specie.productionModulesCount}
              processogramsCount={specie.processogramsCount}
            />
          ))}
        </CardsList>
      </Container>
    </>
  );
};

const CardsList = styled(FlexRow)`
  box-sizing: border-box;
`;

const Container = styled(FlexColumn)`
  padding: 2rem;
  box-sizing: border-box;

  ${media.up.medium`
    padding:1rem;
  `}
`;

export const getStaticProps = async () => {
  const speciesData = await getPublicSpeciesList();

  return {
    props: {
      species: speciesData,
    },
    revalidate: 60, // Revalidate every 24 hours
  };
};

export default Home;
