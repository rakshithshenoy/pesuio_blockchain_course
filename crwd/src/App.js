import "./App.css";
import Campaign from "./pages/Campaign";
import Create from "./pages/Create";
import Home from "./pages/Home";
import NewRequest from "./pages/NewRequest";
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
          <Route path="/campaigns/:address/requests" element={<Requests />} />
          <Route
            path="/campaigns/:address/requests/new"
            element={<NewRequest />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
