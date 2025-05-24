import styled from "styled-components";
import { useForm, z, zodResolver } from "@/utils/validation";

import { ModalContainer } from "modals/ModalContainer";
import { useUpdateSpecieModal } from "./hooks";
import { Button } from "@/components/Button";
import { useUpdateSpecie } from "@/api/react-query/species/useSpecies";
import { TextArea } from "@/components/Textarea";
import { FormInput } from "@/components/FormInput";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";

const UpdateSpecieSchema = z.object({
  name: z.string().min(1, "Name is required"),
  pathname: z.string().min(1, "Pathname is required"),
  description: z.string().optional(),
});

export type UpdateSpecieForm = z.infer<typeof UpdateSpecieSchema>;

export type UpdateSpecieModalProps = {
  onClose: () => void;
  specie: {
    _id: string;
    name: string;
    pathname: string;
    description?: string;
  };
};

const UpdateSpecieModal = ({ onClose, specie }: UpdateSpecieModalProps) => {
  const { handleSubmit, register, formState } = useForm<UpdateSpecieForm>({
    resolver: zodResolver(UpdateSpecieSchema),
    defaultValues: {
      name: specie.name,
      pathname: specie.pathname,
      description: specie.description || "",
    },
  });

  const { errors, isDirty } = formState;

  const updateSpecie = useUpdateSpecie();

  const onSubmit = async (data: UpdateSpecieForm) => {
    await updateSpecie.mutateAsync({
      params: {
        specie_id: specie._id,
      },
      body: {
        name: data.name,
        pathname: data.pathname,
        description: data.description,
      },
    });
    onClose();
  };

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Update specie"
      unsavedChanges={{
        enabled: isDirty,
        message:
          "You haven’t finished updating this species. If you leave now, your changes will be lost.",
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
            <TextArea
              label="Description"
              placeholder="Enter a description for the specie"
              error={errors.description?.message}
              {...register("description")}
            />
          </FlexColumn>
          <FlexRow justify="flex-end">
            <Button buttonStyle="success" loading={updateSpecie.isPending}>
              Update Specie
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

export const UpdateSpecieModalWrapper = () => {
  const [modalProps, setModalProps] = useUpdateSpecieModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <UpdateSpecieModal {...modalProps} onClose={onClose} />;
};
