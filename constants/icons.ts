import arrowLeft from "../assets/icons/arrow-left.png";
import arrowRight from "../assets/icons/arrow-right.png";
import arrows from "../assets/icons/arrows.png";
import bag from "../assets/icons/bag.png";
import candy from "../assets/icons/candy.png";
import chip from "../assets/icons/chip.png";
import choco from "../assets/icons/choco.png";
import filters from "../assets/icons/filters.png";
import menu from "../assets/icons/menu.png";
import minus from "../assets/icons/minus.png";
import plus from "../assets/icons/plus.png";

// Icons exports - use as ICONS.iconname
export const ICONS = {
  // Navigation icons
  arrowLeft,
  arrowRight,
  arrows,
  menu,

  // Shopping and commerce icons
  bag,
  filters,

  // Product icons
  candy,
  chip,
  choco,

  // Action icons
  plus,
  minus,
} as const;

// Type definition for better TypeScript support
export type IconKeys = keyof typeof ICONS;
