import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { filesize } from "filesize";

import { ModalContainer } from "modals/ModalContainer";
import { useCreateElementModal } from "./hooks";
import { useForm, z, zodResolver } from "@/utils/validation";
import Dropzone from "@/components/Dropzone";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { uploadSvgElement } from "@/api/react-query/processograms/useUploadSvgElement";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/api/react-query/keys";
import { Controller } from "react-hook-form";
import { FormInput } from "@/components/FormInput";
import { Select } from "@/components/Select";
import { Switch } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";
import { useGetSpecies } from "@/api/react-query/species/useGetSpecies";
import { useGetProductionModules } from "@/api/react-query/production-modules/useGetProductionModules";
import { useSetCreateSpecieModal } from "modals/CreateSpecieModal/hooks";
import slufigy from "slugify";
import { useSetCreateProductionModuleModal } from "modals/CreateProductionModuleModal/hooks";
import { CheckCircle } from "react-feather";

const CreateProcessogramSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    specie_id: z.string().min(1, "Specie ID is required"),
    production_module_id: z.string().min(1, "Production Module ID is required"),
    file_light: z.custom<File>().optional().nullable(),
    file_dark: z.custom<File>().optional().nullable(),
    is_published: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // Ensure at least one file is provided
      return Boolean(data.file_light) || Boolean(data.file_dark);
    },
    {
      message: "At least one SVG file is required",
      path: ["file_light"],
    }
  );

type CreateProcessogramForm = z.infer<typeof CreateProcessogramSchema>;

export type CreateProcessogramModalProps = {
  onClose: () => void;
  initialValues?: Partial<CreateProcessogramForm>;
};

