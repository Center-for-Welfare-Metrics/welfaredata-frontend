import DataEntryContext from "@/context/data-entry";
import { useContext, useMemo } from "react";
import FormInput from "../common/inputs/form-input";
import { Container, Title } from "./reference-settings-styled";
import voca from "voca";
import { useRef } from "react";
import processogramApi from "queries/processogram";
import toast from "react-hot-toast";
import { useState } from "react";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";

const COLLECTION_LINK =
  "https://cloud.mongodb.com/v2/5eaafefb6db91028f3b39645#metrics/replicaSet/606b01dfd50e360b5ae219de/explorer/wmplatform/@COLLECTION@/find";

const ReferenceSettings = () => {
  const { contentInformation, setProcessograms, updateContent, specie } =
    useContext(DataEntryContext);

  const timer = useRef(null);

  const [alternative, setAlternative] = useState(
    contentInformation.ref_alternative_name || ""
  );

  const collectionLink = useMemo(() => {
    const levelName =
      voca.lowerCase(voca.camelCase(contentInformation.levelName)) + "s";
    return COLLECTION_LINK.replace("@COLLECTION@", levelName);
  }, [contentInformation]);

  const onChange = (value) => {
    clearTimeout(timer.current);

    let { ref__id, levelName } = contentInformation;
    if (!contentInformation.noinformation) {
      timer.current = setTimeout(() => {
        processogramApi
          .updateReference(
            voca.camelCase(levelName),
            ref__id,
            {
              alternative_name: value,
            },
            specie?._id
          )
          .then((response) => {
            setProcessograms(response.data);
            updateContent(response.data);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Can't do your request now. Please try later.");
          });
      }, 500);
    }
  };

  return (
    <Container>
      <ExternalLinkDiv>
        <ExternalLink href={collectionLink} target="_blank" rel="noreferrer">
          Reference Collection
        </ExternalLink>
      </ExternalLinkDiv>
      <Title>
        {voca.titleCase(contentInformation.levelName)} :{" "}
        {voca.titleCase(contentInformation.ref_name)}
      </Title>
      <FormInput
        label="Alternative Name"
        name="alternative_name"
        onChange={(e) => {
          onChange(e.target.value);
          setAlternative(e.target.value);
        }}
        value={alternative}
      />
    </Container>
  );
};

const ExternalLink = styled.a`
  color: ${ThemeColors.blue};
`;

const ExternalLinkDiv = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

export default ReferenceSettings;
