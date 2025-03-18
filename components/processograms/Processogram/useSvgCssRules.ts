import { useCallback, useRef } from "react";
import { INVERSE_DICT, MAX_LEVEL } from "./consts";
import { getLevelById } from "./utils";

export const useSvgCssRules = () => {
  const styleSheet = useRef<CSSStyleSheet | null>(null);
  const ruleCache = useRef<Set<string>>(new Set());

  const generateAllCssHoverRules = useCallback(
    (allElements: Element[], svgId: string) => {
      const rules = [];
      const firstLevel = INVERSE_DICT[1];
      const rootRule = `.${svgId}:has([id*="${firstLevel}"]:hover) > *:not([id*="${firstLevel}"]:hover) {
      filter: brightness(0.5);
    }`;

      rules.push(rootRule);

      for (const element of allElements) {
        const elementId = element.id;
        const level = getLevelById(elementId);
        if (level === MAX_LEVEL) continue;
        const nextLevel = level + 1;
        const levelIndicator = INVERSE_DICT[nextLevel];
        const rule = `.${elementId} #${elementId}:has([id*="${levelIndicator}"]:hover) > *:not([id*="${levelIndicator}"]:hover) {
        filter: brightness(0.5);
      }`;
        rules.push(rule);
      }

      return rules;
    },
    []
  );

  const generateAllCssHighlightRules = useCallback(
    (allElements: Element[], svgId: string) => {
      const rules = [];

      for (const element of allElements) {
        const elementId = element.id;
        const level = getLevelById(elementId);

        const allDescendants: string[] = [];

        for (let i = level; i > 0; i--) {
          allDescendants.push(INVERSE_DICT[i]);
        }

        for (const descendant of allDescendants) {
          const rule = `.${elementId} [id*="${descendant}"]:not(#${elementId}){
            filter: brightness(0.5);
          }`;

          rules.push(rule);
        }
      }

      return rules;
    },
    []
  );

  const generateCssRules = useCallback(
    (svg: SVGElement) => {
      const allElements = Array.from(svg.querySelectorAll('[id*="--"]'));

      const hoverRules = generateAllCssHoverRules(allElements, svg.id);
      const highlightRules = []; //generateAllCssHighlightRules(allElements, svg.id);
      const rules = [...hoverRules, ...highlightRules];

      for (const rule of rules) {
        if (ruleCache.current.has(rule)) continue;

        try {
          styleSheet.current?.insertRule(rule, 0);
          ruleCache.current.add(rule);
        } catch (e) {
          console.error("Failed to insert CSS rule:", e);
        }
      }
    },
    [generateAllCssHoverRules]
  );

  const initializeStyleSheet = useCallback((svg: SVGElement) => {
    const style = document.createElement("style");
    document.head.appendChild(style);
    if (style.sheet) {
      styleSheet.current = style.sheet;
      generateCssRules(svg);
    }
  }, []);

  const cleanupStyleSheet = useCallback(() => {
    if (document.head.contains(styleSheet.current?.ownerNode)) {
      document.head.removeChild(styleSheet.current?.ownerNode);
    }
  }, []);

  return {
    initializeStyleSheet,
    cleanupStyleSheet,
  };
};
