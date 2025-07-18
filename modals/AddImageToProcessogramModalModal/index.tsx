import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box } from "@mui/material";
import { ModalContainer } from "modals/ModalContainer";
import { useAddImageToProcessogramModalModal } from "./hooks";
import { FormInput } from "components/FormInput";
import { Select, SelectOption } from "components/Select";
import Dropzone from "components/Dropzone";
import { ThemeColors } from "theme/globalStyle";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { FlexColumn } from "@/components/desing-components/Flex";
import {
  useAddProcessogramImage,
  useAddProcessogramImageWithFile,
} from "@/api/react-query/processogram-images/useGetImages";
import { SearchedImageResult } from "@/api/react-query/public/useGetImages";

const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

const imageUrlSchema = z
  .string()
  .url("Please enter a valid URL")
  .refine((url) => {
    try {
      const urlObj = new URL(url);
      const extension = urlObj.pathname.split(".").pop()?.toLowerCase();
      return ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(
        extension || ""
      );
    } catch {
      return false;
    }
  }, "URL must point to a valid image file (jpg, jpeg, png, webp, gif, svg)");

const imageFileSchema = z
  .instanceof(File)
  .refine(
    (file) => SUPPORTED_IMAGE_TYPES.includes(file.type),
    "Please upload a valid image file (JPG, PNG, WebP, GIF, SVG)"
  );

const formSchema = z.discriminatedUnion("uploadType", [
  z.object({
    uploadType: z.literal("link"),
    imageUrl: imageUrlSchema,
    title: z.string().optional(),
  }),
  z.object({
    uploadType: z.literal("file"),
    imageFile: imageFileSchema,
    title: z.string().optional(),
  }),
]);

type FormData = z.infer<typeof formSchema>;

export type AddImageToProcessogramModalModalProps = {
  onClose: () => void;
  processogramId: string;
  currentElement: string;
};

const uploadOptions: SelectOption[] = [
  { value: "link", label: "Upload from URL" },
  { value: "file", label: "Upload file" },
];

const AddImageToProcessogramModalModal = ({
  onClose,
  currentElement,
  processogramId,
}: AddImageToProcessogramModalModalProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uploadType: "link",
    },
  });

  const addProcessogramImage = useAddProcessogramImage();

  const addProcessogramImageWithFile = useAddProcessogramImageWithFile();

  const uploadType = watch("uploadType");

  const onFormSubmit = async (item: FormData) => {
    if (item.uploadType === "link") {
      await addProcessogramImage.mutateAsync({
        processogram_id: processogramId,
        key: currentElement,
        url: item.imageUrl,
        title: item.title ?? "",
      });
    }

    if (item.uploadType === "file" && uploadedFile) {
      const formData = new FormData();
      formData.append("processogram_id", processogramId);
      formData.append("key", currentElement);
      formData.append("file", uploadedFile);
      formData.append("title", item.title ?? "");
      await addProcessogramImageWithFile.mutateAsync({
        processogram_id: processogramId,
        body: formData,
      });
    }

    onClose();
  };

  const handleFileAccepted = (file: File) => {
    setUploadedFile(file);
    setValue("imageFile", file);
  };

  const handleFileRemoved = () => {
    setUploadedFile(null);
    // setValue("imageFile", undefined);
  };

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Add Image to Processogram"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ width: "100%", minWidth: "400px" }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="calc(100% - 40px)"
        gap={1}
      >
        <FlexColumn gap={3}>
          <Controller
            name="uploadType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={uploadOptions}
                label="Upload Method"
                searchable={false}
                error={errors.uploadType?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <FormInput
                {...field}
                label="Image Title"
                placeholder="Enter image title (optional)"
                error={errors.title?.message}
              />
            )}
          />

          {uploadType === "link" && (
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label="Image URL"
                  placeholder="https://example.com/image.jpg"
                  error={
                    uploadType === "link" && "imageUrl" in errors
                      ? errors.imageUrl?.message
                      : undefined
                  }
                />
              )}
            />
          )}

          {uploadType === "file" && (
            <Controller
              name="imageFile"
              control={control}
              render={() => (
                <Box>
                  <Dropzone
                    onFileAccepted={handleFileAccepted}
                    onFileRemoved={handleFileRemoved}
                    currentFile={uploadedFile}
                    onFileRejected={(rejections) => {
                      console.error("File rejected:", rejections);
                    }}
                    textContent={
                      uploadedFile ? (
                        <Text variant="body1">
                          File selected: {uploadedFile.name}
                        </Text>
                      ) : (
                        <Text variant="body1">
                          Drag and drop an image file here or click to select
                        </Text>
                      )
                    }
                    accept={{
                      "image/jpeg": [".jpg", ".jpeg"],
                      "image/png": [".png"],
                      "image/webp": [".webp"],
                      "image/gif": [".gif"],
                      "image/svg+xml": [".svg"],
                    }}
                  />
                  {"imageFile" in errors &&
                    uploadType === "file" &&
                    errors.imageFile && (
                      <Box
                        sx={{ color: ThemeColors.red, fontSize: "12px", mt: 1 }}
                      >
                        {errors.imageFile.message}
                      </Box>
                    )}
                </Box>
              )}
            />
          )}
        </FlexColumn>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            buttonStyle="success"
            type="submit"
            loading={
              addProcessogramImage.isPending ||
              addProcessogramImageWithFile.isPending
            }
          >
            Add Image
          </Button>
        </Box>
      </Box>
    </ModalContainer>
  );
};

export const AddImageToProcessogramModalModalWrapper = () => {
  const [modalProps, setModalProps] = useAddImageToProcessogramModalModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <AddImageToProcessogramModalModal {...modalProps} onClose={onClose} />;
};
