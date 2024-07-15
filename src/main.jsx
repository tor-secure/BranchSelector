import React, { Suspense } from "react";
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

//import BookingPage from "./pages/BookingPage.jsx";

//import EBook from "./pages/Ebook.jsx";
import { TestInstruction } from "./Components/Tests/TestInstruction.jsx";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute.jsx";
//import ContactUs from "./Components/ContactUs/ContactUs.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import { DashboardPage } from "./Components/Dashboard/DashboardPage.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import TermsPage from "./pages/TermsPage.jsx";
import { LoadingPage } from "./pages/LoadingPage.jsx";
import RefundPolicyPage from "./pages/RefundPage.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import PricingPage from "./pages/PricingPage/PricingPage.jsx";

const LazyPrivacyPage = React.lazy(() => import("./pages/PrivacyPage.jsx"));
const LazyTermsPage = React.lazy(() => import("./pages/TermsPage.jsx"));
const LazyBlogPage = React.lazy(() => import("./Components/Blog/Blog.jsx"));
const LazyEbook = React.lazy(() => import("./pages/Ebook.jsx"));
const LazyBookingPage = React.lazy(() => import("./pages/BookingPage.jsx"));
const LazyContactUs = React.lazy(() =>
  import("./Components/ContactUs/ContactUs.jsx")
);
//const LazyTestListPage = React.lazy(() => import("./Components/TestsList.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "privacy",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LazyPrivacyPage />
          </Suspense>
        ),
      },
      {
        path: "terms",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LazyTermsPage />
          </Suspense>
        ),
      },
      {
        path: "booking",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LazyBookingPage />
          </Suspense>
        ),
      },
      {
        path: "testList",
        element: (
          //<Suspense fallback={<LoadingPage />}>
          //<LazyTestListPage />
          //</Suspense>
          <TestsList />
        ),
      },
      {
        path: "blog",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LazyBlogPage />
          </Suspense>
        ),
      },
      {
        path: "ebook",
        //<EBook />
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LazyEbook />
          </Suspense>
        ),
      },
      {
        path: "contactus",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LazyContactUs />
          </Suspense>
        ), //<ContactUs />,
      },
      {
        path: "refund",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RefundPolicyPage />
          </Suspense>
        ), //<ContactUs />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "result",
        element: (
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
        {
    path: "pricing",
    element: <PricingPage />,
    errorElement: <ErrorPage />,
  },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },

  {
    path: "login",
    element: <Authentication authType="login" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <Authentication authType="signup" />,
    errorElement: <ErrorPage />,
  },

  {
    path: "testPage",
    element: (
      <ProtectedRoute>
        <TestArea />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "services-test",
    element: <ServicesTest />,
    errorElement: <ErrorPage />,
  },



  {
    path: "testInstruction",
    element: (
      <ProtectedRoute>
        <TestInstruction />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
