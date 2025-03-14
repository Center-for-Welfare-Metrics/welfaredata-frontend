import { useRef } from "react";
import { INVERSE_DICT } from "./consts";

export const useSvgCssRules = () => {
  const styleSheet = useRef<CSSStyleSheet | null>(null);
  const ruleCache = useRef<Set<string>>(new Set());

  const initializeStyleSheet = () => {
    // Create stylesheet for highlighting elements
    const style = document.createElement("style");
    document.head.appendChild(style);

    // Store reference to the stylesheet
    if (style.sheet) {
      styleSheet.current = style.sheet;
      return style;
    }
    return null;
  };

  const deleteRule = () => {
    if (!styleSheet.current) return;

    if (!styleSheet.current.cssRules.length) return;

    ruleCache.current.clear();

    while (styleSheet.current.cssRules.length) {
      styleSheet.current.deleteRule(0);
    }
  };

  const insertHighlightRule = (
    focusedElementId: string,
    focusedLevel: number
  ) => {
    if (!focusedElementId || !styleSheet.current) return;

    const levelId = INVERSE_DICT[focusedLevel];

    const focusedRule = `[id*="${levelId}"]:not([id="${focusedElementId}"]){
        filter: brightness(0.5);
      }`;

    if (ruleCache.current.has(focusedRule)) return;

    try {
      styleSheet.current.insertRule(focusedRule, 0);
      ruleCache.current.add(focusedRule);
    } catch (e) {
      console.error("Failed to insert CSS rule:", e);
    }
  };

  const insertHoverRule = (
    svgElement: SVGElement | null,
    focusedElementId: string | null,
    level: number
  ) => {
    if (!svgElement || !styleSheet.current) return;

    const svgId = svgElement.id;

    if (!svgId) return;

    const levelString = INVERSE_DICT[level];

    const hoverRule = focusedElementId
      ? `#${focusedElementId}:has([id*="${levelString}"]:hover) > *:not([id*="${levelString}"]:hover) {
      filter: brightness(0.5);
    }`
      : `#${svgId}:has([id*="${levelString}"]:hover) > *:not([id*="${levelString}"]:hover) {
      filter: brightness(0.5);
    }`;

    if (ruleCache.current.has(hoverRule)) return;

    try {
      styleSheet.current.insertRule(hoverRule, 0);
      ruleCache.current.add(hoverRule);
    } catch (e) {
      console.error("Failed to insert CSS rule:", e);
    }
  };

  const cleanupStyleSheet = (style: HTMLStyleElement) => {
    deleteRule();
    if (document.head.contains(style)) {
      document.head.removeChild(style);
    }
  };

  return {
    initializeStyleSheet,
    deleteRule,
    insertHighlightRule,
    insertHoverRule,
    cleanupStyleSheet,
  };
};
