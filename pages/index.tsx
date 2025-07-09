import { getPublicSpeciesList } from "@/api/react-query/public/useGetPublicElements";
import { SpecieCard } from "@/components/Cards/SpecieCard";
import { FlexRow } from "@/components/desing-components/Flex";
import styled from "styled-components";
import { Specie } from "types/species";

type HomeProps = {
  species: Specie[];
};

const Home = ({ species }: HomeProps) => {
  return (
    <Container>
      <FlexRow justify="flex-start" flexWrap="wrap">
        {species.map((specie) => (
          <SpecieCard
            key={specie._id}
            _id={specie._id}
            name={specie.name}
            description={specie.description}
            pathname={specie.pathname}
            processogram_urls={specie.processograms_urls}
            productionModulesCount={specie.productionModulesCount}
            processogramsCount={specie.processogramsCount}
            fullWidth
            disablePermissions
            redirectToPublicPath
          />
        ))}
      </FlexRow>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
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
