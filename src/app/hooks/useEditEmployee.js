import React, { useEffect } from "react";
import { editEmployee } from "../services/getEmployees";

export const useEditEmployee = async (id, data) => {
  const edit = async () => {
    const response = await editEmployee(id, data);
    return response;
  };
  const response = await edit();
  return response;
};
