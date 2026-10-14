"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const noopSubscribe = () => () => {};

/**
 * Renders overlays at document.body so transformed/blurred ancestors
 * (sticky blurred header, 3D tilt wrappers, animated reveals) can't trap
 * `position: fixed` children inside themselves. SSR-safe via snapshots.
 */
export function ModalPortal({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!mounted) return null;
  return createPortal(children, document.body);
}
