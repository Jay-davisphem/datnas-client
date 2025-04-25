"use client";

import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  width?: string;
  position?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  offset?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  width,
  position = "bottom",
  offset = "0",
}) => {
  let positionClasses = "";
  let transformClasses = "";
  let offsetStyle: React.CSSProperties = {};

  switch (position) {
    case "top":
      positionClasses = "bottom-full mb-2 left-1/2 -translate-x-1/2";
      break;
    case "bottom":
      positionClasses = "top-full mt-2 left-1/2 -translate-x-1/2";
      break;
    case "left":
      positionClasses = "right-full mr-2 top-1/2 -translate-y-1/2";
      break;
    case "right":
      positionClasses = "left-full ml-2 top-1/2 -translate-y-1/2";
      break;
    case "top-left":
      positionClasses = "bottom-full mb-2 right-0";
      transformClasses = "";
      break;
    case "top-right":
      positionClasses = "bottom-full mb-2 left-0";
      transformClasses = "";
      break;
    case "bottom-left":
      positionClasses = "top-full mt-2 right-0";
      transformClasses = "";
      break;
    case "bottom-right":
      positionClasses = "top-full mt-2 left-0";
      transformClasses = "";
      break;
    default:
      positionClasses = "bottom-full mb-2 left-1/2 -translate-x-1/2"; // Default to top
  }

  // Apply offset - simplified for top/bottom and left/right
  if (position === "top" || position === "bottom") {
    offsetStyle = { left: `calc(50% + ${offset})` };
  } else if (position === "left" || position === "right") {
    offsetStyle = { top: `calc(50% + ${offset})` };
  }

  return (
    <div className={`relative group inline-block ${width}`}>
      {children}
      <div
        className={`bg-[#000000BB] max-w-full absolute ${positionClasses} ${transformClasses} text-white text-sm rounded py-1 px-2 whitespace-wrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50`}
        style={offsetStyle}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
