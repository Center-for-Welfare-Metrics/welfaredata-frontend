import { useMemo, useState } from "react";
import { IContentInformation } from "@/utils/processogram";
import {
  Container,
  TabIconsContainer,
  TabIcon,
  Body,
  TabIconSizeFix,
} from "./menu-tabs-styled";
import DescriptionTab from "./description-tab";

import Svg from "react-inlinesvg";
import { SvgPath } from "@/utils/assets_path";
import { IInterativeMenuState } from "../interative-menu";
import MediaTab from "./media-tab";
import React from "react";
import { useEffect } from "react";
import FeedbackTab from "./feedback-tab";
import { useRecoilState } from "recoil";
import {
  recoilGlobalDescription,
  recoilGlobalMedias,
  recoilLocalDescription,
  recoilLocalMedias,
} from "recoil/processogram";
import voca from "voca";
export type tabOptions = "description" | "media" | "feedback";

const TabIcons = ({ TabIconClick, tab, hasMedia, state }) => {
  return (
    <TabIconsContainer state={state}>
      <TabIconSizeFix
        state={state}
        active={tab === "description"}
        onClick={TabIconClick("description")}
      >
        <Svg
          src={SvgPath({
            folder: "icons",
            file_name: "information",
          })}
        />
      </TabIconSizeFix>
      {hasMedia && (
        <TabIcon
          state={state}
          active={tab === "media"}
          onClick={TabIconClick("media")}
        >
          <Svg
            src={SvgPath({
              folder: "icons",
              file_name: "media-outline",
            })}
          />
        </TabIcon>
      )}
      <TabIcon
        state={state}
        active={tab === "feedback"}
        onClick={TabIconClick("feedback")}
      >
        <Svg
          src={SvgPath({
            folder: "icons",
            file_name: "feedback",
          })}
        />
      </TabIcon>
    </TabIconsContainer>
  );
};

const TabIconsMemo = React.memo(TabIcons);

interface IMenutabs {
  content: IContentInformation;
  state: IInterativeMenuState;
}

const MenuTabs = ({ content, state }: IMenutabs) => {
  const [tab, setTab] = useState<tabOptions>("description");

  const globaUniqueId = useMemo(() => {
    if (content.levelName) {
      return voca.camelCase(content?.levelName) + content?.ref__id;
    } else {
      return content._id;
    }
  }, [content]);

  const localUniqueId = useMemo(() => {
    if (content.levelName) {
      return voca.camelCase(content?.levelName) + content?._id;
    } else {
      return content._id;
    }
  }, [content]);

  const [global, setGlobal] = useRecoilState(
    recoilGlobalDescription(globaUniqueId)
  );

  const [specific, setSpecific] = useRecoilState(
    recoilLocalDescription(localUniqueId)
  );

  const [globalMedias, setGlobalMedias] = useRecoilState(
    recoilGlobalMedias(globaUniqueId)
  );

  const [localMedias, setLocalMedias] = useRecoilState(
    recoilLocalMedias(localUniqueId)
  );

  useEffect(() => {
    if (tab === "media") {
      if (mediasCount() === 0) {
        setTab("description");
      }
    }
    if (!!!global && content.ref_description) {
      setGlobal(content.ref_description);
    }

    if (!!!specific && content.description) {
      setSpecific(content.description);
    }

    if (!!!globalMedias && content.ref_medias) {
      setGlobalMedias(content.ref_medias);
    }

    if (!!!localMedias && content.medias) {
      setLocalMedias(content.medias);
    }
  }, [content]);

  useEffect(() => {
    if (state === "minimized") {
      setTab("description");
    }
  }, [state]);

  const BodyTouchStart = (event) => {
    if (event.currentTarget.scrollTop > 0) {
      event.stopPropagation();
    }
  };

  const TabIconClick = (tab: tabOptions) => (event: Event) => {
    if (state === "full") {
      event.stopPropagation();
      setTab(tab);
    } else if (state === "minimized") {
      setTab(tab);
    }
  };

  const mediasCount = () => {
    let ref = globalMedias?.length || 0;
    let local = localMedias?.length || 0;
    let total = ref + local;

    return total;
  };

  return (
    <Container $state={state} $tab={tab}>
      <TabIconsMemo
        state={state}
        hasMedia={mediasCount() > 0}
        tab={tab}
        TabIconClick={TabIconClick}
      />
      <Body
        tab={tab}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={BodyTouchStart}
      >
        {tab === "description" && (
          <DescriptionTab
            ref_description={global}
            ref_name={content.ref_alternative_name || content.ref_name}
            description={specific}
            levelName={content.levelName}
            _id={content?._id}
          />
        )}
        {tab === "media" && (
          <MediaTab ref_medias={globalMedias} medias={localMedias} />
        )}
        {tab === "feedback" && <FeedbackTab />}
      </Body>
    </Container>
  );
};

export default MenuTabs;
