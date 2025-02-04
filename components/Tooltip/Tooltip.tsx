"use client";

import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from "@mui/material";
import React from "react";

export interface TooltipProps extends Omit<MuiTooltipProps, "children" | "title"> {
  explainer: React.ReactNode;
  children: React.ReactElement;
  withArrow?: boolean;
}

export function Tooltip({ children, explainer, withArrow = true, placement = "top", ...props }: TooltipProps) {
  return (
    <MuiTooltip title={explainer} arrow={withArrow} placement={placement} {...props}>
      {children}
    </MuiTooltip>
  );
}
