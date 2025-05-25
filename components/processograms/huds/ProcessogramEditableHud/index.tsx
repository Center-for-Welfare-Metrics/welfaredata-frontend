import { Text } from "@/components/Text";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { transparentize } from "polished";
import { deslugify } from "@/utils/string";
import { FlexColumn } from "@/components/desing-components/Flex";
import useDebounce from "@/utils/hooks/useDebounce";
import { getElementNameFromId } from "../../utils/extractInfoFromId";
import { useForm, z, zodResolver } from "@/utils/validation";
import { TextArea } from "@/components/Textarea";
import { useStopTypingDebounce } from "@/utils/hooks/useStopTypingDebounce";
import { useUpdateProcessogramData } from "@/api/react-query/processogram-datas/useProcessogramData";

const ProcessogramDataSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

type ProcessogramDataForm = z.infer<typeof ProcessogramDataSchema>;

type Props = {
  id: string;
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

  const { updateWithouTracking, handleInputChange, debouncedValue } =
    useStopTypingDebounce();

  useEffect(() => {
    keyRef.current = realTimeElement;
  }, [realTimeElement]);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    if (textRef.current === debouncedValue) {
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
        description: debouncedValue,
      },
    });
  }, [debouncedValue]);

  useEffect(() => {
    reset({
      description: text,
    });

    updateWithouTracking(text);
  }, [text, updateWithouTracking]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "description") {
        const description = value.description || "";
        handleInputChange(description);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  return (
    <Container
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
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
