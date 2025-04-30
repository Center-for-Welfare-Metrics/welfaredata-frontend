import { Text } from "@/components/Text";
import { useMemo } from "react";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ElementData } from "types/element-data";
import { getElementNameFromId } from "../utils/extractInfoFromId";
import { transparentize } from "polished";
import { deslugify } from "@/utils/string";
import { FlexColumn } from "@/components/desing-components/Flex";
import useDebounce from "@/utils/hooks/useDebounce";

type Props = {
  currentElement: string;
  data: {
    [key: string]: {
      description: string;
    };
  };
  notReady: boolean;
};

export const ProgressogramHud = ({
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
          <Text variant="body1">{text}</Text>
        )}
      </FlexColumn>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  width: 400px;
  box-sizing: border-box;
  height: 100%;
  border: 2px ${ThemeColors.deep_blue} solid;
  background-color: ${transparentize(0.3, ThemeColors.black)};
  backdrop-filter: blur(5px);
  overflow: auto;
  position: relative;
  z-index: 1000;
`;
