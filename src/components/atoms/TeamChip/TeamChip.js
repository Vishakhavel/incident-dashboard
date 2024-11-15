import { Chip } from "@mui/material";
import React from "react";

const TeamChip = ({ team }) => (
  <Chip label={team} color={team === "Engineering" ? "primary" : "secondary"} />
);

export default TeamChip;
