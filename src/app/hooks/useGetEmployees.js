import React, { useState, useEffect } from "react";
import { getEmployees } from "../services/getEmployees";

export const useGetEmployees = () => {
  const [employees, setEmployees] = useState([]);

  const Employees = async () => {
    const newEmployees = await getEmployees();
    setEmployees(newEmployees);
    console.log("employees", employees);
  };
  useEffect(() => {
    Employees();
  }, []);

  return {
    employees: employees,
  };
};
