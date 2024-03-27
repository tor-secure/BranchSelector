import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Authentication from "./pages/Authentication.jsx";
<<<<<<< HEAD
import ResultsPage from "./pages/ResultPage/ResultPage.jsx";
=======
import { TestArea } from "./Components/Tests/TestArea.jsx";
>>>>>>> 77a14d5327df935cdc345f60628dc504070db356

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "auth",
    element: <Authentication />,
  },
  {
<<<<<<< HEAD
    path: "result",
    element: <ResultsPage />,
=======
    path: "testPage",
    element: <TestArea />,
>>>>>>> 77a14d5327df935cdc345f60628dc504070db356
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
