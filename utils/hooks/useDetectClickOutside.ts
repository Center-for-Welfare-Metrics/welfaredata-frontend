import { useEffect } from "react";
import useDebounce from "./useDebounce";

type Props = {
  element: HTMLElement | null | undefined;
  onClickOutSide: () => void;
  enabled?: boolean;
  strategy?: "rect" | "contains";
};

export const useDetectClickOutside = ({
  element,
  onClickOutSide,
  enabled = true,
  strategy = "rect",
}: Props) => {
  const debounceEnabled = useDebounce(enabled, 100);

  function handleClick(event: MouseEvent) {
    if (strategy === "rect") {
      const rect = element?.getBoundingClientRect();
      if (!rect) return;
      const x = event.clientX;
      const y = event.clientY;

      if (
        !(
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        )
      ) {
        onClickOutSide();
      }

      return;
    }

    if (strategy === "contains") {
      const body = document.body;

      if (!body) return;

      const target = event.target as Node;

      if (!body.contains(target)) return;

      if (element && !element.contains(target)) {
        onClickOutSide();
      }

      return;
    }
  }

  useEffect(() => {
    if (debounceEnabled) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceEnabled, element]);
};
