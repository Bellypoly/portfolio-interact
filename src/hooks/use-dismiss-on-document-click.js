import { useEffect, useRef } from "react";

/**
 * When `isActive`, invokes `onDismiss` on the next document click that falls
 * outside `rootRef`. Callback is always fresh (ref) so callers can close panels
 * without stale closures.
 */
export function useDismissOnDocumentClick(isActive, rootRef, onDismiss) {
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;
  useEffect(() => {
    if (!isActive) return undefined;
    const handler = (e) => {
      if (rootRef.current?.contains(e.target)) return;
      onDismissRef.current();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [isActive, rootRef]);
}
