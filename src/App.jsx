import { Outlet, useLocation } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Suspense, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { getCurrentUser } from "./services/authService";
import AuthenticatedNavBar from "./Components/Navbar/AuthenticatedNavBar";

library.add(fas);

const isAuthenticated = getCurrentUser();

function App() {
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
        {isAuthenticated === null ? <Navbar /> : <AuthenticatedNavBar />}
      </header>

      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </main>
  );
}

// function created for Suspense
function Loading() {
  return <h2>Loading...</h2>;
}
export default App;
