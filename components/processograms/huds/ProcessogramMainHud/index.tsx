import { useState } from "react";
import styled, { css } from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { FlexRow } from "@/components/desing-components/Flex";
import useDebounce from "@/utils/hooks/useDebounce";
import { ProcessogramInfo } from "./tabs/Info";
import { Image, Info, MessageSquare } from "react-feather";
import { AiChat } from "./tabs/AiChat";
import { ProcessogramHierarchy } from "types/processogram";
import { ProcessogramQuestionData } from "types/processogram-questions";
import MediaGallery from "./tabs/MediaGallery";
import { Tooltip } from "@mui/material";
import { media } from "styles/media";

type Props = {
  currentElement: string;
  data: {
    [key: string]: {
      description: string;
    };
  };
  processogramId: string;
  notReady: boolean;
  hierarchy: ProcessogramHierarchy[];
  questionData: ProcessogramQuestionData | null;
};

export const ProgressogramMainHud = ({
  currentElement: realTimeElement,
  data,
  notReady,
  hierarchy,
  questionData,
  processogramId,
}: Props) => {
  const [tab, setTab] = useState<"info" | "chat" | "media">("info");

  const currentElement = useDebounce(realTimeElement, 250);

  return (
    <Container
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Content>
        {tab === "info" && (
          <ProcessogramInfo
            currentElement={currentElement}
            data={data}
            notReady={notReady}
          />
        )}

        <div
          style={{
            height: "100%",
            display: tab === "chat" ? undefined : "none",
          }}
        >
          <AiChat
            hierarchy={hierarchy}
            questions={questionData?.data?.[currentElement]?.questions ?? []}
          />
        </div>

        {tab === "media" && (
          <MediaGallery
            currentElement={currentElement}
            processogramId={processogramId}
          />
        )}
      </Content>
      <FooterTabs justify="flex-start" gap={0}>
        <Tooltip title="Information" placement="top">
          <Tab $selected={tab === "info"} onClick={() => setTab("info")}>
            <Info size={24} color={ThemeColors.white} />
          </Tab>
        </Tooltip>
        <Tooltip title="Chat with AI" placement="top">
          <Tab $selected={tab === "chat"} onClick={() => setTab("chat")}>
            <MessageSquare size={24} color={ThemeColors.white} />
          </Tab>
        </Tooltip>
        <Tooltip title="Media Gallery" placement="top">
          <Tab $selected={tab === "media"} onClick={() => setTab("media")}>
            <Image size={24} color={ThemeColors.white} />
          </Tab>
        </Tooltip>
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
    background-color: ${ThemeColors.grey_300};
  }

  ${({ $selected }) =>
    $selected &&
    css`
      box-shadow: inset 0 -2px 0 ${ThemeColors.white};

      ${media.up.medium`
        box-shadow: inset -2px 0px 0px 0px ${ThemeColors.white};
      `}
    `};

  ${media.up.medium`
    padding-inline: 0rem;
    width: 50px;
    height: 100%;
  `}
`;

const FooterTabs = styled(FlexRow)`
  ${media.up.medium`
    flex-direction: column;
    position: sticky;
    height: 100%;
    top: 0;
  `}
`;

const Content = styled.div`
  height: calc(100% - 5rem);

  ${media.up.medium`
    height: 100%;
  `}
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  border-right: 2px ${ThemeColors.deep_blue} solid;
  background-color: ${ThemeColors.black};
  backdrop-filter: blur(5px);
  overflow: auto;
  position: relative;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.up.medium`
    flex-direction: row-reverse;
    border-right: none;
    border-top: 2px ${ThemeColors.deep_blue} solid;
  `}
`;
