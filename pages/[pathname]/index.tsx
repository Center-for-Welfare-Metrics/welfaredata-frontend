import { getProductionModulesByPathname } from "@/api/react-query/public/useGetPublicElements";
import { ProductionModuleCard } from "@/components/Cards/ProductionModuleCard";
import { FlexRow } from "@/components/desing-components/Flex";
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
    <Container>
      <FlexRow justify="flex-start" flexWrap="wrap">
        {productionModules.map((productionModule) => (
          <ProductionModuleCard
            key={productionModule._id}
            _id={productionModule._id}
            name={productionModule.name}
            description={productionModule.description}
            processogramsCount={productionModule.processogramsCount}
            processograms_urls={productionModule.processograms_urls}
            specie_id={productionModule.specie_id}
            pathname={pathname}
            disablePermissions
            redirectToPublicPath
            halfWidth
          />
        ))}
      </FlexRow>
    </Container>
  );
};

const Container = styled.div`
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
    revalidate: 60, // Revalidate every 24 hours
  };
}

export default SpeciesPage;
