import { SvgPath } from "@/utils/assets_path";
import { FormEvent, MutableRefObject } from "react";
import {
  Container,
  Form,
  Input,
  Label,
  SvgIcon,
  LoaderContainer,
  Progress,
  CustomLoader,
} from "./upload-file-styled";

import theme from "theme/schema.json";

interface IUploadFile {
  setFile(file: any);
  inputFileRef: MutableRefObject<HTMLInputElement>;
  progress: number;
  onFetch: boolean;
}

const UploadFile = ({
  setFile,
  inputFileRef,
  onFetch,
  progress,
}: IUploadFile) => {
  return (
    <Container title="upload file">
      <Form onSubmit={(e: FormEvent) => e.preventDefault()} method="post">
        <Label>
          <Input
            ref={inputFileRef}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <SvgIcon
            src={SvgPath({
              folder: "minimal-icons",
              file_name: "upload-to-cloud",
            })}
          />
        </Label>
        {onFetch && (
          <LoaderContainer>
            <Progress>{progress}%</Progress>
            <CustomLoader
              color={theme.default.colors.blue}
              type="ThreeDots"
              height={45}
              width={45}
            />
          </LoaderContainer>
        )}
      </Form>
    </Container>
  );
};

export default UploadFile;
