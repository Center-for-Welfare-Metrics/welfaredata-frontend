import React, { useMemo } from "react";
import { TweenLite, gsap } from "gsap";
gsap.registerPlugin(TweenLite);

import { MouseEvent as MS, useEffect, useRef, useState } from "react";
import SVG, { Props as SVGProps } from "react-inlinesvg";
import update from "immutability-helper";

import { ProductionSystemTypes, SpeciesTypes } from "@/utils/enum_types";
import ProcessogramContext, {
  ImainState,
  ImainStateChange,
} from "@/context/processogram";
import {
  getElementSizeInformations,
  getRightTargetID,
  translateStackToCoolFormat,
} from "@/utils/processogram";
import { SvgContainer } from "./processogram-styled";
import ProcessogramHud from "./hud/hud";
import { getElementViewBox } from "./processogram-helpers";
import { useRouter } from "next/router";
import { useContext } from "react";
import HudTreeControl from "./hud/hud-tree-control";

interface IProcessogram {
  productionSystem: ProductionSystemTypes;
  specie: SpeciesTypes;
  hoverChange(hover): void;
  onSelect(id: string): void;
  productionSystemSelected: string;
  listContainerRef: any;
  setGhost(ghost): void;
  ghost: any;
}

const ProcessogramSVG = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG innerRef={ref} {...props} />
));

const LEVELS = ["--ps", "--lf", "--ph", "--ci"];

