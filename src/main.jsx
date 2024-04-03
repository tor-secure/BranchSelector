import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import { Authentication } from "./pages/Authentication.jsx";
import ResultsPage from "./pages/ResultPage/ResultPage.jsx";
import { TestArea } from "./Components/Tests/TestArea.jsx";
import { ServicesTest } from "./pages/Testing/ServicesTest.jsx";
import { TestsList } from "./Components/TestsList.jsx";

import BookingPage from "./pages/BookingPage.jsx";

import EBook from "./pages/Ebook.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "login",
    element: <Authentication authType="login" />,
  },
  {
    path: "signup",
    element: <Authentication authType="signup" />,
  },
  {
    path: "booking",
    element: <BookingPage />,
  },
  {
    path: "result",
    element: <ResultsPage />,
  },
  {
    path: "testPage",
    element: <TestArea />,
  },
  {
    path: "services-test",
    element: <ServicesTest />,
  },
  {
    path: "testList",
    element: <TestsList />,
  },
  {
    path: "ebook",
    element: <EBook />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
