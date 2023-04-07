import React, { useState } from "react";
import { Table } from "../../components/Table/Table";
import { Form } from "../../components/Form/Form";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

export const Ntt = () => {
  const [editRow, setEditRow] = useState(null);
  const [rows, setrows] = useState([]);
  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          xs={8}
          style={{
            height: "80vh",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Table setEditRow={setEditRow} rows={rows} setrows={setrows} />
        </Grid>
        <Grid xs={1}>
          <Divider
            orientation="vertical"
            variant="middle"
            color="black"
            // sx={{ height: 700, width: 2 }}
            style={{ height: "100%", width: "0.5px" }}
          />
        </Grid>
        <Grid
          xs={3}
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Form
            editRow={editRow}
            setEditRow={setEditRow}
            setrows={setrows}
            rows={rows}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
