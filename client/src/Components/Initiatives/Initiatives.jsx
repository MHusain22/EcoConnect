import React, { useState, useEffect } from "react";
import InitiativeCard from "./InitiativeCard";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddInitiative from "./AddInitiative";
import axios from "axios";
import Map from "../Map/Map";
import Head from "../UI/Head";

const Initiatives = () => {
  const [open, setOpen] = useState(false);
  const [initative, setinitative] = useState([]);

  const openDialog = () => {
    setOpen(true);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getinitiative");
        setinitative(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, [initative]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Head>Initiatives</Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--var-color)",
            "&:hover": {
              backgroundColor: "rgb(100, 205, 90)", // Change this to the desired hover color
            },
          }}
          onClick={() => openDialog()}
        >
          Add Initiative
        </Button>
      </Box>
      <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {initative.map((initiative) => (
            <InitiativeCard
              key={initiative.id}
              name={initiative.name}
              description={initiative.description}
              imageUrl="/bg.jpg"
            />
          ))}
        </div>
      </Box>
      <AddInitiative open={open} setOpen={setOpen} />
      <Map />
    </Box>
  );
};

export default Initiatives;