const CreateProcessogramModal = ({
  onClose,
  initialValues,
}: CreateProcessogramModalProps) => {
  const queryClient = useQueryClient();

  const { handleSubmit, register, formState, setValue, watch, reset, control } =
    useForm<CreateProcessogramForm>({
      resolver: zodResolver(CreateProcessogramSchema),
      defaultValues: initialValues,
    });

  const [isLoading, setIsLoading] = useState(false);

  const { errors, isDirty } = formState;

  const file_light = watch("file_light");
  const file_dark = watch("file_dark");

  const specieId = watch("specie_id");

  const { data: species } = useGetSpecies();

  const { data: productionModules } = useGetProductionModules({
    specie_id: specieId,
  });

  const setCreateSpecie = useSetCreateSpecieModal();

  const setCreateProductionModule = useSetCreateProductionModuleModal();

  const pathName = useMemo(() => {
    const specie = species?.find((specie) => specie._id === specieId);

    if (!specie) return "";

    return specie.pathname;
  }, [specieId, species]);

  const onFileLightAccepted = (file: File) => {
    setValue("file_light", file, {
      shouldValidate: true,
    });
  };

  const onFileDarkAccepted = (file: File) => {
    setValue("file_dark", file, {
      shouldValidate: true,
    });
  };

  const onFileRemoved = (fileType: "light" | "dark") => {
    if (fileType === "light") {
      setValue("file_light", null, {
        shouldValidate: true,
      });
    } else if (fileType === "dark") {
      setValue("file_dark", null, {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (data: CreateProcessogramForm) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.file_light) {
        formData.append("file_light", data.file_light);
      }
      if (data.file_dark) {
        formData.append("file_dark", data.file_dark);
      }
      formData.append("specie_id", data.specie_id);
      formData.append("production_module_id", data.production_module_id);
      formData.append("path", pathName);
      formData.append("is_published", String(data.is_published || false));

      await uploadSvgElement(formData);

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROCESSOGRAMS.List],
      });

      toast.success("File uploaded successfully!");

      reset();
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onClickAddSpecie = (specieName: string) => {
    setCreateSpecie({
      initialValues: {
        name: specieName,
        pathname: slufigy(specieName, {
          lower: true,
        }),
      },
    });
  };

  const onClickAddProductionModule = (moduleName: string) => {
    if (!specieId) return;

    setCreateProductionModule({
      initialValues: {
        specie_id: specieId,
        name: moduleName,
      },
    });
  };

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Create a Processogram"
      height="590px"
      unsavedChanges={{
        enabled: isDirty,
        message:
          "You haven’t finished creating this processogram. If you leave now, your changes will be lost.",
      }}
    >
      <PublishContainer>
        <Text variant="body2">Publish this processogram</Text>
        <Controller
          control={control}
          name="is_published"
          render={({ field }) => (
            <Switch
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: ThemeColors.gray,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: ThemeColors.deep_blue,
                },
                "& .MuiSwitch-switchBase": {
                  color: "white",
                  "&:hover": {
                    backgroundColor: ThemeColors.grey_200,
                  },
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "white",
                  border: `1px solid ${ThemeColors.grey_600}`,
                },
              }}
              checked={field.value || false}
              {...field}
            />
          )}
        />
      </PublishContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FlexColumn gap={1}>
          <FormBody mt={1} gap={2} width="100%">
            <FormInput
              label="Name"
              placeholder="Enter the name of the processogram"
              type="text"
              error={errors.name?.message}
              {...register("name")}
            />
            <FlexRow gap={2}>
              <Controller
                control={control}
                name="specie_id"
                render={({ field }) => (
                  <Select
                    label="Specie"
                    placeholder="Select a specie"
                    options={
                      species?.map((specie) => ({
                        label: specie.name,
                        value: specie._id,
                      })) || []
                    }
                    error={errors.specie_id?.message}
                    onClickAdd={onClickAddSpecie}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="production_module_id"
                render={({ field }) => (
                  <Select
                    label="Production Module"
                    placeholder="Select a production module"
                    options={
                      productionModules?.map((module) => ({
                        label: module.name,
                        value: module._id,
                      })) || []
                    }
                    error={errors.production_module_id?.message}
                    noOptionsText={
                      !specieId ? "Please select a specie first" : undefined
                    }
                    onClickAdd={
                      !specieId ? undefined : onClickAddProductionModule
                    }
                    {...field}
                  />
                )}
              />
            </FlexRow>
            <FlexColumn>
              <Text variant="body2">Provide at least one SVG file.</Text>
              <FlexRow justify="flex-start" gap={1} align="flex-start">
                <FlexColumn>
                  <FlexRow justify="flex-start">
                    <Text variant="body2">Light mode</Text>
                    {!!file_light && (
                      <CheckCircle size={16} color={ThemeColors.green} />
                    )}
                  </FlexRow>
                  <Dropzone
                    onFileAccepted={onFileLightAccepted}
                    onFileRemoved={() => onFileRemoved("light")}
                    textContent={
                      file_light ? (
                        <FlexColumn gap={0} justify="flex-start">
                          <Text
                            variant="body2"
                            align="left"
                            style={{
                              wordBreak: "break-all",
                            }}
                          >
                            File: {file_light.name}
                          </Text>
                          <Text variant="body2" align="left">
                            Size: {filesize(file_light.size)}
                          </Text>
                        </FlexColumn>
                      ) : undefined
                    }
                    currentFile={file_light}
                  />
                  {errors.file_light?.message && (
                    <Text variant="body2" color="red">
                      {errors.file_light.message}
                    </Text>
                  )}
                </FlexColumn>
                <FlexColumn>
                  <FlexRow justify="flex-start" align="center">
                    <Text variant="body2">Dark mode</Text>
                    {!!file_dark && (
                      <CheckCircle size={16} color={ThemeColors.green} />
                    )}
                  </FlexRow>
                  <Dropzone
                    onFileAccepted={onFileDarkAccepted}
                    onFileRemoved={() => onFileRemoved("dark")}
                    textContent={
                      file_dark ? (
                        <FlexColumn gap={0} justify="flex-start">
                          <Text
                            variant="body2"
                            align="left"
                            style={{
                              wordBreak: "break-all",
                            }}
                          >
                            File: {file_dark.name}
                          </Text>
                          <Text variant="body2" align="left">
                            Size: {filesize(file_dark.size)}
                          </Text>
                        </FlexColumn>
                      ) : undefined
                    }
                    currentFile={file_dark}
                  />
                  {errors.file_dark?.message && (
                    <Text variant="body2" color="red">
                      {errors.file_dark.message}
                    </Text>
                  )}
                </FlexColumn>
              </FlexRow>
            </FlexColumn>
          </FormBody>
          <FlexRow justify="flex-end" mt={1.5}>
            <Button buttonStyle="success" loading={isLoading}>
              Create Processogram
            </Button>
          </FlexRow>
        </FlexColumn>
      </Form>
    </ModalContainer>
  );
};

const PublishContainer = styled(FlexRow)`
  position: absolute;
  top: 3rem;
  right: 1rem;
`;

const FormBody = styled(FlexColumn)``;

const Form = styled.form``;

export const CreateProcessogramModalWrapper = () => {
  const [modalProps, setModalProps] = useCreateElementModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <CreateProcessogramModal {...modalProps} onClose={onClose} />;
};
