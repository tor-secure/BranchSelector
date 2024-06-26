import { Outlet, useLocation } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Suspense, useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { getCurrentUser } from "./services/authService";
import AuthenticatedNavBar from "./Components/Navbar/AuthenticatedNavBar";
import { LoadingPage } from "./pages/LoadingPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

library.add(fas);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setIsAuthenticated(user);
      setIsLoading(false);
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <main>
      <header>
        {isLoading ? (
          <LoadingPage />
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

export default App;
