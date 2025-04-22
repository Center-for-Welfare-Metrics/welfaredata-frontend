import { Text } from "@/components/Text";
import { useState } from "react";
import toast from "react-hot-toast";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { FormInput } from "@/components/common/inputs/form-input";
import { ThemeColors } from "theme/globalStyle";
import { uploadSvgElement } from "@/api/react-query/svg-elements/useUploadSvgElement";

export const UploadSvg = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [specie, setSpecie] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!specie) {
      setMessage("Please enter a specie");
      return;
    }

    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("specie", specie);

      const response = await uploadSvgElement(formData);

      toast.success("File uploaded successfully!");
      // setFile(null); // Reset file input

      // Reset the file input
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FlexColumn gap={8}>
      <Text variant="h1">Upload Svg</Text>

      <FlexRow>
        <FlexColumn align="flex-start">
          <FormInput
            name="Specie"
            label="Specie"
            placeholder="e.g., Pig"
            value={specie || ""}
            onChange={(e: any) => setSpecie(e.target.value)}
            style={{ width: "300px" }}
          />
          <input type="file" onChange={handleFileChange} accept=".svg" />
          <button
            onClick={handleUpload}
            disabled={isLoading}
            style={{
              padding: "5px 15px",
              backgroundColor: isLoading ? "#cccccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </FlexColumn>

        {file && (
          <Text>
            <strong>Selected file:</strong> {file.name}
          </Text>
        )}
      </FlexRow>

      {message && (
        <div
          style={{
            padding: "10px",
            backgroundColor: ThemeColors.red,
            borderRadius: "4px",
            marginTop: "10px",
          }}
        >
          {message}
        </div>
      )}
    </FlexColumn>
  );
};
