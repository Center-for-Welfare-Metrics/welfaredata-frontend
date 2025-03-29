import { Text } from "@/components/Text";
import { useState } from "react";
import toast from "react-hot-toast";
import adminApi from "queries/admin/svg";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";

export const UploadSvg = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await adminApi.uploadSvg(formData);

      console.log(response);

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
      <Text variant="h1">Página de upload</Text>

      <FlexRow>
        <FlexColumn align="flex-start">
          <input type="file" onChange={handleFileChange} accept=".svg" />
          <button
            onClick={handleUpload}
            disabled={isLoading || !file}
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
            backgroundColor: message.includes("Failed") ? "#ffcccc" : "#ccffcc",
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
