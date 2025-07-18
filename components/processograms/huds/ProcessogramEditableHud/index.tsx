import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Image, Info, MessageSquare } from "react-feather";
import { ClipLoader } from "react-spinners";
import { Tooltip } from "@mui/material";
import { Cloud, CloudSnow } from "react-feather";

import { Text } from "@/components/Text";
import { ThemeColors } from "theme/globalStyle";
import { deslugify } from "@/utils/string";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import useDebounce from "@/utils/hooks/useDebounce";
import { getElementNameFromId } from "../../utils/extractInfoFromId";
import { useForm, z, zodResolver } from "@/utils/validation";
import { TextArea } from "@/components/Textarea";
import { useStopTypingDebounce } from "@/utils/hooks/useStopTypingDebounce";
import { useUpdateProcessogramData } from "@/api/react-query/processogram-datas/useProcessogramData";
import { ImagesTab } from "./components/ImagesTab";
import { ProcessogramHierarchy } from "types/processogram";

const ProcessogramDataSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

type ProcessogramDataForm = z.infer<typeof ProcessogramDataSchema>;

type Props = {
  id: string;
  processogram_id: string;
  currentElement: string;
  data: {
    [key: string]: {
      description: string;
    };
  };
  notReady: boolean;
  hierarchy: ProcessogramHierarchy[];
};

export const ProgressogramEditableHud = ({
  id,
  processogram_id,
  currentElement: realTimeElement,
  data,
  notReady,
  hierarchy,
}: Props) => {
  const { reset, watch, register } = useForm<ProcessogramDataForm>({
    resolver: zodResolver(ProcessogramDataSchema),
    defaultValues: {
      description: "",
    },
  });

  const [tab, setTab] = useState<"info" | "chat" | "media">("info");

  const updateDescription = useUpdateProcessogramData();

  const currentElement = useDebounce(realTimeElement, 250);

  const title = useMemo(() => {
    const lastString = currentElement.split(".").pop();

    const id = lastString ?? currentElement;

    return deslugify(getElementNameFromId(id));
  }, [currentElement]);

  const textRef = useRef<string>("");

  const keyRef = useRef<string>("");

  const text = useMemo(() => {
    return data[currentElement]?.description || "";
  }, [currentElement, data, notReady]);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    keyRef.current = realTimeElement;
  }, [realTimeElement]);

  const onChangeDebouncedValues = useCallback((value: string) => {
    if (textRef.current === value) {
      return;
    }

    const key = keyRef.current;

    if (!key) {
      return;
    }

    updateDescription.mutateAsync({
      params: { id },
      body: {
        key,
        description: value,
      },
      helper: {
        processogram_id,
      },
    });
  }, []);

  const { updateWithouTracking, handleInputChange } = useStopTypingDebounce({
    onChange: onChangeDebouncedValues,
  });

  const isPending = useMemo(() => {
    return updateDescription.isPending;
  }, [updateDescription.isPending]);

  useEffect(() => {
    reset({
      description: text,
    });

    updateWithouTracking(text);
  }, [text, updateWithouTracking]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name === "description") {
        const description = value.description || "";
        handleInputChange(description);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, handleInputChange]);

  return (
    <Container
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Tooltip title={isPending ? "Saving changes..." : "Up to date"}>
        <CloudSyncContainer justify="flex-end">
          {isPending ? (
            <CloudSnow size={20} color={ThemeColors.yellow} />
          ) : (
            <Cloud size={20} color={ThemeColors.green} />
          )}

          {isPending && (
            <LoadingContainer>
              <ClipLoader size={8} color={ThemeColors.blue} />
            </LoadingContainer>
          )}
        </CloudSyncContainer>
      </Tooltip>
      <Content>
        {tab === "info" && (
          <FlexColumn>
            <Text variant="h3">{title}</Text>

            {notReady && !text ? (
              <Text>Not ready yet, generating AI content</Text>
            ) : (
              <TextArea label="Description" {...register("description")} />
            )}
          </FlexColumn>
        )}
        {/* {tab === "chat" && <div style={{ height: "100%" }}></div>} */}
        {tab === "media" && (
          <ImagesTab
            hierarchy={hierarchy}
            processogramId={processogram_id}
            currentElement={currentElement}
          />
        )}
      </Content>
      <FooterTabs justify="flex-start" gap={0}>
        <Tooltip title="Information" placement="top">
          <Tab $selected={tab === "info"} onClick={() => setTab("info")}>
            <Info size={24} color={ThemeColors.white} />
          </Tab>
        </Tooltip>
        {/* <Tooltip title="Chat with AI" placement="top">
          <Tab $selected={tab === "chat"} onClick={() => setTab("chat")}>
            <MessageSquare size={24} color={ThemeColors.white} />
          </Tab>
        </Tooltip> */}
        <Tooltip title="Media Gallery" placement="top">
          <Tab $selected={tab === "media"} onClick={() => setTab("media")}>
            <Image size={24} color={ThemeColors.white} />
          </Tab>
        </Tooltip>
      </FooterTabs>
    </Container>
  );
};

const Content = styled(FlexColumn)`
  padding: 1rem;
  padding-top: 3rem;
  height: calc(100% - 140px);
`;

type TabProps = {
  $selected: boolean;
};

const Tab = styled.div<TabProps>`
  padding-block: 1.5rem;
  padding-inline: 2rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &:hover {
    background-color: ${ThemeColors.grey_300};
  }

  ${({ $selected }) =>
    $selected &&
    css`
      box-shadow: inset 0 -2px 0 ${ThemeColors.white};
    `};
`;

const FooterTabs = styled(FlexRow)``;

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloudSyncContainer = styled(FlexRow)`
  position: absolute;
  width: fit-content;
  top: 0.5rem;
  right: 0.5rem;
`;

const Container = styled.div`
  width: 700px;
  box-sizing: border-box;
  height: 100%;
  border: 2px ${ThemeColors.deep_blue} solid;
  background-color: ${ThemeColors.black};
  backdrop-filter: blur(5px);
  overflow: auto;
  position: relative;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
