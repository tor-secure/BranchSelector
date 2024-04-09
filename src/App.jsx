import { Outlet, useLocation } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Suspense, useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { getCurrentUser } from "./services/authService";
import AuthenticatedNavBar from "./Components/Navbar/AuthenticatedNavBar";
import { LoadingPage } from "./pages/LoadingPage";
import { getAuth } from "firebase/auth";

library.add(fas);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getAuthState = async () => {
      const temp = await getCurrentUser();
      setIsAuthenticated(temp);
    };
    getAuthState();
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <main className="overflow-x-hidden">
      <header>
        {isAuthenticated === null ? (
          <Navbar />
        ) : isAuthenticated ? (
          <AuthenticatedNavBar user={isAuthenticated} />
        ) : (
          <Navbar />
        )}
      </header>
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
      <Footer />
    </main>
  );
}

// function created for Suspense *changed to LoadingPage component
// function Loading() {
//   return <h2>Loading...</h2>;
// }
export default App;
