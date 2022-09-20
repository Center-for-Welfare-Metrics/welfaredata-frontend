import { useRef, useState } from "react";
import { TweenLite, gsap } from "gsap";
gsap.registerPlugin(TweenLite);
import Processogram from "@/components/processograms/processogram";
import { SPECIES } from "@/utils/consts";
import {
  Container,
  SubContainer,
  OverlapingMaster,
} from "./processogram-list-styled";
import ProcessogramContext, {
  IMediaViewer,
  IProcessogramContext,
  ISpecie,
} from "@/context/processogram";
import FullScreenMediasViewer from "./hud/interative-menu/menu-tabs/full-screen-medias-viewer";
import InterativeMenu from "./hud/interative-menu/interative-menu";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ICoolFormat } from "@/utils/processogram";
import HudTreeControl from "./hud/hud-tree-control";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  recoilCoolStack,
  recoilIsOnSpecieLevel,
  recoilMenuState,
} from "recoil/processogram";
import {
  CreditsContainer,
  Subtitle,
  Title,
  TitleContainer,
} from "./processogram-styled";
import { Box } from "@material-ui/core";

export interface IProcessogramList {
  specie: ISpecie;
  collection: any[];
  onChange?(state: ICoolFormat[]): void;
  isLocked?: boolean;
}

const ProcessogramList = ({
  specie,
  collection,
  onChange,
  isLocked,
}: IProcessogramList) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const coolFormat = useRecoilValue(recoilCoolStack);

  const [onHover, setOnHover] = useState<string>(null);

  const [ghost, setGhost] = useState(null);

  const [productionSystemSelected, setProductionSystemSelected] =
    useState(null);

  const [mediasViewer, setMediasViewer] = useState<IMediaViewer>({
    medias: [],
    index: 0,
  });

  const [NAOPODEUSAR, PROIBIDO] = useState(false);

  const isOnSpecieLevel = useRecoilValue(recoilIsOnSpecieLevel);

  const [stack, setStack] = useState<string[]>([]);

  const menuStateValue = useRecoilValue(recoilMenuState);

  const contextValue: IProcessogramContext = {
    collection,
    mediasViewer,
    setMediasViewer,
    stack,
    setStack,
    specie,
    isLocked,
  };

  const [shareString, setShareString] = useState("");

  const [totalLoaded, setTotalLoaded] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (onChange) {
      onChange(coolFormat);
    }
  }, [coolFormat]);

  useEffect(() => {
    let location = window.location.href;
    if (!productionSystemSelected) {
      setStack([]);
      setShareString(location);
    } else {
      let x = location + `?s=${productionSystemSelected}`;
      setShareString(x);
    }
  }, [productionSystemSelected]);

  const timeout = useRef(null);

  useEffect(() => {
    let isMobile = window.matchMedia("(hover:none)").matches;
    if (!isMobile) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        if (productionSystemSelected === null) {
          setGhost(onHover);
        } else {
          setGhost(null);
        }
      }, 50);
      userInteractionEffect();
    }
  }, [onHover, productionSystemSelected]);

  const userInteractionEffect = async () => {
    if (productionSystemSelected === null) {
      if (onHover) {
        let svgs = document.querySelectorAll(
          `svg[id*='--ps']:not(#${onHover})`
        );
        TweenLite.to(svgs, {
          filter: "brightness(0.5)",
        });
      } else {
        let svgs = document.querySelectorAll(
          `svg[id*='--ps']:not(#${onHover})`
        );
        TweenLite.to(svgs, {
          filter: "brightness(1)",
        });
      }
    }
  };

  const loadSharedLink = (s: string) => {
    setTimeout(() => {
      try {
        let svg = document.querySelector(`#${s}`);
        if (svg) {
          let evObj = document.createEvent("Events");
          evObj.initEvent("click", true, false);
          svg.dispatchEvent(evObj);
          PROIBIDO(false);
        }
      } catch (error) {
        console.log("para de tentar besteira aí");
      }
    }, 500);
  };

  useEffect(() => {
    if (!router.query.s) {
      PROIBIDO(false);
    } else {
      PROIBIDO(true);
      loadSharedLink(router.query.s as string);
    }
  }, [router.query.s]);

  return (
    <ProcessogramContext.Provider value={contextValue}>
      {/* {NAOPODEUSAR && (
        <OverlapingMaster onContextMenu={(e) => e.stopPropagation()} />
      )} */}
      <Container ref={containerRef}>
        <TitleContainer $visible={isOnSpecieLevel}>
          <Title>
            The life of sows and market pigs in four production systems
          </Title>
          <Subtitle>
            (click on the components to zoom in/out the different levels)
          </Subtitle>
        </TitleContainer>
        <SubContainer $menuOpen={menuStateValue === "full"}>
          {SPECIES[specie?._id]?.map((productionSystem) => (
            <Processogram
              key={productionSystem}
              specie={specie?._id}
              productionSystem={productionSystem}
              hoverChange={setOnHover}
              onSelect={setProductionSystemSelected}
              productionSystemSelected={productionSystemSelected}
              listContainerRef={containerRef.current}
              setGhost={setGhost}
              ghost={ghost}
            />
          ))}
        </SubContainer>
        <CreditsContainer
          $visible={isOnSpecieLevel && menuStateValue === "minimized"}
        >
          <Box>
            <ul>
              <li>Wladimir J.Alonso</li>
              <li>Cynthia Schick-Paim</li>
              <li>Herikle Mesquita</li>
            </ul>
            <p>
              Click{" "}
              <a
                href="https://welfarefootprint.org/research-projects/processograms/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{" "}
              for more information
            </p>
          </Box>
        </CreditsContainer>
        <InterativeMenu
          shareString={shareString}
          stackCoolFormat={coolFormat}
          specie={specie}
        />
        {productionSystemSelected === null && (
          <HudTreeControl stackCoolFormat={coolFormat} onChange={() => {}} />
        )}
      </Container>
      {mediasViewer.medias.length > 0 && <FullScreenMediasViewer />}
    </ProcessogramContext.Provider>
  );
};

export default ProcessogramList;
