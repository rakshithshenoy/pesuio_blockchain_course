import "./App.css";
import Campaign from "./pages/Campaign";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Requests from "./pages/Requests";

//import react router dom stuff
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/campaigns/:address" element={<Campaign />} />
          <Route path="/campaigns/new" element={<Create />} />
          <Route path="/campaigns/requests/:address" element={<Requests />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
