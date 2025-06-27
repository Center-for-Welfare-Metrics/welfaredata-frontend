import { Text } from "@/components/Text";
import { useMemo } from "react";
import styled from "styled-components";
import { deslugify } from "@/utils/string";
import { FlexColumn } from "@/components/desing-components/Flex";
import useDebounce from "@/utils/hooks/useDebounce";
import { getElementNameFromId } from "@/components/processograms/utils/extractInfoFromId";

type Props = {
  currentElement: string;
  data: {
    [key: string]: {
      description: string;
    };
  };
  notReady: boolean;
};

export const ProcessogramInfo = ({
  currentElement: realTimeElement,
  data,
  notReady,
}: Props) => {
  const currentElement = useDebounce(realTimeElement, 250);

  const title = useMemo(() => {
    const lastString = currentElement.split(".").pop();

    const id = lastString ?? currentElement;

    return deslugify(getElementNameFromId(id));
  }, [currentElement]);

  const text = useMemo(() => {
    return data[currentElement]?.description || "";
  }, [currentElement, data, notReady]);

  return (
    <Container>
      <FlexColumn>
        <Text variant="h3">{title}</Text>

        {notReady && !text ? (
          <Text>Not ready yet, generating AI content</Text>
        ) : (
          <Text variant="body1">{text}</Text>
        )}
      </FlexColumn>
    </Container>
  );
};

const Container = styled.div`
  padding-inline: 2rem;
  padding-top: 2rem;
`;
