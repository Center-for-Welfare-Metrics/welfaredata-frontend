import React, { useRef } from "react";
import HudContext from "@/context/hud-context";
import HudControls from "./controls";
import { Container } from "./hud-styled";
import { useEffect } from "react";
import { useState } from "react";

import { ImainState } from "@/context/processogram";

import update from "immutability-helper";
import { useRecoilValue } from "recoil";
import { recoilCoolStack } from "recoil/processogram";

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

  const coolStack = useRecoilValue(recoilCoolStack);

  const [style, setStyle] = useState({
    top: 0,
    left: 0,
  });

  const delay = useRef(null);

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

  return (
    <HudContext.Provider
      value={{ element, onChange, stackCoolFormat: coolStack }}
    >
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
