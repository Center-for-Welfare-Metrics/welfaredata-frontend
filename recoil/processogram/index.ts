import { IMedia } from "@/utils/processogram";
import { memoize } from "lodash";
import { atom } from "recoil";

export const recoilGlobalDescription = memoize((id) =>
  atom<string>({
    key: `recoilGlobalDescription${id}`,
    default: "",
  })
);

export const recoilLocalDescription = memoize((id) =>
  atom<string>({
    key: `recoilLocalDescription${id}`,
    default: "",
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
