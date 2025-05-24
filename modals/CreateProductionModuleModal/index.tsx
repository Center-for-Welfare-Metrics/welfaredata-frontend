import { ModalContainer } from "modals/ModalContainer";
import { useCreateProductionModuleModal } from "./hooks";
import { useForm, z, zodResolver } from "@/utils/validation";
import { Button } from "@/components/Button";
import { useCreateProductionModule } from "@/api/react-query/production-modules/useProductionModule";
import styled from "styled-components";
import { FormInput } from "@/components/FormInput";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";

const CreateProductionModuleSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateProductionModuleForm = z.infer<
  typeof CreateProductionModuleSchema
>;

export type CreateSpecieModalProps = {
  onClose: () => void;
};

export type CreateProductionModuleModalProps = {
  onClose: () => void;
  specie_id: string;
};

const CreateProductionModuleModal = ({
  onClose,
  specie_id,
}: CreateProductionModuleModalProps) => {
  const { handleSubmit, register, formState } =
    useForm<CreateProductionModuleForm>({
      resolver: zodResolver(CreateProductionModuleSchema),
      defaultValues: {
        name: "",
      },
    });

  const { errors } = formState;

  const createProductionModule = useCreateProductionModule();

  const onSubmit = async (data: CreateProductionModuleForm) => {
    await createProductionModule.mutateAsync({
      body: {
        name: data.name,
        specie_id,
      },
    });
    onClose();
  };

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Create a new production module"
      height="250px"
      width="500px"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FlexColumn justify="space-between" height="100%">
          <FormInput
            label="Name"
            placeholder="Enter the name of the production module"
            type="text"
            error={errors.name?.message}
            {...register("name")}
          />

          <FlexRow justify="flex-end">
            <Button
              buttonStyle="success"
              loading={createProductionModule.isPending}
            >
              Create Production Module
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

export const CreateProductionModuleModalWrapper = () => {
  const [modalProps, setModalProps] = useCreateProductionModuleModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <CreateProductionModuleModal {...modalProps} onClose={onClose} />;
};
