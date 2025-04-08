import { Container } from "@/components/layouts/default-processogram-page-styled";
import processogramApi from "queries/processogram";
import specieApi from "queries/specie";
import Head from "next/head";
import { ProcessogramsList } from "@/components/processograms/ProcessogramsList";

const paths = [
  "chicken/conventional cages.svg",
  "chicken/free range.svg",
  "chicken/multi tier.svg",
  "chicken/single tier.svg",
];

const PublicHensPage = ({ data, specie }) => {
  return (
    <Container>
      <Head>
        <title>Welfare Data - Laying Hens</title>
      </Head>
      {/* <ProcessogramsList
        title="The life of sows in four production systems"
        paths={paths}
      /> */}
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
