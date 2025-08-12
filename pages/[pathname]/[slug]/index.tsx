import { getPublicProcessograms } from "@/api/react-query/public/useGetPublicProcessograms";
import { PublicProcessogramCard } from "@/components/Cards/ProcessogramCard/PublicCard";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { getMainImageUrl, getRasterImages } from "@/utils/processogram-theme";
import { GetStaticPropsContext } from "next";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { Processogram } from "types/processogram";

type HomeProps = {
  processograms: Processogram[];
};

const ModulePage = ({ processograms }: HomeProps) => {
  const { pathname, slug } = useParams<{ pathname: string; slug: string }>();

  const { resolvedTheme } = useTheme();

  return (
    <Container>
      <FlexColumn align="center" justify="center" width="100%" mt={1} mb={1}>
        <Text variant="h1">Choose a production system to explore</Text>
        <Text variant="body1">
          Select a production system to view its details, medias, and AI
          insights.
        </Text>
      </FlexColumn>
      <FlexRow justify="flex-start" flexWrap="wrap">
        {processograms.map((processogram) => (
          <PublicProcessogramCard
            key={processogram._id}
            _id={processogram._id}
            description={processogram.dataDescription}
            name={processogram.name}
            pathname={pathname}
            slug={slug}
            image_url={getMainImageUrl({
              element: processogram,
              identifier: processogram.identifier,
              resolvedTheme,
            })}
            processogramSlug={processogram.slug}
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
