import React from "react";
import { Routes, Route } from "react-router-dom";
import { Ntt } from "../screen/ntt/Ntt";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Ntt />}></Route>
      </Routes>
    </>
  );
};
