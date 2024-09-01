import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";


import LandingPage from "./pages/LandingPage.jsx";
import { Authentication } from "./pages/Authentication.jsx";
import ResultsPage from "./pages/ResultPage/ResultPage.jsx";
import { TestArea } from "./Components/Tests/TestArea.jsx";
import { ServicesTest } from "./pages/Testing/ServicesTest.jsx";
import { TestsList } from "./Components/TestsList.jsx";
import { TestInstruction } from "./Components/Tests/TestInstruction.jsx";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import { DashboardPage } from "./Components/Dashboard/DashboardPage.jsx";
import { ToastContainer } from "react-toastify";
import { LoadingPage } from "./pages/LoadingPage.jsx";
import RefundPolicyPage from "./pages/RefundPage.jsx";
import {PricingPage} from "./pages/PricingPage/PricingPage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage.jsx";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.jsx";
import { DeleteAccountPage } from "./pages/DeleteAccountPage.jsx";
import { PaymentConfirmationPage } from "./pages/PaymentConfirmationPage.jsx";
import { TestReport } from "./pages/ResultPage/ResultReport.jsx";


//Lazy loading static pages
const LazyPrivacyPage = React.lazy(() => import("./pages/PrivacyPage.jsx"));
const LazyDisclaimerPage = React.lazy(()=>import("./pages/DisclaimerPage.jsx"))
const LazyTermsPage = React.lazy(() => import("./pages/TermsPage.jsx"));
const LazyBlogPage = React.lazy(() => import("./Components/Blog/Blog.jsx"));
const LazyEbook = React.lazy(() => import("./pages/Ebook.jsx"));
const LazyBookingPage = React.lazy(() => import("./pages/BookingPage.jsx"));
const LazyContactUs = React.lazy(() =>import("./Components/ContactUs/ContactUs.jsx"));

//All routes in the project are defined here
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // All the routes that under this childern list will be rendered with the App template.
    // Basically with the navbar and footer.


    // Wrap the required element inside a ProtectedRoute element to ensure users wont be able to access
    // the routes without being authenticated.

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
        path: "disclaimer",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LazyDisclaimerPage />
          </Suspense>
        ),
      },
      {
        path: "paymentConfirmation",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <PaymentConfirmationPage />
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
        ), 
      },
      {
        path: "refund",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RefundPolicyPage />
          </Suspense>
        ), 
      },
      {
        path: "deleteAccount",
        element: (
          <ProtectedRoute>
            <DeleteAccountPage />
          </ProtectedRoute>
        ), 
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
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
        errorElement: <ErrorPage />,
      },
      ],
    errorElement: <ErrorPage />,
  },

  // Routes below this line dont use the default template and will be rendered
  // without a navbar and a footer
  
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
    path: "forgotPassword",
    element: <ForgotPasswordPage />,
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
  /*{
    path: "services-test",
    element: <ServicesTest />,
    errorElement: <ErrorPage />,
  }*/,
  {
    path: "result-report",
    element: <TestReport />,
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
    <ToastContainer /> {/*Required to display toasts throughout the website*/}
    <RouterProvider router={router} />
  </React.StrictMode>
);
