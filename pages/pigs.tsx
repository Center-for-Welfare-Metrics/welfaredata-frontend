import ProductionSystemSelector from "@/components/processograms/processogram-list";
import { Container } from "@/components/layouts/default-processogram-page-styled";
import processogramApi from "queries/processogram";
import specieApi from "queries/specie";
import Head from "next/head";
import { NewProcessogram } from "@/components/processograms/Processogram";

const PublicPigsPage = ({ data, specie }) => {
  return (
    <Container>
      <Head>
        <title>Welfare Data - Pigs</title>
      </Head>
      <ProductionSystemSelector specie={specie} collection={data} />
    </Container>
  );
};

export default PublicPigsPage;

export async function getStaticProps(context) {
  let data = await (await processogramApi.all("pig")).data;
  let specie = await (await specieApi.getOne("pig")).data;
  return {
    props: {
      data,
      specie,
    },
    revalidate: 30,
  };
}
