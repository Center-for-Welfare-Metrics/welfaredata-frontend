import FormInput from "@/components/common/inputs/form-input";
import DataEntryContext from "@/context/data-entry";
import { useRef, useEffect, useState, useContext } from "react";
import voca from "voca";
import processogramApi from "queries/processogram";
import toast from "react-hot-toast";
import lodash from "lodash";
import update from "immutability-helper";
import specieApi from "queries/specie";

let keys = {
  lifeFate: "lifefates",
  phase: "phases",
  circumstance: "circumstances",
};

const BasicTab = () => {
  const {
    contentInformation,
    specie,
    setProcessograms,
    pathAsObject,
    processograms,
    setSpecie,
    setOnFetch,
    onFetch,
    updateContent,
  } = useContext(DataEntryContext);

  const [global, setGlobal] = useState("");

  const [specific, setSpecific] = useState("");

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
                  setOnFetch(false);
                })
                .catch(() => {
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
                  createNewLayer(response.data).then(
                    (processograms_updated) => {
                      setProcessograms(processograms_updated);
                      updateContent(processograms_updated);
                      setOnFetch(false);
                    }
                  );
                })
                .catch(() => {
                  setOnFetch(false);
                });
            });
        }
      } else {
        setGlobal(contentInformation.ref_description || "");
        setSpecific(contentInformation.description || "");
      }
    } else {
      setGlobal(specie?.description);
      setSpecific("");
    }
  };

  const createNewLayer = (data) => {
    return new Promise<any[]>((resolve, reject) => {
      try {
        if (contentInformation.levelName === "productionSystem") {
          processogramApi
            .create({ productionSystem: data?._id, specie: specie?._id })
            .then((response) => {
              let processograms_updated = update(processograms, {
                $push: [response.data],
              });
              resolve(processograms_updated);
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
            .then((response) => {
              let index = lodash.findIndex(processograms, {
                _id: response.data?._id,
              });
              let processograms_updated = update(processograms, {
                [index]: { $set: response.data },
              });
              resolve(processograms_updated);
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
            .then((response) => {
              setProcessograms(response.data);
            })
            .catch((error) => {
              console.log(error);
              toast.error("Can't do your request now. Please try later.");
            });
        }, 500);
      }
    } else {
      globalTimer.current = setTimeout(() => {
        specieApi
          .update({ description }, specie?._id)
          .then(() => {
            setSpecie(
              update(specie, {
                description: { $set: description },
              })
            );
          })
          .catch((error) => {
            console.log(error);
            toast.error("Can't do your request now. Please try later.");
          });
      }, 500);
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
            .then((response) => {
              let index = lodash.findIndex(processograms, {
                _id: response.data?._id,
              });
              setProcessograms(
                update(processograms, {
                  [index]: { $set: response.data },
                })
              );
            })
            .catch((error) => {
              console.log(error);
              toast.error("Can't do your request now. Please try later.");
            });
        }, 500);
      }
    }
  };

  return (
    <>
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
      {contentInformation && (
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
      )}
    </>
  );
};

export default BasicTab;
