
import Authentication from "./pages/Authentication";

import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultPage/ResultPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

function App() {
  return (
    <div>
      <LandingPage />
      <Authentication />
    </div>
  );

}

export default App;
