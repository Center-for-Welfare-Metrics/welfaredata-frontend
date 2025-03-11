import { Container } from "@/components/layouts/default-processogram-page-styled";
import processogramApi from "queries/processogram";
import specieApi from "queries/specie";
import Head from "next/head";
import { NewProcessogram } from "@/components/processograms/NewProcessogram";

const PublicHensPage = ({ data, specie }) => {
  return (
    <Container>
      <Head>
        <title>Welfare Data - Laying Hens</title>
      </Head>
      <NewProcessogram src="/assets/svg/zoo/chicken/multi tier.svg" />
    </Container>
  );
};

export default PublicHensPage;

export async function getStaticProps(context) {
  let data = await (await processogramApi.all("chicken")).data;
  let specie = await (await specieApi.getOne("chicken")).data;
  return {
    props: {
      data,
      specie,
    },
  };
}
