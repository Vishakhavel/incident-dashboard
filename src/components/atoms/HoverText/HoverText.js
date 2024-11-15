import React from "react";
import { Tooltip, Typography } from "@mui/material";

const HoverText = ({
  text,
  limit = 22,
  variant = "h5",
  color = "text.primary",
  component = "div",
  tooltipPlacement = "top",
  tooltipArrow = true,
  alwaysShowTooltip = false,
  sx = {},
}) => {
  // Determine if the text length exceeds the specified character limit
  const isTextLong = text.length > limit;

  return (
    <Tooltip
      title={alwaysShowTooltip || isTextLong ? text : ""}
      placement={tooltipPlacement}
      arrow={tooltipArrow}
    >
      <Typography
        variant={variant}
        component={component}
        color={color}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: `${limit}ch`,
          ...sx, // Allow additional styling from props
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};

export default HoverText;
