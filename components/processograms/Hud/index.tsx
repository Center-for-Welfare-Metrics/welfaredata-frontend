import { Text } from "@/components/Text";
import { useMemo } from "react";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ElementData } from "types/element-data";
import { getElementNameFromId } from "../utils/extractInfoFromId";
import { transparentize } from "polished";
import { deslugify } from "@/utils/string";
import { FlexColumn } from "@/components/desing-components/Flex";

type Props = {
  currentElement: string;
  data: ElementData["data"];
  notReady: boolean;
};

export const ProgressogramHud = ({ currentElement, data, notReady }: Props) => {
  const elementName = useMemo(() => {
    return getElementNameFromId(currentElement);
  }, [currentElement]);

  const title = useMemo(() => {
    return deslugify(elementName);
  }, [elementName]);

  const text = useMemo(() => {
    if (notReady) return "";

    return data[elementName]?.description || "";
  }, [elementName, data, notReady]);

  return (
    <Container>
      <FlexColumn>
        <Text variant="body1">{title}</Text>

        {notReady ? (
          <Text>Not ready yet, generating AI content</Text>
        ) : (
          <Text variant="body2">{text}</Text>
        )}
      </FlexColumn>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  padding: 2rem;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 200px;
  border: 2px ${ThemeColors.deep_blue} solid;
  background-color: ${transparentize(0.3, ThemeColors.black)};
`;