const Processogram = ({
  productionSystem,
  specie,
  hoverChange,
  onSelect,
  productionSystemSelected,
  listContainerRef,
  setGhost,
  ghost,
}: IProcessogram) => {
  const { stack, setStack, isLocked } = useContext(ProcessogramContext);

  const [isMoving, setIsMoving] = useState(false);

  const [mainState, setMainState] = useState<ImainState>(null);

  const svgRef = useRef<SVGElement>(null);

  const ref = useRef<HTMLDivElement>(null);

  const [onHover, setOnHover] = useState<string>(null);

  const [topLeft, setTopLeft] = useState<any>({
    top: 0,
    left: 0,
    scrollTop: 0,
  });

  const [style, setStyle] = useState({
    top: 0,
    left: 0,
  });

  const timeout = useRef(null);

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
    updateStyleOnResize();
    fixInitialViewBox();
  }, []);

  let intervalout = useRef(null);

  const fixInitialViewBox = () => {
    intervalout.current = setInterval(() => {
      if (svgRef.current) {
        clearInterval(intervalout.current);
        pluginInitial(true);
      }
    }, 500);
  };

  const pluginInitial = async (first = false) => {
    return new Promise(async (resolve, reject) => {
      if (svgRef.current.id === "multi_tier--ps") {
        let topFigure = svgRef.current.querySelector("#x33_RD_x5F_TIER--ci-01");
        let middleFigure = svgRef.current.querySelector(
          "#x32_ND_x5F_TIER--ci-02"
        );
        await TweenLite.to(topFigure, {
          translateY: "250%",
          opacity: 0,
          display: "none",
        });
        await TweenLite.to(middleFigure, {
          translateY: "150%",
          opacity: 0,
          display: "none",
        });
        resolve(true);
        if (first) {
          setTimeout(() => {
            let viewBox = getElementViewBox(svgRef.current, false);
            TweenLite.to(svgRef.current, {
              attr: {
                viewBox: viewBox,
              },
            });
          }, 600);
        }
      }
    });
  };

  useEffect(() => {
    if (mainState) {
      setGhost(null);
      updateStack();
      applyDocumentTriggers();
      if (mainState.viewBox) {
        moveFigure();
      }
    }
  }, [mainState]);

  const pluginUpdate = async (next_id) => {
    return new Promise(async (resolve, reject) => {
      if (svgRef.current.id === "multi_tier--ps") {
        let topFigure = svgRef.current.querySelector(
          "#x33_RD_x5F_TIER--ci-01"
        ) as any;
        let middleFigure = svgRef.current.querySelector(
          "#x32_ND_x5F_TIER--ci-02"
        ) as any;
        if (next_id === "laying--ph") {
          if (topFigure.style.display === "none") {
            try {
              await TweenLite.to(topFigure, {
                display: "block",
                translateY: "0",
                opacity: 1,
              });
              await TweenLite.to(middleFigure, {
                display: "block",
                translateY: "0",
                opacity: 1,
              });
              resolve(true);
            } catch (error) {
              resolve(true);
            }
          } else {
            resolve(true);
          }
        } else {
          if (next_id && !next_id.includes("--ci")) {
            if (topFigure.style.display === "block") {
              pluginInitial().then(() => {
                resolve(true);
              });
            } else {
              resolve(true);
            }
          } else {
            resolve(true);
          }
        }
      } else {
        resolve(true);
      }
    });
  };

  useEffect(() => {
    if (productionSystemSelected) {
      if (mainState) {
        focusOnMe();
      } else {
        fadeOutMe();
      }
    } else {
      if (svgRef.current) {
        originalPosition();
      }
    }
  }, [productionSystemSelected]);

  const router = useRouter();

  useEffect(() => {
    if (mainState) {
      if (router.query.s) {
        let share = router.query.s as string;
        getFromShareLink(share);
        router.query.s = null;
        window.history.replaceState(null, "", "/pigs");
      }
      if (svgRef.current) {
        userInteractionLevelChangeEffects();
      }
    }
  }, [mainState]);

  useEffect(() => {
    let isMobile = window.matchMedia("(hover:none)").matches;
    if (!isMobile) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setGhost(onHover);
      }, 250);
    }
    try {
      if (mainState && svgRef.current) {
        userInteractionHoverEffects();
      }
    } catch (error) {
      console.log(`user interaction => ${error}`);
    }
  }, [onHover]);

  const userInteractionHoverEffects = async () => {
    let query = mainState.currentDomID
      ? `[id='${mainState.currentDomID}'] [id*='${
          LEVELS[mainState.level + 1]
        }']`
      : `[id*='${LEVELS[mainState.level + 1]}']`;
    let targets = svgRef.current.querySelectorAll(query);
    if (onHover) {
      if (targets.length > 0) {
        TweenLite.to(targets, {
          filter: "brightness(0.5)",
        });
      }
      let target = svgRef.current.querySelector(`#${onHover}`);
      if (target) {
        TweenLite.to(target, {
          filter: "brightness(1.1)",
        });
      }
    } else {
      if (targets.length > 0) {
        TweenLite.to(targets, {
          filter: "brightness(1)",
        });
      }
    }
  };

  const userInteractionLevelChangeEffects = async () => {
    reset();
    let query = `[id*='${LEVELS[mainState.level]}']`;
    let targets = svgRef.current.querySelectorAll(query);
    if (!onHover) {
      if (targets.length > 0) {
        TweenLite.to(targets, {
          filter: "brightness(1)",
        });
      }
    }
    if (mainState.currentDomID) {
      if (targets.length > 0) {
        TweenLite.to(targets, {
          filter: "brightness(0.5)",
        });
      }
      let target = svgRef.current.querySelector(`#${mainState.currentDomID}`);
      if (target) {
        TweenLite.to(target, {
          filter: "brightness(1.1)",
        });
      }
    } else {
      if (targets.length > 0) {
        TweenLite.to(targets, {
          filter: "brightness(1)",
        });
      }
    }
  };

  const reset = async () => {
    if (svgRef.current) {
      let all = svgRef.current.querySelectorAll(`[id*='--']`);
      TweenLite.to(all, {
        filter: "brightness(1)",
      });
    }
  };

  const getFromShareLink = (share: string) => {
    console.log(share);
  };

  const originalPosition = () => {
    let isHidden = svgRef.current.style.display === "none";
    if (isHidden) {
      TweenLite.to(svgRef.current, {
        display: "block",
      })
        .delay(0.5)
        .then(() => {
          TweenLite.to(svgRef.current, {
            opacity: 1,
            clearProps: "opacity",
          }).duration(0.5);
        });
    } else {
      TweenLite.to(svgRef.current, {
        top: topLeft.top,
        left: topLeft.left,
        translateY: "0",
        translateX: "0",
        ease: "power1.inOut",
      })
        .duration(0.7)
        .then(() => {
          TweenLite.to(svgRef.current, {
            position: "static",
            clearProps: "opacity,margin",
          })
            .duration(0.01)
            .then(() => {
              listContainerRef.scrollTo(0, topLeft.scrollTop);
            });
        });
    }
  };

  const fadeOutMe = () => {
    TweenLite.to(svgRef.current, { opacity: 0 })
      .duration(0.5)
      .then(() => {
        TweenLite.to(svgRef.current, { display: "none" }).duration(0);
      });
  };

  const focusOnMe = () => {
    let { top, left } = getElementSizeInformations(svgRef.current);
    top -= style.top;
    left -= style.left;
    let scrollTop = listContainerRef.scrollTop;
    setTopLeft({ top, left, scrollTop });
    TweenLite.to(svgRef.current, {
      position: "absolute",
      top,
      left,
      margin: "0",
    })
      .delay(0.5)
      .duration(0)
      .then(() => {
        TweenLite.to(svgRef.current, {
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          ease: "power1.inOut",
        }).duration(0.7);
      });
  };

  const onResize = () => {
    if (mainState.currentDomID) {
      let element = getCurrentDomElement();
      let newViewBox = getElementViewBox(element);
      setMainState({
        ...mainState,
        viewBox: newViewBox,
      });
    }
  };

  const applyDocumentTriggers = () => {
    document.onclick = clickOut;
    window.onresize = onResize;
  };

  const removeDocumentTriggers = () => {
    document.onclick = null;
    document.onresize = null;
    window.onresize = null;
  };

  const getCurrentDomElement = () =>
    mainState.currentDomID
      ? svgRef.current.querySelector(`#${mainState.currentDomID}`)
      : svgRef.current;

  const updateStack = () => {
    let updated_stack_lenght = mainState.level + 1;
    let old_stack_lenght = stack.length;

    if (updated_stack_lenght > old_stack_lenght) {
      setStack(
        update(stack, {
          $push: [mainState.currentDomID || svgRef.current.id],
        })
      );
    } else if (updated_stack_lenght < old_stack_lenght) {
      setStack(
        update(stack, {
          $splice: [
            [old_stack_lenght - (old_stack_lenght - updated_stack_lenght)],
          ],
        })
      );
    } else if (old_stack_lenght === updated_stack_lenght) {
      setStack(
        update(stack, {
          [updated_stack_lenght - 1]: {
            $set: mainState.currentDomID,
          },
        })
      );
    }
  };

  const getParent = () => {
    if (mainState.currentDomID) {
      let node = svgRef.current.querySelector(`#${mainState.currentDomID}`);
      let levelBefore = LEVELS[mainState.level - 1];
      while (node !== svgRef.current) {
        node = node.parentElement;
        if (node.id.includes(levelBefore)) {
          break;
        }
      }
      return node;
    } else {
      return null;
    }
  };

  const clickOut = () => {
    if (!isLocked) {
      let parent = getParent() as any;
      if (mainState.level > 0) {
        if (parent) {
          let isInner = false;
          let inner_current = null;
          if (!parent.id.includes("--ps")) {
            inner_current = parent.id;
            isInner = true;
          }
          pluginUpdate(inner_current).then(() => {
            let viewBox = getElementViewBox(parent, isInner);
            setMainState({
              ...mainState,
              level: mainState.level - 1,
              viewBox,
              currentDomID: inner_current,
            });
          });
        }
      } else if (mainState.level === 0) {
        removeDocumentTriggers();
        setMainState(null);
        onSelect(null);
        hoverChange(null);
      }
    }
  };

  const targetIsInside = (elementClicked: EventTarget) => {
    let currentElement = mainState.currentDomID
      ? svgRef.current.querySelector(`#${mainState.currentDomID}`)
      : svgRef.current;

    return currentElement.contains(elementClicked as Node);
  };

  const moveFigure = () => {
    setIsMoving(true);
    TweenLite.to(svgRef.current, {
      attr: {
        viewBox: mainState.viewBox,
      },
      ease: "power1.inOut",
    })
      .duration(0.7)
      .then(() => setIsMoving(false));
  };

  const mouseLeave = (event: MS<SVGElement, MouseEvent>) => {
    if (!isLocked) {
      if (mainState === null) {
        hoverChange(null);
      } else {
        setOnHover(null);
      }
    }
  };

  const mouseMove = (event: MS<SVGElement, MouseEvent>) => {
    if (!isLocked) {
      if (mainState === null) {
        hoverChange(svgRef.current.id);
      } else {
        if (targetIsInside(event.target)) {
          let right_target_id = getRightTargetID({
            element: event.target,
            level: LEVELS[mainState.level + 1],
            current: svgRef.current.id,
          });
          if (onHover !== right_target_id) {
            setOnHover(right_target_id);
          }
        } else {
          if (onHover !== null) {
            setOnHover(null);
          }
        }
      }
    }
  };

  const ProcessogramClick = (event: MS<SVGElement, MouseEvent>) => {
    if (!isLocked) {
      if (mainState === null && svgRef.current) {
        let id = svgRef.current.id;
        onSelect(id);
        setMainState({
          currentDomID: null,
          viewBox: null,
          level: 0,
        });
      } else {
        if (targetIsInside(event.target)) {
          event.stopPropagation();
          InnerClick();
        }
      }
    }
  };

  const InnerClick = () => {
    let element = svgRef.current.querySelector(`#${onHover}`);
    if (element) {
      toNextLevel(element);
    }
  };

  const toNextLevel = (element: any) => {
    setIsMoving(true);
    pluginUpdate(element.id).then(() => {
      let viewBox = getElementViewBox(element, true);
      setMainState({
        ...mainState,
        level: mainState.level + 1,
        viewBox,
        currentDomID: element.id,
      });
    });
  };

  const handleHudChange = (change: ImainStateChange) => {
    if (change) {
      let element;
      if (change.currentDomID === null) {
        element = svgRef.current;
      } else {
        element = svgRef.current.querySelector(`#${change.currentDomID}`);
      }
      pluginUpdate(change.currentDomID).then(() => {
        let viewBox = getElementViewBox(element, true);
        setMainState({ ...mainState, ...change, viewBox });
      });
    } else {
      removeDocumentTriggers();
      setMainState(null);
      onSelect(null);
      hoverChange(null);
    }
  };

  const coolFormatStack = useMemo(() => {
    return translateStackToCoolFormat([...stack, ghost]);
  }, [stack, ghost]);

  return (
    <>
      <SvgContainer
        level={mainState?.level}
        current={mainState?.currentDomID || svgRef.current?.id}
        childrens={LEVELS[mainState?.level + 1] || null}
        hover={onHover}
        ref={ref}
      >
        <ProcessogramSVG
          ref={svgRef}
          onClick={ProcessogramClick}
          onMouseLeave={mouseLeave}
          onMouseMove={mouseMove}
          src={`/assets/svg/zoo/${specie}/${productionSystem}.svg`}
        />
        {mainState && (
          <ProcessogramHud
            element={getCurrentDomElement()}
            level={mainState.level}
            stack={stack}
            isMoving={isMoving}
            onHover={onHover}
            onChange={handleHudChange}
          />
        )}
        {mainState && (
          <HudTreeControl
            stackCoolFormat={coolFormatStack}
            onChange={handleHudChange}
          />
        )}
      </SvgContainer>
    </>
  );
};

export default React.memo(Processogram);
