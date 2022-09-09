import FormInput from "@/components/common/inputs/form-input";
import DataEntryContext from "@/context/data-entry";
import { useRef, useEffect, useContext, useMemo } from "react";
import voca from "voca";
import processogramApi from "queries/processogram";
import toast from "react-hot-toast";
import specieApi from "queries/specie";
import { useRecoilState } from "recoil";
import {
  recoilGlobalDescription,
  recoilLocalDescription,
} from "recoil/processogram";

let keys = {
  lifeFate: "lifefates",
  phase: "phases",
  circumstance: "circumstances",
};

const BasicTab = () => {
  const {
    contentInformation,
    specie,
    pathAsObject,
    setProcessograms,
    updateContent,
    setOnFetch,
    onFetch,
  } = useContext(DataEntryContext);

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

  const [global, setGlobal] = useRecoilState(
    recoilGlobalDescription(globaUniqueId)
  );

  const [specific, setSpecific] = useRecoilState(
    recoilLocalDescription(localUniqueId)
  );

  useEffect(() => {
    const levelName = voca.camelCase(contentInformation?.levelName);
    const ref_id = contentInformation?.ref__id;
    const _id = contentInformation?._id;
    if (
      globaUniqueId.includes(levelName) &&
      localUniqueId.includes(levelName) &&
      globaUniqueId.includes(ref_id) &&
      localUniqueId.includes(_id)
    ) {
      if (contentInformation) {
        if (global === null && contentInformation?.ref__id) {
          setGlobal(contentInformation.ref_description || "");
        }
        if (specific === null && contentInformation?._id) {
          setSpecific(contentInformation.description || "");
        }
      } else {
        if (global === null && specie) {
          setSpecific(specie.description || "");
        }
      }
    }
  }, [contentInformation, globaUniqueId, localUniqueId]);

  const globalTimer = useRef(null);
  const specificTimer = useRef(null);

  useEffect(() => {
    changeValues();
  }, [contentInformation]);

  const changeValues = () => {
    if (contentInformation) {
      if (contentInformation.noinformation) {
        if (!onFetch) {
          setOnFetch(true);
          processogramApi
            .getOneReference(contentInformation.levelName, {
              name: voca.lowerCase(contentInformation.elementName),
              specie: specie?._id,
            })
            .then((response) => {
              createNewLayer(response.data)
                .then((processograms_updated) => {
                  setProcessograms(processograms_updated);
                  updateContent(processograms_updated);
                })
                .finally(() => {
                  setOnFetch(false);
                });
            })
            .catch(() => {
              processogramApi
                .createReference(contentInformation.levelName, {
                  name: voca.lowerCase(contentInformation.elementName),
                  specie: specie?._id,
                  description: "",
                })
                .then((response) => {
                  createNewLayer(response.data)
                    .then((processograms_updated) => {
                      setProcessograms(processograms_updated);
                      updateContent(processograms_updated);
                    })
                    .finally(() => {
                      setOnFetch(false);
                    });
                });
            });
        }
      }
    }
  };

  const createNewLayer = (data) => {
    return new Promise<any[]>((resolve, reject) => {
      try {
        if (contentInformation.levelName === "productionSystem") {
          processogramApi
            .create({
              productionSystem: data?._id,
              specie: specie?._id,
            })
            .then(({ data }) => {
              resolve(data);
            })
            .catch(() => {
              reject();
            });
        } else {
          let obj = {
            [contentInformation.levelName]: data?._id,
          };
          processogramApi
            .newLayer(
              {
                id_tree: pathAsObject.id_tree,
                object: obj,
                pushTo: keys[contentInformation.levelName],
              },
              pathAsObject.processogram_id
            )
            .then(({ data }) => {
              resolve(data);
            })
            .catch(() => {
              reject();
            });
        }
      } catch (error) {
        toast.error("Something Wrong... ");
        reject(error);
      }
    });
  };

  const updateGlobal = (description) => {
    clearTimeout(globalTimer.current);
    if (contentInformation) {
      let { ref__id, levelName } = contentInformation;
      if (!contentInformation.noinformation) {
        globalTimer.current = setTimeout(() => {
          processogramApi
            .updateReference(
              voca.camelCase(levelName),
              ref__id,
              {
                description: description,
              },
              specie?._id
            )
            .catch((error) => {
              console.log(error);
              toast.error("Can't do your request now. Please try later.");
            });
        }, 500);
      }
    }
  };

  const updateSpecific = (description) => {
    if (contentInformation) {
      clearTimeout(specificTimer.current);
      if (!contentInformation.noinformation) {
        specificTimer.current = setTimeout(() => {
          processogramApi
            .update(
              { id_tree: pathAsObject.id_tree, values: { description } },
              pathAsObject.processogram_id
            )
            .catch((error) => {
              console.log(error);
              toast.error("Can't do your request now. Please try later.");
            });
        }, 500);
      }
    } else {
      specificTimer.current = setTimeout(() => {
        specieApi.update({ description }, specie?._id).catch((error) => {
          console.log(error);
          toast.error("Can't do your request now. Please try later.");
        });
      }, 500);
    }
  };

  return (
    <>
      {contentInformation && (
        <FormInput
          value={global}
          onChange={(e) => {
            setGlobal(e.target.value);
            updateGlobal(e.target.value);
          }}
          label="Global"
          name="description"
          multiline={true}
          rows={4}
        />
      )}
      <FormInput
        value={specific}
        onChange={(e) => {
          setSpecific(e.target.value);
          updateSpecific(e.target.value);
        }}
        label="Specific"
        name="description"
        multiline={true}
        rows={4}
      />
    </>
  );
};

export default BasicTab;
