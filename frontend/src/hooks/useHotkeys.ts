import { useEffect } from "react";

interface UseHotkeysProps {
  onApprove?: () => void;
  onReject?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onFocusSearch?: () => void;
  enabled?: boolean;
}

export const useHotkeys = ({
  onApprove,
  onReject,
  onNext,
  onPrev,
  onFocusSearch,
  enabled = true,
}: UseHotkeysProps) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "a":
          event.preventDefault();
          onApprove?.();
          break;

        case "d":
          event.preventDefault();
          onReject?.();
          break;

        case "arrowright":
          event.preventDefault();
          onNext?.();
          break;

        case "arrowleft":
          event.preventDefault();
          onPrev?.();
          break;

        case "/":
          event.preventDefault();
          onFocusSearch?.();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onApprove, onReject, onNext, onPrev, onFocusSearch, enabled]);
};
