import React, { useEffect, useState } from "react";

import IncidentCard from "../IncidentCard";
import Filter from "../Filter";
import apiData from "../../utils/data.js";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

const Dashboard = () => {
  const [data, setData] = useState(apiData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //   const [filteredData, setFilteredData] = useState(incidentDataArray);

  const handleFilterChange = (filters) => {
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
    // <div className="container mx-auto flex flex-col p-4">
    //   {/* filter component to filter the incidents based on the API fields */}
    //   <Container className="flex justify-center mb-4">
    //     <Typography variant="h2">Incident report</Typography>
    //   </Container>

    //   <Container className="flex justify-center mb-4">
    //     <Filter onFilterChange={handleFilterChange} />
    //   </Container>

    //   <div>
    //     <div
    //       className="
    //     grid
    //     grid-cols-4
    //     gap-4
    //     sm:grid-cols-2
    //     md:grid-cols-3
    //     lg:grid-cols-4
    //     padding-4
    //     "
    //     >
    //       {/* {(data.slice(0, rowsPerPage) || []).map((incidentData) => ( */}
    //       {(data || []).map((incidentData) => (
    //         <div key={incidentData.id} className="w-full">
    //           <IncidentCard incidentData={incidentData} />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

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
      <Grid>
        <div>
          <div
            className="
        grid
        grid-cols-4
        gap-4
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        padding-4
        "
          >
            {/* {(data.slice(0, rowsPerPage) || []).map((incidentData) => ( */}
            {(filteredData || []).map((incidentData) => (
              <div key={incidentData.id} className="w-full">
                <IncidentCard incidentData={incidentData} />
              </div>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
