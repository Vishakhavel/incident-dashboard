import React, { useEffect, useState } from "react";
// import apiData from "../../../utils/data.js";
import {
  CircularProgress,
  Typography,
  Container,
  Grid2 as Grid,
} from "@mui/material";
// import Pagination from "@mui/material/Pagination";

import IncidentCard from "../../molecules/IncidentCard/";
import Filter from "../../molecules/Filter";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  console.log("filteredData woo", typeof filteredData, filteredData);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Starting data fetch..."); // Logger for start of the API call

      if (!apiData.length) {
        try {
          setLoading(true);
          console.log("Fetching data from API..."); // Logger before fetch starts

          // const incidentApiData = await fetch(`${process.env.API_URL}`);
          const incidentApiData = await fetch(
            "https://rh871jxygg.execute-api.us-east-2.amazonaws.com/default/panw-incident-reponse"
          );
          console.log("API response received, status:", incidentApiData); // Log the response status

          if (!incidentApiData.ok) {
            throw new Error(
              `Error fetching data, status code: ${incidentApiData.status}`
            );
          }

          const response = await incidentApiData.json();
          console.log("Data successfully fetched:", typeof response); // Log the fetched data

          setApiData(response);
          setError(""); // Reset error on successful fetch
        } catch (error) {
          setError(error.message);
          setApiData([]);
          console.error("Error fetching data:", error); // Error logger
        } finally {
          setLoading(false);
          console.log("Data fetch process completed."); // Logger for completion of data fetch
        }
      }
    };

    fetchData();
  }, [apiData.length]); // Ensuring effect runs when data length changes

  useEffect(() => {
    setFilteredData(apiData);
  }, [apiData]);

  const handleFilterChange = (filters) => {
    // let newData = [...apiData];
    let newData = [...apiData];

    if (filters.createdAt) {
      newData = newData.filter(
        (item) => new Date(item.created_at) >= filters.createdAt
      );
    }

    if (filters.updatedAt) {
      newData = newData.filter(
        (item) => new Date(item.updated_at) <= filters.updatedAt
      );
    }

    if (filters.team !== "All") {
      newData = newData.filter((item) =>
        item.teams.some((team) => team.summary === filters.team)
      );
    }

    if (filters.status !== "All") {
      newData = newData.filter((item) => item.status === filters.status);
    }

    if (filters.priority !== "All") {
      newData = newData.filter(
        (item) => item.priority && item.priority.summary === filters.priority
      );
    }

    if (filters.urgency !== "All") {
      newData = newData.filter((item) => item.urgency === filters.urgency);
    }

    setFilteredData(newData);
  };

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={3}
      className="container mx-auto flex flex-col p-4"
    >
      {/* header */}
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Container className="flex justify-center mb-4">
          <Typography variant="h2">Incident report</Typography>
        </Container>
      </Grid>
      {/* filter component to filter the incidents based on the API fields */}
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Container className="flex justify-center mb-4">
          <Filter onFilterChange={handleFilterChange} />
        </Container>
      </Grid>
      {/* the incident cards */}
      <Grid container>
        {/* {(data.slice(0, rowsPerPage) || []).map((incidentData) => ( */}
        {(filteredData || []).map((incidentData) => (
          // <div key={incidentData.id} className="w-full">
          <Grid
            item
            size={{ xs: 12, sm: 12, md: 4, lg: 3 }}
            style={{ flexGrow: 1 }}
          >
            <IncidentCard incidentData={incidentData} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Grid className="flex justify-center items-center">
          <CircularProgress />
        </Grid>
      )}
      {/* //TODO: center the NO Data Found text */}
      {!error && !loading && filteredData.length === 0 && (
        <Grid className="flex justify-center items-center">
          <Typography variant="h6" color="textSecondary">
            No data found
          </Typography>
        </Grid>
      )}
      {error && (
        <Grid className="flex justify-center items-center">
          <Typography variant="h6" color="textSecondary">
            {error}
          </Typography>
        </Grid>
      )}
      {/* <ManualPagination /> */}
    </Grid>
  );
};

export default Dashboard;
