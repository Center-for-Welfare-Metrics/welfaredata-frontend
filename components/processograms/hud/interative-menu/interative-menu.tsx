import React from "react";
import HudContext from "@/context/hud-context";
import ProcessogramContext, { ISpecie } from "@/context/processogram";
import {
  IContentInformation,
  getCollectionInformationsByCoolFormat,
  ICoolFormat,
} from "@/utils/processogram";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

import { Container, Minimize, Share, CopyTo } from "./interative-menu-styled";
import Svg from "react-inlinesvg";
import useGesture from "@/utils/gestures";
import MenuTabs from "./menu-tabs/menu-tabs";
import { SvgPath } from "@/utils/assets_path";
import toast from "react-hot-toast";
import { ChevronDown } from "react-feather";
import { createContext } from "react";
import { useRecoilState } from "recoil";
import { recoilMenuState } from "recoil/processogram";

export type IInterativeMenuState = "minimized" | "full" | "hide";

export interface IInterativeMenu {
  stackCoolFormat: ICoolFormat[];
  shareString: string;
  specie: ISpecie;
}

export const InterativeMenuContext = createContext<IInterativeMenu>(null);

const InterativeMenu = ({ stackCoolFormat, shareString, specie }) => {
  const { collection } = useContext(ProcessogramContext);

  const [content, setContent] = useState<IContentInformation>(null);

  const [state, setState] = useRecoilState(recoilMenuState);

  const [renderTime, setRenderTime] = useState(false);

  const gesture = useGesture(["to-up", "to-down"]);

  const [style, setStyle] = useState({
    maxWidth: null,
    left: 0,
  });

  const [top, setTop] = useState(0);
  useEffect(() => {
    // if (gesture) {
    //   if (gesture.gesture === "to-up") {
    //     setState("full");
    //   } else if (gesture.gesture === "to-down") {
    //     setState("minimized");
    //   }
    // }
  }, [gesture]);

  useEffect(() => {
    let content = getCollectionInformationsByCoolFormat(
      stackCoolFormat,
      collection
    ).content;
    setContent(content);
    if (content === null) {
      setContent(specie);
    }
  }, [stackCoolFormat]);

  useEffect(() => {
    let editorParent = document.getElementById("processogram-editor-space");
    if (editorParent) {
      let { width, left } = editorParent.getBoundingClientRect();
      setStyle({
        maxWidth: width,
        left: left,
      });
    }
    let nav = document.getElementById("main-nav-menu");
    if (nav) {
      let top = nav.getBoundingClientRect().height;
      setTop(top);
    }
    setTimeout(() => {
      setRenderTime(true);
    }, 500);
  }, []);

  const onClick = (event: Event) => {
    event.stopPropagation();
    let userSelection = window.getSelection().toString();

    if (state === "minimized") {
      setState("full");
    } else {
      if (userSelection.length === 0) {
        setState("minimized");
      }
    }
  };

  const [copied, setCopied] = useState(0);

  useEffect(() => {
    if (copied) {
      toast.success("Link Copied! Share with your friends!");
    }
  }, [copied]);

  return (
    renderTime &&
    content !== null && (
      <InterativeMenuContext.Provider
        value={{ shareString, stackCoolFormat, specie }}
      >
        <Container
          style={style}
          onContextMenu={(e) => e.stopPropagation()}
          onClick={onClick}
          state={state}
        >
          <MenuTabs state={state} content={content} />
          {/* <CopyTo
            style={{ top: top, left: style.maxWidth }}
            onClick={(e) => e.stopPropagation()}
          >
            <CopyToClipboard
              text={shareString || ""}
              onCopy={() => {
                setCopied(copied + 1);
              }}
            >
              <Share />
            </CopyToClipboard>
          </CopyTo> */}
          <Minimize state={state}>
            <ChevronDown size={24} strokeWidth={1.5} />
          </Minimize>
        </Container>
      </InterativeMenuContext.Provider>
    )
  );
};

export default React.memo(InterativeMenu);
