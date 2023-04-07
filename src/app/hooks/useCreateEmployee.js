import React, { useEffect } from "react";
import { createEmployee } from "../services/getEmployees";

export const useCreateEmployee = async (data) => {
  const createNewEmployee = async () => {
    const response = await createEmployee(data);
    return response;
  };
  //useEffect
  const response = await createNewEmployee();
  return response;
};
