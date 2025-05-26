import { Text } from "@/components/Text";
import { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { transparentize } from "polished";
import { deslugify } from "@/utils/string";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import useDebounce from "@/utils/hooks/useDebounce";
import { getElementNameFromId } from "../../utils/extractInfoFromId";
import { useForm, z, zodResolver } from "@/utils/validation";
import { TextArea } from "@/components/Textarea";
import { useStopTypingDebounce } from "@/utils/hooks/useStopTypingDebounce";
import { useUpdateProcessogramData } from "@/api/react-query/processogram-datas/useProcessogramData";
import { CloudCheckIcon, CloudSnowIcon } from "@phosphor-icons/react";
import { ClipLoader } from "react-spinners";
import { Tooltip } from "@mui/material";

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
};

export const ProgressogramEditableHud = ({
  id,
  processogram_id,
  currentElement: realTimeElement,
  data,
  notReady,
}: Props) => {
  const { reset, watch, register } = useForm<ProcessogramDataForm>({
    resolver: zodResolver(ProcessogramDataSchema),
    defaultValues: {
      description: "",
    },
  });

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
            <CloudSnowIcon size={20} color={ThemeColors.yellow} weight="bold" />
          ) : (
            <CloudCheckIcon size={20} color={ThemeColors.green} weight="bold" />
          )}

          {isPending && (
            <LoadingContainer>
              <ClipLoader size={8} color={ThemeColors.blue} />
            </LoadingContainer>
          )}
        </CloudSyncContainer>
      </Tooltip>
      <FlexColumn>
        <Text variant="h3">{title}</Text>

        {notReady && !text ? (
          <Text>Not ready yet, generating AI content</Text>
        ) : (
          <TextArea label="Description" {...register("description")} />
        )}
      </FlexColumn>
    </Container>
  );
};

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloudSyncContainer = styled(FlexRow)`
  position: absolute;
  width: fit-content;
  top: 1rem;
  right: 1rem;
`;

const Container = styled.div`
  padding: 2rem;
  width: 500px;
  box-sizing: border-box;
  height: 100%;
  border: 2px ${ThemeColors.deep_blue} solid;
  background-color: ${transparentize(0.3, ThemeColors.black)};
  backdrop-filter: blur(5px);
  overflow: auto;
  position: relative;
  z-index: 1000;
`;
