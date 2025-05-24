import styled from "styled-components";
import { useForm, z, zodResolver } from "@/utils/validation";

import { ModalContainer } from "modals/ModalContainer";
import { useCreateSpecieModal } from "./hooks";
import { Button } from "@/components/Button";
import { useCreateSpecie } from "@/api/react-query/species/useSpecies";
import { FormInput } from "@/components/FormInput";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";

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

  const { errors, isDirty } = formState;

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
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Create a new species"
      width="500px"
      height="350px"
      unsavedChanges={{
        enabled: isDirty,
        message:
          "You haven’t finished creating this species. If you leave now, your changes will be lost.",
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FlexColumn gap={2} mt={1} justify="space-between" height="100%">
          <FlexColumn gap={2}>
            <FormInput
              label="Name"
              placeholder="Enter the name of the specie"
              type="text"
              error={errors.name?.message}
              autoFocus
              {...register("name")}
            />
            <FormInput
              label="Pathname"
              placeholder="Enter the pathname of the specie"
              type="text"
              error={errors.pathname?.message}
              {...register("pathname")}
            />
          </FlexColumn>
          <FlexRow justify="flex-end">
            <Button buttonStyle="success" loading={createSpecie.isPending}>
              Create Specie
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

export const CreateSpecieModalWrapper = () => {
  const [modalProps, setModalProps] = useCreateSpecieModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <CreateSpecieModal {...modalProps} onClose={onClose} />;
};
