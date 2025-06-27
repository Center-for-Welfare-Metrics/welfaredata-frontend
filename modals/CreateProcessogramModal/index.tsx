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

const CreateProcessogramSchema = z.object({
  name: z.string().min(1, "Name is required"),
  specie_id: z.string().min(1, "Specie ID is required"),
  production_module_id: z.string().min(1, "Production Module ID is required"),
  theme: z.enum(["light", "dark"], {
    message: "Theme is required",
  }),
  file: z.custom<File>().refine((file) => !!file, {
    message: "File is required",
  }),
  is_published: z.boolean().optional(),
});

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

  const file = watch("file");

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

  const onFileAccepted = (file: File) => {
    setValue("file", file, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: CreateProcessogramForm) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("file", data.file);
      formData.append("specie_id", data.specie_id);
      formData.append("production_module_id", data.production_module_id);
      formData.append("path", pathName);
      formData.append("theme", data.theme);
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
      // unsavedChanges={{
      //   enabled: isDirty,
      //   message:
      //     "You haven’t finished creating this processogram. If you leave now, your changes will be lost.",
      // }}
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
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "white",
                  border: "1px solid grey",
                },
              }}
              checked={field.value || false}
              {...field}
            />
          )}
        />
      </PublishContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FlexColumn>
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
              <Controller
                control={control}
                name="theme"
                render={({ field }) => (
                  <Select
                    label="Theme"
                    placeholder="Select a theme"
                    options={[
                      { label: "Light", value: "light" },
                      { label: "Dark", value: "dark" },
                    ]}
                    error={errors.theme?.message}
                    {...field}
                    // value={field.value || ""}
                  />
                )}
              />
              {errors.theme?.message && (
                <Text variant="body2" color="red">
                  {errors.theme.message}
                </Text>
              )}
            </FlexColumn>

            <FlexColumn mt={!file ? 1 : 0}>
              <Dropzone
                onFileAccepted={onFileAccepted}
                textContent={
                  file ? (
                    <FlexColumn gap={0} justify="flex-start">
                      <Text variant="body2" align="left">
                        File: {file.name}
                      </Text>
                      <Text variant="body2" align="left">
                        Size: {filesize(file.size)}
                      </Text>
                    </FlexColumn>
                  ) : undefined
                }
              />
              {errors.file?.message && (
                <Text variant="body2" color="red">
                  {errors.file.message}
                </Text>
              )}
            </FlexColumn>
          </FormBody>
          <FlexRow justify="flex-end">
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
