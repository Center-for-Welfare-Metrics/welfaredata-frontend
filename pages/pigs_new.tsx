import { Container } from "@/components/layouts/default-processogram-page-styled";
import Head from "next/head";
import { NewProcessogram } from "@/components/processograms/NewProcessogram";
import { ProcessogramsList } from "@/components/processograms/ProcessogramsList";

const PublicPigsPage = ({ data, specie }) => {
  return (
    <Container>
      <Head>
        <title>Welfare Data - Pigs</title>
      </Head>
      <ProcessogramsList />
    </Container>
  );
};

export default PublicPigsPage;
