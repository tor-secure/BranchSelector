import { Outlet } from "react-router-dom";
import { Authentication } from "./pages/Authentication";

import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultPage/ResultPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

library.add(fas);

function App() {
  return (
    <main className="overflow-x-hidden">
      <Suspense fallback={<Loading /> }>
        <LandingPage />
      </Suspense>
    </main>
  );
}
function Loading() {
  return <h2>Loading</h2>;
}
export default App;
