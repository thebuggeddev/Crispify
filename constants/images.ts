import androidIconBackground from "../assets/images/android-icon-background.png";
import androidIconForeground from "../assets/images/android-icon-foreground.png";
import androidIconMonochrome from "../assets/images/android-icon-monochrome.png";
import chip1 from "../assets/images/chip-1.png";
import chip2 from "../assets/images/chip-2.png";
import chip3 from "../assets/images/chip-3.png";
import chip4 from "../assets/images/chip-4.png";
import chip5 from "../assets/images/chip-5.png";
import chip6 from "../assets/images/chip-6.png";
import chip7 from "../assets/images/chip-7.png";
import chip8 from "../assets/images/chip-8.png";
import chip9 from "../assets/images/chip-9.png";
import favicon from "../assets/images/favicon.png";
import icon from "../assets/images/icon.png";
import partialReactLogo from "../assets/images/partial-react-logo.png";
import reactLogo from "../assets/images/react-logo.png";
// import reactLogo2x from "../assets/images/react-logo@2x.png";
// import reactLogo3x from "../assets/images/react-logo@3x.png";
import splashIcon from "../assets/images/splash-icon.png";

export const IMAGES = {
  // App icons and branding
  androidIconBackground,
  androidIconForeground,
  androidIconMonochrome,
  icon,
  favicon,
  splashIcon,

  // Chip product images
  chip1,
  chip2,
  chip3,
  chip4,
  chip5,
  chip6,
  chip7,
  chip8,
  chip9,

  // React logos (for development/demo purposes)
  reactLogo,
  // reactLogo2x,
  // reactLogo3x,
  partialReactLogo,
} as const;

// Type definition for better TypeScript support
export type ImageKeys = keyof typeof IMAGES;
