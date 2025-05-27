import styled from "styled-components";
import { useForm, z, zodResolver } from "@/utils/validation";

import { ModalContainer } from "modals/ModalContainer";
import { useUpdateProcessogramModal } from "./hooks";
import { Button } from "@/components/Button";
import { useUpdateProcessogram } from "queries/react-query/processograms/useProcessograms";
import { TextArea } from "@/components/Textarea";
import { Controller } from "react-hook-form";
import { useGetSpecies } from "queries/react-query/species/useGetSpecies";
import { useGetProductionModules } from "queries/react-query/production-modules/useGetProductionModules";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { FormInput } from "@/components/FormInput";
import { Select } from "@/components/Select";
import { Specie } from "types/species";
import { ProductionModule } from "types/production-module";
import { Text } from "@/components/Text";
import { Switch } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";

const UpdateProcessogramSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  production_module_id: z.string().min(1, "Production module is required"),
  theme: z.string().min(1, "Theme is required"),
  specie_id: z.string().min(1, "Specie is required"),
  is_published: z.boolean().optional(),
});

export type UpdateProcessogramForm = z.infer<typeof UpdateProcessogramSchema>;

export type UpdateProcessogramModalProps = {
  onClose: () => void;
  processogram: {
    _id: string;
    name: string;
    description?: string;
    production_module_id: string;
    theme: "light" | "dark";
    specie_id: string;
    is_published: boolean;
  };
};

const UpdateProcessogramModal = ({
  onClose,
  processogram,
}: UpdateProcessogramModalProps) => {
  const { handleSubmit, register, formState, control, watch } =
    useForm<UpdateProcessogramForm>({
      resolver: zodResolver(UpdateProcessogramSchema),
      defaultValues: {
        name: processogram.name,
        description: processogram.description || "",
        production_module_id: processogram.production_module_id,
        theme: processogram.theme,
        specie_id: processogram.specie_id,
        is_published: processogram.is_published || false,
      },
    });

  const specieId = watch("specie_id");

  const { errors, isDirty } = formState;

  const { data: species } = useGetSpecies();

  const { data: productionModules } = useGetProductionModules(
    { specie_id: specieId },
    !!specieId
  );

  const updateProcessogram = useUpdateProcessogram();

  const onSubmit = async (data: UpdateProcessogramForm) => {
    await updateProcessogram.mutateAsync({
      params: {
        id: processogram._id,
      },
      body: {
        name: data.name,
        description: data.description,
        production_module_id: data.production_module_id,
        theme: data.theme as "light" | "dark",
        specie_id: data.specie_id,
        is_published: data.is_published || false,
      },
    });
    onClose();
  };

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Update processogram"
      unsavedChanges={{
        enabled: isDirty,
        message:
          "You haven’t finished updating this processogram. If you leave now, your changes will be lost.",
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
        <FlexColumn mt={1} gap={2} height="100%" justify="space-between">
          <FlexColumn gap={2}>
            <FormInput
              label="Name"
              placeholder="Enter the name of the processogram"
              type="text"
              error={errors.name?.message}
              {...register("name")}
            />
            <FlexColumn>
              <Controller
                control={control}
                name="specie_id"
                render={({ field }) => (
                  <Select
                    label="Specie"
                    options={
                      species?.map((specie: Specie) => ({
                        label: specie.name,
                        value: specie._id,
                      })) ?? []
                    }
                    error={errors.specie_id?.message}
                    {...field}
                  />
                )}
              />
            </FlexColumn>
            <FlexColumn mb={1}>
              <Controller
                control={control}
                name="production_module_id"
                render={({ field }) => (
                  <Select
                    label="Production Module"
                    options={
                      productionModules?.map((module: ProductionModule) => ({
                        label: module.name,
                        value: module._id,
                      })) ?? []
                    }
                    error={errors.production_module_id?.message}
                    {...field}
                  />
                )}
              />
            </FlexColumn>
            <TextArea
              label="Description"
              placeholder="Enter a description for the processogram"
              error={errors.description?.message}
              {...register("description")}
            />
            <FlexColumn>
              <Controller
                control={control}
                name="theme"
                render={({ field }) => (
                  <Select
                    label="Theme"
                    options={[
                      { label: "Light", value: "light" },
                      { label: "Dark", value: "dark" },
                    ]}
                    error={errors.theme?.message}
                    {...field}
                  />
                )}
              />
            </FlexColumn>
          </FlexColumn>
          <FlexRow justify="flex-end">
            <Button
              buttonStyle="success"
              loading={updateProcessogram.isPending}
            >
              Update Processogram
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

const Form = styled.form`
  height: calc(100% - 3rem);
`;

export const UpdateProcessogramModalWrapper = () => {
  const [modalProps, setModalProps] = useUpdateProcessogramModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <UpdateProcessogramModal {...modalProps} onClose={onClose} />;
};
