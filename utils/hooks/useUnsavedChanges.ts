import { useEffect } from "react";
import { useRouter } from "next/router";
import useBeforeUnload from "./useBeforeUnload";

interface UseUnsavedChangesProps {
  enabled: boolean;
  message?: string;
}

/**
 * Hook that prompts the user with a dialog when they try to navigate away
 * from the page with unsaved changes.
 *
 * @param enabled - Whether the unsaved changes check is active
 * @param message - Custom message to show in the dialog
 */
export function useUnsavedChanges({
  enabled,
  message = "You have unsaved changes. Are you sure you want to leave this page?",
}: UseUnsavedChangesProps) {
  const router = useRouter();

  useBeforeUnload(enabled, message);

  useEffect(() => {
    // Handler for route changes started by Next.js
    const handleRouteChangeStart = (url: string) => {
      if (!enabled) return true;

      const allowTransition = window.confirm(message);

      if (!allowTransition) {
        // Abort route change
        router.events.emit("routeChangeError");
        // Keep the URL in the browser the same
        window.history.pushState(null, "", router.asPath);
        // Throwing an error will stop the route change
        throw new Error("Route change aborted");
      }
    };

    // Subscribe to events
    router.events.on("routeChangeStart", handleRouteChangeStart);

    // Cleanup
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [enabled, message, router]);

  /**
   * Triggers a confirmation dialog and executes the provided function if confirmed
   * @param callbackFn - Function to execute when the user confirms
   * @returns void
   */
  const triggerDialog = (callbackFn: () => void) => {
    if (window.confirm(message)) {
      callbackFn();
    }
  };

  return { triggerDialog };
}
