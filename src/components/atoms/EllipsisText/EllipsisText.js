import React, { useMemo } from "react";
import { Tooltip, Typography } from "@mui/material";

const EllipsisText = ({
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
  const isTextLong = useMemo(() => text.length > limit, [text, limit]);

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
          ...sx,
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};

export default EllipsisText;
