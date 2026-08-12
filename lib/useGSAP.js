// Local implementation of useGSAP (replaces @gsap/react).
// Based on @gsap/react 2.1.2 — avoids module resolution issues with Turbopack.

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const useIsomorphicLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;

const isConfig = (value) =>
  value && !Array.isArray(value) && typeof value === "object";

const emptyArray = [];
const defaultConfig = {};
let _gsap = gsap;

export const useGSAP = (callback, dependencies = emptyArray) => {
  let config = defaultConfig;
  if (isConfig(callback)) {
    config = callback;
    callback = null;
    dependencies =
      "dependencies" in config ? config.dependencies : emptyArray;
  } else if (isConfig(dependencies)) {
    config = dependencies;
    dependencies =
      "dependencies" in config ? config.dependencies : emptyArray;
  }

  if (callback && typeof callback !== "function") {
    console.warn("First parameter must be a function or config object");
  }

  const { scope, revertOnUpdate } = config;
  const mounted = useRef(false);
  const context = useRef(_gsap.context(() => {}, scope));
  const contextSafe = useRef((func) => context.current.add(null, func));
  const deferCleanup = dependencies && dependencies.length && !revertOnUpdate;

  deferCleanup &&
    useIsomorphicLayoutEffect(() => {
      mounted.current = true;
      return () => context.current.revert();
    }, emptyArray);

  useIsomorphicLayoutEffect(() => {
    callback && context.current.add(callback, scope);
    if (!deferCleanup || !mounted.current) {
      return () => context.current.revert();
    }
  }, dependencies);

  return { context: context.current, contextSafe: contextSafe.current };
};

useGSAP.register = (core) => {
  _gsap = core;
};
useGSAP.headless = true;
