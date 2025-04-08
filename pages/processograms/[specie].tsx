import ProductionSystemSelector from "@/components/processograms/processogram-list";
import { Container } from "@/components/layouts/default-processogram-page-styled";
import publicApi from "queries/public";
import Head from "next/head";
import { ProcessogramsList } from "@/components/processograms/ProcessogramsList";
import { Element } from "types/elements";

type Props = {
  specie: string;
  elements: Element[];
};

const PublicSpeciePage = ({ elements, specie }: Props) => {
  console.log(elements);

  return (
    <Container>
      <Head>
        <title>Welfare Data - {specie}</title>
      </Head>
      <ProcessogramsList
        title="The life of market pigs in four production systems"
        paths={[]}
        elements={elements}
      />
    </Container>
  );
};

export default PublicSpeciePage;

export async function getStaticPaths() {
  return {
    // For testing, only pre-render "pig"
    paths: [{ params: { specie: "pig" } }],
    // This will generate pages for other species on-demand
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { specie } = context.params;

  let elements = await (await publicApi.getElements(specie)).data;
  return {
    props: {
      elements,
      specie,
    },
    revalidate: 30,
  };
}
