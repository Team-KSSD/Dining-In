import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./public/styles.scss";
import App from "./App.jsx";
import Signup from "./components/Signup";
import AddRecipe from "./components/AddRecipe";
import GetRecipe from "./components/GetRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "addRecipe",
    element: <AddRecipe />,
  },
  {
    path: "getRecipe",
    element: <GetRecipe />,
  },
  {
    path: "home",
    element: <Home />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);