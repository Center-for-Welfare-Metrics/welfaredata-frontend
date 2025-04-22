import styled from "styled-components";
import { useForm, z, zodResolver } from "@/utils/validation";

import { ModalContainer } from "modals/ModalContainer";
import { useCreateSpecieModal } from "./hooks";
import { FormInput } from "@/components/common/inputs/form-input";
import { Button } from "@/components/Button";
import { useCreateSpecie } from "@/api/react-query/species/useSpecies";

const CreateSpecieSchema = z.object({
  name: z.string().min(1, "Name is required"),
  pathname: z.string().min(1, "Pathname is required"),
});

export type CreateSpecieForm = z.infer<typeof CreateSpecieSchema>;

export type CreateSpecieModalProps = {
  onClose: () => void;
};

const CreateSpecieModal = ({ onClose }: CreateSpecieModalProps) => {
  const { handleSubmit, register, formState } = useForm<CreateSpecieForm>({
    resolver: zodResolver(CreateSpecieSchema),
    defaultValues: {
      name: "",
      pathname: "",
    },
  });

  const { errors } = formState;

  const createSpecie = useCreateSpecie();

  const onSubmit = async (data: CreateSpecieForm) => {
    await createSpecie.mutateAsync({
      body: {
        name: data.name,
        pathname: data.pathname,
      },
    });
    onClose();
  };

  return (
    <ModalContainer open={true} onClose={onClose} title="Create a new specie">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Name"
          placeholder="Enter the name of the specie"
          type="text"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormInput
          label="Pathname"
          placeholder="Enter the pathname of the specie"
          type="text"
          error={errors.pathname?.message}
          {...register("pathname")}
        />

        <Button loading={createSpecie.isPending}>Create Specie</Button>
      </Form>
    </ModalContainer>
  );
};

const Form = styled.form``;

export const CreateSpecieModalWrapper = () => {
  const [modalProps, setModalProps] = useCreateSpecieModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <CreateSpecieModal {...modalProps} onClose={onClose} />;
};
