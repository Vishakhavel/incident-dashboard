import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid2 as Grid,
  Box,
  Snackbar,
  Alert,
  // Chip,
} from "@mui/material";
import StatusChip from "../../atoms/StatusChip";
import HoverText from "../../atoms/HoverText";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TeamChip from "../../atoms/TeamChip";

import { formatDate } from "../../../utils/utilityFunctions";

// destructured data with fallback values for missing data
const IncidentCard = ({
  incidentData: {
    id = "",
    summary = "",
    title = "",
    status = "",
    service = "",
    teams = [],
    created_at = "",
    updated_at = "",
    priority = "",
    urgency = "",
    html_url = "",
  },
}) => {
  // Format the dates to a readable format

  // const formattedCreatedAt = new Date(created_at).toLocaleString();
  // const formattedUpdatedAt = updated_at
  //   ? new Date(updated_at).toLocaleString()
  //   : "Not Updated";

  const [clicked, setClicked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Memoization to avoid redundant calls to create new Date objects every time.

  const formattedCreatedAt = useMemo(
    () => new Date(created_at).toLocaleString(),
    [created_at]
  );

  const formattedUpdatedAt = useMemo(
    () => (updated_at ? new Date(updated_at).toLocaleString() : "Not Updated"),
    [updated_at]
  );

  const handleCopyClick = () => {
    navigator.clipboard.writeText(id); // Copy to clipboard
    setClicked(true); // Trigger animation
    setOpenSnackbar(true); // Show popup
    setTimeout(() => setClicked(false), 300); // Reset animation after 300ms
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close popup
  };

  return (
    <Card
      sx={{
        margin: 2,
        maxWidth: 400,
        minWidth: 300,
        "&:hover": {
          bgcolor: "#F0EAD6",
        },
      }}
    >
      <CardContent>
        {/* Hoverable Title */}

        <Grid item mt={2} mb={2} className="m-4">
          <Box display="flex" justifyContent="space-between" width="100%">
            <HoverText text={title} />
            <ContentCopyIcon
              onClick={handleCopyClick}
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s ease, color 0.3s ease",
                transform: clicked ? "scale(1.2)" : "scale(1)",
                color: clicked ? "blue" : "inherit",
              }}
            />
          </Box>
          {/* Snackbar for Copy Notification */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={2000} // Auto-close after 2 seconds
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Incident ID copied to clipboard!
            </Alert>
          </Snackbar>
        </Grid>

        {/* <HoverText text={title} /> */}

        {/* Summary */}
        <Typography variant="body2" color="text.secondary" paragraph>
          {summary}
        </Typography>

        {/* StatusChip */}
        <Grid container justifyContent="center" mt={2} mb={2}>
          <Grid item>
            <StatusChip status={status} />
          </Grid>
        </Grid>

        <Grid item mt={2} mb={2} className="m-4">
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="body2">
              <strong>Priority:</strong>
              {/* {priority?.summary || "N/A"} */}

              <Typography textTransform={"capitalize"} component="body1">
                {" "}
                {priority?.summary}
              </Typography>
            </Typography>
            <Typography variant="body2">
              <strong>Urgency:</strong> {/* // TODO: text transform */}
              <Typography textTransform={"capitalize"} component="body1">
                {" "}
                {urgency}
              </Typography>
            </Typography>
          </Box>
        </Grid>

        {/* Metadata */}
        <Grid container spacing={1} direction={"column"}>
          <Grid item>
            <Typography variant="body2">
              <strong>Triage:</strong> {teams?.[0]?.summary || "N/A"}
              {/* <strong>Team:</strong>{" "} */}
              {/* <TeamChip team={teams?.[0]?.summary} /> */}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              <strong>Service:</strong> {service?.summary || "N/A"}
            </Typography>
          </Grid>
          {/* <Grid item xs={12}> */}

          {/* <Grid item>
            <Typography variant="body2">
              <strong>Priority:</strong> {priority?.summary || "N/A"} -{" "}
              <strong>Urgency:</strong> {urgency}
            </Typography>
          </Grid> */}
          <Grid item>
            <Typography variant="body2">
              <strong>Created At:</strong> {formattedCreatedAt}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              <strong>Updated At:</strong> {formattedUpdatedAt}
            </Typography>
          </Grid>
        </Grid>

        {/* Button */}
        <Grid container justifyContent="center" mt={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
            >
              View Incident
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IncidentCard;
