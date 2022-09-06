import MediaFileList from "@/components/data_entry/form/tabs/media/media_file/list";

import { useContext, useRef } from "react";

import { Container, Section, Title } from "./media-styled";

import UploadFile from "@/components/common/inputs/upload-file";
import DataEntryContext from "@/context/data-entry";
import processogramApi from "queries/processogram";
import voca from "voca";

const MediasTab = () => {
  const globalInputFileRef = useRef<HTMLInputElement>(null);

  const localInputFileRef = useRef<HTMLInputElement>(null);

  const { contentInformation, pathAsObject, specie } =
    useContext(DataEntryContext);

  const uploadToGlobal = (file) => {
    const formData = new FormData();
    const field = voca.camelCase(contentInformation.levelName);
    formData.append("file", file);
    processogramApi.uploadFileToReference(
      field,
      contentInformation.ref__id,
      formData,
      (progress) => {
        console.log(progress);
      }
    );
  };

  const uploadToLocal = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const id_tree = pathAsObject.id_tree;
    if (id_tree) {
      formData.append("id_tree", JSON.stringify(id_tree));
    }
    const processogram_id = pathAsObject?.processogram_id;
    processogramApi.uploadLocalFile(processogram_id, formData, (progress) => {
      console.log(progress);
    });
  };

  return (
    <Container>
      <Section>
        <Title>Global</Title>
        <MediaFileList medias={contentInformation?.ref_medias || []} />
        <UploadFile
          setFile={uploadToGlobal}
          inputFileRef={globalInputFileRef}
          progress={0}
          onFetch={false}
        />
      </Section>
      <Section>
        <Title>Specific</Title>
        <MediaFileList
          isLocal={true}
          medias={contentInformation?.medias || []}
        />
        <UploadFile
          setFile={uploadToLocal}
          inputFileRef={localInputFileRef}
          progress={0}
          onFetch={false}
        />
      </Section>
    </Container>
  );
};

export default MediasTab;
