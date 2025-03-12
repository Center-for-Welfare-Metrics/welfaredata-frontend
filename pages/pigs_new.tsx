import { Container } from "@/components/layouts/default-processogram-page-styled";
import Head from "next/head";
import { NewProcessogram } from "@/components/processograms/NewProcessogram";

const PublicPigsPage = ({ data, specie }) => {
  return (
    <Container>
      <Head>
        <title>Welfare Data - Pigs</title>
      </Head>
      <NewProcessogram src="/assets/svg/zoo/pig/enhanced intensive.svg" />
    </Container>
  );
};

export default PublicPigsPage;
