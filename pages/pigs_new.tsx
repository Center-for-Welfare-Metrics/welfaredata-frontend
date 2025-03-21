import { Container } from "@/components/layouts/default-processogram-page-styled";
import Head from "next/head";
import { ProcessogramsList } from "@/components/processograms/ProcessogramsList";

const paths = [
  "pig/conventional intensive.svg",
  "pig/european intensive.svg",
  "pig/enhanced intensive.svg",
  "pig/outdoor semi-intensive.svg",
];

const PublicPigsPage = ({ data, specie }) => {
  return (
    <Container>
      <Head>
        <title>Welfare Data - Pigs</title>
      </Head>
      <ProcessogramsList
        paths={paths}
        title="The life of market pigs in four production systems"
      />
    </Container>
  );
};

export default PublicPigsPage;
