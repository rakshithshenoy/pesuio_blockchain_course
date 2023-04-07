//import react router dom stuff
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCampaign from "./pages/CreateCampaign";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCampaign />} />
      </Routes>
    </Router>
  );
}

export default App;
