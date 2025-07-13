import { useCallback, useEffect } from "react";

/**
 * A hook that shows a browser confirmation dialog when the user tries to navigate away
 * or close the page.
 *
 * @param {boolean} enabled - Flag to enable/disable the beforeunload listener
 * @param {string} message - The message to show in the confirmation dialog
 * @returns {void}
 */
export const useBeforeUnload = (
  enabled: boolean = true,
  message: string = "Are you sure you want to leave? Your changes may not be saved."
): void => {
  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (!enabled) {
        return;
      }

      event.preventDefault();
      return message;
    },
    [message, enabled]
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabled, handleBeforeUnload]);
};

export default useBeforeUnload;
