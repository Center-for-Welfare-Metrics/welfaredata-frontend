import styled from "styled-components";
import { useForm, z, zodResolver } from "@/utils/validation";

import { ModalContainer } from "modals/ModalContainer";
import { useUpdateProductionModuleModal } from "./hooks";
import { Button } from "@/components/Button";
import { useUpdateProductionModule } from "queries/react-query/production-modules/useProductionModule";
import { TextArea } from "@/components/Textarea";
import { ThemeColors } from "theme/globalStyle";
import { Controller } from "react-hook-form";
import { useGetSpecies } from "queries/react-query/species/useGetSpecies";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { Specie } from "types/species";
import { FormInput } from "@/components/FormInput";
import { Select } from "@/components/Select";

const UpdateProductionModuleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  specie_id: z.string().min(1, "Specie is required"),
});

export type UpdateProductionModuleForm = z.infer<
  typeof UpdateProductionModuleSchema
>;

export type UpdateProductionModuleModalProps = {
  onClose: () => void;
  productionModule: {
    _id: string;
    name: string;
    description?: string;
    specie_id: string;
  };
};

const UpdateProductionModuleModal = ({
  onClose,
  productionModule,
}: UpdateProductionModuleModalProps) => {
  const { handleSubmit, register, formState, control } =
    useForm<UpdateProductionModuleForm>({
      resolver: zodResolver(UpdateProductionModuleSchema),
      defaultValues: {
        name: productionModule.name,
        description: productionModule.description || "",
        specie_id: productionModule.specie_id,
      },
    });

  const { errors, isDirty } = formState;
  const { data: species } = useGetSpecies();
  const updateProductionModule = useUpdateProductionModule();

  const onSubmit = async (data: UpdateProductionModuleForm) => {
    await updateProductionModule.mutateAsync({
      params: {
        id: productionModule._id,
      },
      body: {
        name: data.name,
        description: data.description,
        specie_id: data.specie_id,
      },
    });
    onClose();
  };

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Update production module"
      height="400px"
      unsavedChanges={{
        enabled: isDirty,
        message:
          "You haven’t finished updating this production module. If you leave now, your changes will be lost.",
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FlexColumn gap={2} mt={1} height="100%" justify="space-between">
          <FlexColumn gap={2}>
            <FormInput
              label="Name"
              placeholder="Enter the name of the production module"
              type="text"
              error={errors.name?.message}
              {...register("name")}
            />

            <TextArea
              label="Description"
              placeholder="Enter a description for the production module"
              error={errors.description?.message}
              {...register("description")}
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
          </FlexColumn>
          <FlexRow justify="flex-end">
            <Button
              buttonStyle="success"
              loading={updateProductionModule.isPending}
            >
              Update Production Module
            </Button>
          </FlexRow>
        </FlexColumn>
      </Form>
    </ModalContainer>
  );
};

const Form = styled.form`
  height: calc(100% - 3rem);
`;

const StyledLabel = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: ${ThemeColors.white};
`;

export const UpdateProductionModuleModalWrapper = () => {
  const [modalProps, setModalProps] = useUpdateProductionModuleModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <UpdateProductionModuleModal {...modalProps} onClose={onClose} />;
};
