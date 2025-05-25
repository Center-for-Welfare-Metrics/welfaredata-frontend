import { useState } from "react";
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

const CreateProcessogramSchema = z.object({
  name: z.string().min(1, "Name is required"),
  theme: z.enum(["light", "dark"], {
    message: "Theme is required",
  }),
  file: z.custom<File>().refine((file) => !!file, {
    message: "File is required",
  }),
});

type CreateProcessogramForm = z.infer<typeof CreateProcessogramSchema>;

export type CreateProcessogramModalProps = {
  onClose: () => void;
  specie_id: string;
  production_module_id: string;
  pathname: string;
};

const CreateProcessogramModal = ({
  onClose,
  specie_id,
  production_module_id,
  pathname,
}: CreateProcessogramModalProps) => {
  const queryClient = useQueryClient();

  const { handleSubmit, register, formState, setValue, watch, reset, control } =
    useForm<CreateProcessogramForm>({
      resolver: zodResolver(CreateProcessogramSchema),
      defaultValues: {
        name: "",
      },
    });

  const [isLoading, setIsLoading] = useState(false);

  const { errors, isDirty } = formState;

  const file = watch("file");

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
      formData.append("specie_id", specie_id);
      formData.append("production_module_id", production_module_id);
      formData.append("path", pathname);
      formData.append("theme", data.theme);

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

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Create a Processogram"
      unsavedChanges={{
        enabled: isDirty,
        message:
          "You haven’t finished creating this processogram. If you leave now, your changes will be lost.",
      }}
    >
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

            {file && (
              <FlexColumn gap={0}>
                <Text variant="body2">File: {file.name}</Text>
                <Text variant="body2">Size: {filesize(file.size)}</Text>
              </FlexColumn>
            )}
            <FlexColumn>
              <Dropzone onFileAccepted={onFileAccepted} />
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
