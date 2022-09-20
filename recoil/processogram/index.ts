import { IInterativeMenuState } from "@/components/processograms/hud/interative-menu/interative-menu";
import { ICoolFormat, IMedia } from "@/utils/processogram";
import { memoize } from "lodash";
import { atom } from "recoil";

export const recoilGlobalDescription = memoize((id) =>
  atom<string>({
    key: `recoilGlobalDescription${id}`,
    default: null,
  })
);

export const recoilLocalDescription = memoize((id) =>
  atom<string>({
    key: `recoilLocalDescription${id}`,
    default: null,
  })
);

export const recoilGlobalMedias = memoize((id) =>
  atom<IMedia[]>({
    key: `recoilGlobalMedias${id}`,
    default: null,
  })
);

export const recoilLocalMedias = memoize((id) =>
  atom<IMedia[]>({
    key: `recoilLocalMedias${id}`,
    default: null,
  })
);

export const recoilCoolStack = atom<ICoolFormat[]>({
  key: "recoilCoolStack",
  default: [],
});

export const recoilMenuState = atom<IInterativeMenuState>({
  key: "recoilMenuState",
  default: "full",
});

export const recoilIsOnSpecieLevel = atom<boolean>({
  key: "recoilIsOnSpecieLevel",
  default: true,
});
