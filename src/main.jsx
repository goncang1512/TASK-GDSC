import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import Home from "./components/pages/Home.jsx";
import Tugas from "./components/pages/Tugas.jsx";
import Completed from "./components/pages/Completed.jsx";
import Jadwal from "./components/pages/Jadwal.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/tugas",
        element: <Tugas />,
      },
      {
        path: "/mytask/:status",
        element: <Completed />,
      },
      {
        path: "/jadwal",
        element: <Jadwal />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
