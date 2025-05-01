import { ModalContainer } from "modals/ModalContainer";
import { useCreateProductionModuleModal } from "./hooks";
import { useForm, z, zodResolver } from "@/utils/validation";
import { FormInput } from "@/components/common/inputs/form-input";
import { Button } from "@/components/Button";
import { useCreateProductionModule } from "@/api/react-query/production-modules/useProductionModule";
import styled from "styled-components";

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
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Name"
          placeholder="Enter the name of the production module"
          type="text"
          error={errors.name?.message}
          {...register("name")}
        />

        <Button
          buttonStyle="success"
          loading={createProductionModule.isPending}
        >
          Create Production Module
        </Button>
      </Form>
    </ModalContainer>
  );
};

const Form = styled.form``;

export const CreateProductionModuleModalWrapper = () => {
  const [modalProps, setModalProps] = useCreateProductionModuleModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <CreateProductionModuleModal {...modalProps} onClose={onClose} />;
};
