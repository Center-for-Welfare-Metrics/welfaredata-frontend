import MediaFileList from "@/components/data_entry/form/tabs/media/media_file/list";

import { useContext, useEffect, useMemo, useRef, useState } from "react";

import { Container, Section, Title } from "./media-styled";
import specieApi from "queries/specie";
import UploadFile from "@/components/common/inputs/upload-file";
import DataEntryContext from "@/context/data-entry";
import processogramApi from "queries/processogram";
import voca from "voca";
import { useRecoilState } from "recoil";
import { recoilGlobalMedias, recoilLocalMedias } from "recoil/processogram";
import toast from "react-hot-toast";
import { IMedia } from "@/utils/processogram";

const MediasTab = () => {
  const globalInputFileRef = useRef<HTMLInputElement>(null);

  const localInputFileRef = useRef<HTMLInputElement>(null);

  const [uploadingGlobal, setUploadingGlobal] = useState(false);

  const [uploadingLocal, setUploadingLocal] = useState(false);

  const [localProgress, setLocalProgress] = useState(0);

  const [globalProgress, setGlobalProgress] = useState(0);

  const { contentInformation, pathAsObject, specie } =
    useContext(DataEntryContext);

  const globaUniqueId = useMemo(() => {
    if (contentInformation) {
      return (
        voca.camelCase(contentInformation?.levelName) +
        contentInformation?.ref__id
      );
    } else {
      return specie._id;
    }
  }, [contentInformation]);

  const localUniqueId = useMemo(() => {
    if (contentInformation) {
      return (
        voca.camelCase(contentInformation?.levelName) + contentInformation?._id
      );
    } else {
      return specie._id;
    }
  }, [contentInformation]);

  const [globalMedias, setGlobalMedias] = useRecoilState(
    recoilGlobalMedias(globaUniqueId)
  );

  const [localMedias, setLocalMedias] = useRecoilState(
    recoilLocalMedias(localUniqueId)
  );

  useEffect(() => {
    if (contentInformation) {
      if (!!!globalMedias && contentInformation?.ref__id) {
        setGlobalMedias(contentInformation.ref_medias);
      }
      if (!!!localMedias && contentInformation?._id) {
        setLocalMedias(contentInformation.medias);
      }
    }
  }, [contentInformation]);

  const uploadToSpecie = (file) => {
    const formData = new FormData();
    const field = "specie";
    formData.append("file", file);
    setUploadingLocal(true);
    processogramApi
      .uploadFileToReference(field, specie._id, formData, (progress) => {
        const { loaded, total } = progress;
        const percent = Math.round((loaded * 100) / total);
        setLocalProgress(percent);
      })
      .then(({ data }) => {
        setLocalMedias([...localMedias, data]);
      })
      .finally(() => {
        setUploadingLocal(false);
        setLocalProgress(0);
      });
  };

  const uploadToGlobal = (file) => {
    const formData = new FormData();
    const field = voca.camelCase(contentInformation.levelName);
    formData.append("file", file);
    setUploadingGlobal(true);
    processogramApi
      .uploadFileToReference(
        field,
        contentInformation?.ref__id,
        formData,
        (progress) => {
          const { loaded, total } = progress;
          const percent = Math.round((loaded * 100) / total);
          setGlobalProgress(percent);
        }
      )
      .then(({ data }) => {
        setGlobalMedias([...globalMedias, data]);
      })
      .finally(() => {
        setUploadingGlobal(false);
        setGlobalProgress(0);
      });
  };

  const uploadToLocal = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const id_tree = pathAsObject.id_tree;
    if (id_tree) {
      formData.append("id_tree", JSON.stringify(id_tree));
    }
    const processogram_id = pathAsObject?.processogram_id;
    setUploadingLocal(true);
    processogramApi
      .uploadLocalFile(processogram_id, formData, (progress) => {
        const { loaded, total } = progress;
        const percent = Math.round((loaded * 100) / total);
        setLocalProgress(percent);
      })
      .then(({ data }) => {
        setLocalMedias([...localMedias, data]);
      })
      .finally(() => {
        setUploadingLocal(false);
        setLocalProgress(0);
      });
  };

  const onDeleteGlobal = (media: IMedia) => {
    if (contentInformation) {
      let { ref__id, levelName } = contentInformation;
      if (!contentInformation.noinformation) {
        const newMedias = globalMedias.filter((m) => m._id !== media._id);
        setGlobalMedias(newMedias);
        processogramApi
          .updateReference(
            voca.camelCase(levelName),
            ref__id,
            {
              medias: newMedias,
            },
            specie?._id
          )
          .catch((error) => {
            console.log(error);
            toast.error("Can't do your request now. Please try later.");
          });
      }
    }
  };

  const onDeleteSpecie = (media: IMedia) => {
    const newMedias = localMedias.filter((m) => m._id !== media._id);
    setLocalMedias(newMedias);
    specieApi
      .update(
        {
          medias: newMedias,
        },
        specie?._id
      )
      .catch((error) => {
        console.log(error);
        toast.error("Can't do your request now. Please try later.");
      });
  };

  const onDeleteSpecific = (media: IMedia) => {
    if (contentInformation) {
      if (!contentInformation.noinformation) {
        const newMedias = localMedias.filter((m) => m._id !== media._id);
        setLocalMedias(newMedias);
        processogramApi
          .update(
            { id_tree: pathAsObject.id_tree, values: { medias: newMedias } },
            pathAsObject.processogram_id
          )
          .catch((error) => {
            console.log(error);
            toast.error("Can't do your request now. Please try later.");
          });
      }
    }
  };

  return (
    <Container>
      {contentInformation && (
        <Section>
          <Title>Global</Title>
          <MediaFileList
            onDelete={onDeleteGlobal}
            medias={globalMedias || []}
          />
          <UploadFile
            setFile={uploadToGlobal}
            inputFileRef={globalInputFileRef}
            progress={globalProgress}
            onFetch={uploadingGlobal}
          />
        </Section>
      )}
      <Section>
        <Title>Specific</Title>
        <MediaFileList
          onDelete={contentInformation ? onDeleteSpecific : onDeleteSpecie}
          medias={localMedias || []}
        />
        <UploadFile
          setFile={contentInformation ? uploadToLocal : uploadToSpecie}
          inputFileRef={localInputFileRef}
          progress={localProgress}
          onFetch={uploadingLocal}
        />
      </Section>
    </Container>
  );
};

export default MediasTab;
