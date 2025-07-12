import {
  getProductionModulesByPathname,
  getPublicProcessograms,
} from "@/api/react-query/public/useGetPublicElements";
import { ProcessogramCard } from "@/components/Cards/ProcessogramCard";
import { FlexRow } from "@/components/desing-components/Flex";
import {
  getDarkProcessogramDetails,
  getLightProcessogramDetails,
} from "@/utils/processogram-theme";
import { GetStaticPropsContext } from "next";
import styled from "styled-components";
import { Processogram } from "types/processogram";

type HomeProps = {
  processograms: Processogram[];
};

const ModulePage = ({ processograms }: HomeProps) => {
  return (
    <Container>
      <FlexRow justify="flex-start" flexWrap="wrap">
        {processograms.map((processogram) => (
          <ProcessogramCard
            files={{
              dark: getDarkProcessogramDetails(processogram),
              light: getLightProcessogramDetails(processogram),
            }}
            key={processogram._id}
            _id={processogram._id}
            name={processogram.name}
            description={processogram.description}
            production_module_id={processogram.production_module_id}
            specie_id={processogram.specie_id}
            status={processogram.status}
            is_published={processogram.is_published}
            image_url={
              processogram.raster_images?.[processogram.identifier].src
            }
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
  const { pathname, slug } = context.params as {
    pathname: string;
    slug: string;
  };

  const processograms = await getPublicProcessograms({
    specie: pathname,
    productionModule: slug,
  });

  return {
    props: {
      processograms: processograms,
    },
    revalidate: 60,
  };
}

export default ModulePage;
