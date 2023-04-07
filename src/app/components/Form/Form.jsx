import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useCreateEmployee } from "../../hooks/useCreateEmployee";
import { useEditEmployee } from "../../hooks/useEditEmployee";

export const Form = ({ editRow, setEditRow, setrows, rows }) => {
  const [ID, setId] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertEdit, setAlertEdit] = useState(false);
  const [axiosError, setAxiosError] = useState(false);
  const [formError, setFormError] = useState({
    name: false,
    salary: false,
    age: false,
  });
  const handleCreate = async (event) => {
    event.preventDefault();
    if (
      !formError.name &&
      !formError.salary &&
      !formError.age &&
      name != "" &&
      salary != "" &&
      age != ""
    ) {
      const data = {
        name,
        salary,
        age,
      };
      const response = await useCreateEmployee(data);
      if (response.status === 200) {
        data.id = rows.length + 1;
        const newRow = [...rows];
        newRow.push(data);
        setrows(newRow);
        setAlert(true);
        handleClearForm();
        console.log("rows", rows);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      } else {
        setAxiosError(true);
        setTimeout(() => {
          setAxiosError(false);
        }, 2000);
      }
    } else {
      console.log("No se permite");
    }
  };
  const handleEdit = async (event) => {
    event.preventDefault();
    if (!formError.name && !formError.salary && !formError.age) {
      const data = {
        name,
        salary,
        age,
      };
      const response = await useEditEmployee(ID, data);
      if (response.status === 200) {
        const indice = rows.findIndex((objeto) => objeto.id === ID);
        console.log("indice", indice);
        if (indice !== -1) {
          let rowEdit = { ...rows[indice] };
          data.id = rowEdit.id;
          rowEdit = data;
          const newRow = [...rows];
          newRow[indice] = rowEdit;
          setrows(newRow);
        }
        setAlertEdit(true);
        handleClearForm();
        setTimeout(() => {
          setAlertEdit(false);
        }, 2000);
      } else {
        setAxiosError(true);
        setTimeout(() => {
          setAxiosError(false);
        }, 2000);
      }
    } else {
      console.log("Error al editar");
    }
  };
  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    setName(inputValue);
    const lettersOnly = "^[A-Za-z\\s]*$";
    console.log(!inputValue.match(lettersOnly));
    if (!inputValue.match(lettersOnly)) {
      setFormError({ ...formError, name: true });
    } else {
      setFormError({ ...formError, name: false });
    }
  };
  const handleSalaryChange = (event) => {
    const inputValue = event.target.value;
    setSalary(inputValue);
    if (inputValue >= 0) {
      setFormError({ ...formError, salary: false });
      console.log("false", formError);
    } else {
      setFormError({ ...formError, salary: true });
      console.log("true", formError);
    }
  };
  const handleAgeChange = (event) => {
    const inputValue = event.target.value;
    setAge(inputValue);
    const numberOnly = "^\\d+\\s*$|^\\s*$";
    console.log(inputValue < 18);
    console.log(inputValue > 90);
    console.log(!inputValue.match(numberOnly));
    if (
      inputValue === "" ||
      (inputValue >= 18 && inputValue <= 90 && inputValue.match(numberOnly))
    ) {
      setFormError({ ...formError, age: false });
    } else {
      setFormError({ ...formError, age: true });
    }
  };

  const handleClearForm = () => {
    setName("");
    setSalary("");
    setAge("");
    setEditRow(null);
  };

  useEffect(() => {
    if (editRow) {
      console.log(editRow);
      setId(editRow.id);
      setName(editRow.name);
      setSalary(editRow.salary);
      setAge(editRow.age);
      setFormError({ ...formError, name: false, salary: false, age: false });
    }
  }, [editRow]);
  return (
    <div
      className="div-form"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {editRow ? (
        <h2 style={{ color: "black" }}>EDIT EMPLOYEE</h2>
      ) : (
        <h2 style={{ color: "black" }}>CREATE EMPLOYEE</h2>
      )}
      <form style={{ margin: 20 }}>
        {editRow ? (
          <TextField
            label="ID"
            value={ID}
            onChange={(event) => setId(event.target.value)}
            fullWidth
            disabled
            style={{ margin: "8px 0" }}
          />
        ) : null}

        <TextField
          label="Name"
          placeholder="ej: Felipe Kcomt"
          value={name}
          onChange={(event) => {
            handleNameChange(event);
          }}
          error={formError.name}
          helperText={formError.name && "Solo se permiten letras"}
          fullWidth
          style={{ margin: "8px 0" }}
          required
        />
        <TextField
          label="Salary"
          placeholder="ej: 3000"
          value={salary}
          onChange={(event) => {
            handleSalaryChange(event);
          }}
          error={formError.salary}
          helperText={
            formError.salary && "Por favor ingresa un numero mayor a 0"
          }
          fullWidth
          style={{ margin: "8px 0" }}
          required
        />
        <TextField
          label="Age"
          placeholder="ej: 20"
          value={age}
          onChange={(event) => {
            handleAgeChange(event);
          }}
          error={formError.age}
          helperText={
            formError.age && "Por favor ingresa una edad entre 18 y 90 años"
          }
          fullWidth
          style={{ margin: "8px 0" }}
          required
        />
        {editRow ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: 5 }}
            onClick={handleEdit}
          >
            Save
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: 5 }}
            onClick={handleCreate}
          >
            Create
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: 5 }}
          onClick={handleClearForm}
        >
          Clear
        </Button>
        {alert ? (
          <Alert
            severity="success"
            style={{ backgroundColor: "black", margin: 10 }}
          >
            Usuario creado
          </Alert>
        ) : null}
        {axiosError ? (
          <Alert
            severity="error"
            style={{ backgroundColor: "black", margin: 10 }}
          >
            Error 429, por favor intentalo más tarde
          </Alert>
        ) : null}
        {alertEdit ? (
          <Alert
            severity="success"
            style={{ backgroundColor: "black", margin: 10 }}
          >
            Usuario editado
          </Alert>
        ) : null}
      </form>
    </div>
  );
};
