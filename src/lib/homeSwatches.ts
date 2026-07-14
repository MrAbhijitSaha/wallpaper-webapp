import { Swatch } from "./types";

export const swatches: Swatch[] = [
  {
    id: "aurora",
    kind: "phone",
    position: "left-[5%] top-[8%] h-48 w-32 -rotate-[10deg]",
    gradient:
      "bg-[linear-gradient(155deg,#4C1D95_0%,#6D28D9_45%,#38BDF8_100%)]",
    delay: "[animation-delay:0s]",
    duration: "[animation-duration:9s]",
  },
  {
    id: "sunset",
    kind: "phone",
    position: "right-[4%] top-[10%] h-40 w-28 rotate-[9deg]",
    gradient:
      "bg-[linear-gradient(155deg,#F97316_0%,#FB7185_55%,#FDE68A_100%)]",
    delay: "[animation-delay:1.4s]",
    duration: "[animation-duration:8s]",
  },
  {
    id: "bloom",
    kind: "phone",
    position: "left-[8%] bottom-[10%] h-36 w-24 rotate-[12deg]",
    gradient: "bg-[linear-gradient(155deg,#BE185D_0%,#7C3AED_100%)]",
    delay: "[animation-delay:0.6s]",
    duration: "[animation-duration:10s]",
    faded: true,
  },
  {
    id: "forest",
    kind: "desktop",
    position: "right-[6%] bottom-[8%] h-36 w-56 rotate-[4deg]",
    gradient:
      "bg-[linear-gradient(120deg,#064E3B_0%,#10B981_60%,#A7F3D0_100%)]",
    delay: "[animation-delay:2s]",
    duration: "[animation-duration:9.5s]",
  },
  {
    id: "glacier",
    kind: "desktop",
    position: "right-[1%] top-[38%] h-28 w-44 -rotate-[5deg]",
    gradient:
      "bg-[linear-gradient(120deg,#0C4A6E_0%,#0EA5E9_55%,#E0F2FE_100%)]",
    delay: "[animation-delay:0.9s]",
    duration: "[animation-duration:11s]",
    faded: true,
  },
  {
    id: "ember",
    kind: "phone",
    position: "left-[1%] bottom-[34%] h-36 w-24 -rotate-[6deg]",
    gradient:
      "bg-[linear-gradient(155deg,#7F1D1D_0%,#DC2626_50%,#F97316_100%)]",
    delay: "[animation-delay:1.8s]",
    duration: "[animation-duration:8.5s]",
    faded: true,
  },
];
