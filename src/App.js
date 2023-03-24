import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { publicRouters } from "./router";

export default function App() {
  const checkLogin = localStorage.getItem("user");

  return (
    <div className="app">
      <Routes>
        {publicRouters.map((item, index) => {
          const Page = item?.component;
          return <Route key={index} path={item.path} element={<Page />} />;
        })}
      </Routes>
    </div>
  );
}
