import { Text } from "@/components/Text";
import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { transparentize } from "polished";
import { deslugify } from "@/utils/string";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import useDebounce from "@/utils/hooks/useDebounce";
import { getElementNameFromId } from "../../utils/extractInfoFromId";
import { ProcessogramInfo } from "./tabs/Info";
import { Info } from "react-feather";
import { ChatIcon } from "@phosphor-icons/react";
import { AiChat } from "./tabs/AiChat";

type Props = {
  currentElement: string;
  data: {
    [key: string]: {
      description: string;
    };
  };
  notReady: boolean;
};

export const ProgressogramMainHud = ({
  currentElement: realTimeElement,
  data,
  notReady,
}: Props) => {
  const [tab, setTab] = useState<"info" | "chat">("info");

  const currentElement = useDebounce(realTimeElement, 250);

  const currentTab = useMemo(() => {
    if (tab === "chat") {
      return <AiChat />;
    }

    return (
      <ProcessogramInfo
        currentElement={currentElement}
        data={data}
        notReady={notReady}
      />
    );
  }, [tab]);

  return (
    <Container
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Content>{currentTab}</Content>
      <FooterTabs justify="flex-start" gap={0}>
        <Tab $selected={tab === "info"} onClick={() => setTab("info")}>
          <Info size={24} color={ThemeColors.white} />
        </Tab>
        <Tab $selected={tab === "chat"} onClick={() => setTab("chat")}>
          <ChatIcon size={24} color={ThemeColors.white} />
        </Tab>
      </FooterTabs>
    </Container>
  );
};

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
    background-color: ${transparentize(0.8, ThemeColors.white)};
  }

  ${({ $selected }) =>
    $selected &&
    css`
      box-shadow: inset 0 -2px 0 ${ThemeColors.white};
    `};
`;

const FooterTabs = styled(FlexRow)``;

const Content = styled.div`
  height: calc(100% - 5rem);
`;

const Container = styled.div`
  width: 400px;
  box-sizing: border-box;
  height: 100%;
  border: 2px ${ThemeColors.deep_blue} solid;
  background-color: ${transparentize(0.3, ThemeColors.black)};
  backdrop-filter: blur(5px);
  overflow: auto;
  position: relative;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
