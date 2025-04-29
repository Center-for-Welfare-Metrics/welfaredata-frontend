import { gsap } from "gsap";
import { LEVELS_DICT } from "../utils/extractInfoFromId";

export const MAX_LEVEL = Object.keys(LEVELS_DICT).length - 1;

export const ANIMATION_DURATION = 0.7; // seconds

export const ANIMATION_EASE: gsap.EaseString = "power1.inOut";
