import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useGetEmployees } from "../../hooks/useGetEmployees";
import { Alert } from "../Alert/Alert";

export const Table = ({ setEditRow, rows, setrows }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "salary", headerName: "Salary", width: 150 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: 5 }}
            onClick={() => {
              handleEdit(params.row);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: 5 }}
            onClick={() => {
              handleClickOpen(params.row.id);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const { employees } = useGetEmployees();

  const handleEdit = (row) => {
    setEditRow(row);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setrows(updatedRows);
  };
  const handleRows = () => {
    const newRow = employees.map((employee) => {
      return {
        id: employee.id,
        name: employee.employee_name,
        salary: employee.employee_salary,
        age: employee.employee_age,
        key: employee.id,
      };
    });
    setrows(newRow);
  };

  const newEmployee = (employee) => {
    setrows(...rows, employee);
  };

  useEffect(() => {
    handleRows();
  }, [employees]);

  return (
    <>
      {rows.length > 0 ? (
        <div style={{ height: 400, margin: 30 }}>
          <h2 style={{ color: "black" }}>ACTIVE EMPLOYEE</h2>
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnMenu
            rowsPerPageOptions={[5, 10, 25]}
            getRowId={(row) => row.id}
            style={{ width: 900 }}
          />
        </div>
      ) : (
        <div style={{ height: 400, width: 900, color: "black" }}>
          <h1>!!!Ups Error 429, vuelve a intentarlo más tarde</h1>
        </div>
      )}
      <Alert
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        deleteId={deleteId}
        handleDelete={handleDelete}
      />
    </>
  );
};
