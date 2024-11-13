import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EntryList from "./pages/EntryList";
import AdminPanel from "./pages/AdminPanel";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AdminPanel />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/entries" element={<EntryList />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default App;
