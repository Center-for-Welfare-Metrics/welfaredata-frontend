import { useState } from "react";
import { Tooltip } from "@mui/material";
import { Button } from "@/components/Button";

type CopyButtonProps = {
  buttonStyle?: "success" | "danger" | "primary" | "warning";
  children?: React.ReactNode;
  content: string;
  onCopy?: (content: string) => void;
};

export const CopyButton = ({
  buttonStyle = "primary",
  children = "Copy",
  content,
  onCopy,
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopy?.(content);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy content: ", err);
    }
  };

  return (
    <Tooltip
      title={copied ? "Copied!" : "Click to copy"}
      arrow
      open={copied ? true : undefined}
    >
      <div>
        <Button buttonStyle={buttonStyle} onClick={copyContent}>
          {children}
        </Button>
      </div>
    </Tooltip>
  );
};
