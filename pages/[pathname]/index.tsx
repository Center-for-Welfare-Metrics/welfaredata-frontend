import { getProductionModulesByPathname } from "@/api/react-query/public/useGetPublicProcessograms";
import { PublicProductionModuleCard } from "@/components/Cards/ProductionModuleCard/PublicCard";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { GetStaticPropsContext } from "next";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { ProductionModule } from "types/production-module";

type HomeProps = {
  productionModules: ProductionModule[];
};

const SpeciesPage = ({ productionModules }: HomeProps) => {
  const { pathname } = useParams<{ pathname: string }>();

  return (
    <Container gap={2}>
      <FlexColumn align="center" justify="center" width="100%" mt={1} mb={1}>
        <Text variant="h1">Choose a module to explore</Text>
        <Text variant="body1">
          Select a module to view its production systems and details.
        </Text>
      </FlexColumn>
      <FlexRow justify="flex-start" flexWrap="wrap" gap={1}>
        {productionModules.map((productionModule) => (
          <PublicProductionModuleCard
            key={productionModule._id}
            _id={productionModule._id}
            slug={productionModule.slug}
            name={productionModule.name}
            description={productionModule.description}
            processogramsCount={productionModule.processogramsCount}
            processograms_urls={productionModule.processograms_urls}
            pathname={pathname}
          />
        ))}
      </FlexRow>
    </Container>
  );
};

const Container = styled(FlexColumn)`
  padding: 2rem;
`;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { pathname } = context.params as { pathname: string };

  const productionModules = await getProductionModulesByPathname({ pathname });

  return {
    props: {
      productionModules: productionModules,
    },
    revalidate: 60,
  };
}

export default SpeciesPage;
