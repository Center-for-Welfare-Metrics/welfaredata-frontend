import React, { useRef } from "react";
import HudContext from "@/context/hud-context";
import {
  getLevelNameByGivingID,
  ICoolFormat,
  normalizeElementNameByGivingID,
  translateStackToCoolFormat,
} from "@/utils/processogram";
import HudControls from "./controls";
import HudTreeControl from "./hud-tree-control";
import { Container } from "./hud-styled";
import { useEffect } from "react";
import { useState } from "react";

import { ImainState } from "@/context/processogram";

import update from "immutability-helper";

interface IProcessogramHud {
  element: Element;
  onChange(change: ImainState): void;
  level: number;
  stack: string[];
  isMoving: boolean;
  onHover: string;
}

const ProcessogramHud = ({
  element,
  onChange,
  level,
  stack,
  isMoving,
  onHover,
}: IProcessogramHud) => {
  const elementRect = element.getBoundingClientRect();

  const [stackCoolFormat, setStackCoolFormat] = useState<ICoolFormat[]>([]);

  const [style, setStyle] = useState({
    top: 0,
    left: 0,
  });

  const delay = useRef(null);

  useEffect(() => {
    setStackCoolFormat(translateStackToCoolFormat(stack));
  }, [stack]);

  useEffect(() => {
    updateStyleOnResize();
  }, []);

  const updateStyleOnResize = () => {
    let top = 0;
    let left = 0;
    let nav = document.getElementById("main-nav-menu");
    if (nav) {
      top = nav.getBoundingClientRect().height;
    }
    let editorParent = document.getElementById("processogram-editor-space");
    if (editorParent) {
      left = editorParent.getBoundingClientRect().left;
    }
    setStyle({
      top: top,
      left: left,
    });
  };

  useEffect(() => {
    let match = window.matchMedia("(hover)").matches;
    if (match && stack.length > 0) {
      clearTimeout(delay.current);
      delay.current = setTimeout(() => {
        if (onHover) {
          if (level < 3) {
            let x: ICoolFormat = {
              domID: onHover,
              elementName: normalizeElementNameByGivingID(onHover),
              levelName: getLevelNameByGivingID(onHover),
              level: level + 1,
              isHover: true,
            };
            setStackCoolFormat(
              update(stackCoolFormat, {
                [level + 1]: { $set: x },
              })
            );
          }
        } else {
          setStackCoolFormat(translateStackToCoolFormat(stack));
        }
      }, 100);
    }
  }, [onHover]);

  return (
    <HudContext.Provider value={{ element, onChange, stackCoolFormat }}>
      {!isMoving && (
        <Container
          style={{
            top: elementRect.top - style.top,
            width: elementRect.width,
            height: elementRect.height,
            left: elementRect.left - style.left,
          }}
        >
          {level >= 2 && <HudControls />}
        </Container>
      )}
    </HudContext.Provider>
  );
};

export default React.memo(ProcessogramHud);
