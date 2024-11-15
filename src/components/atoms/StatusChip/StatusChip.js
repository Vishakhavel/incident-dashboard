import React from "react";
import Chip from "@mui/material/Chip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingIcon from "@mui/icons-material/Pending";
import WarningIcon from "@mui/icons-material/Warning";
import { Typography } from "@mui/material";

const StatusChip = ({ status }) => {
  const getPropsForChip = (status) => {
    switch (status) {
      case "acknowledged":
        return { icon: <PendingIcon />, color: "warning" };
      case "resolved":
        return { icon: <CheckCircleOutlineIcon />, color: "success" };
      case "triggered":
        return { icon: <WarningIcon />, color: "error" };
      default:
        return { icon: <WarningIcon />, color: "error" };
    }
  };

  return (
    <Chip
      label={<Typography textTransform={"capitalize"}>{status}</Typography>}
      {...getPropsForChip(status)}
    />
  );
};

export default StatusChip;
