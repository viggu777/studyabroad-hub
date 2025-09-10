import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Tools from "./pages/Tools";
import Counseling from "./pages/Counseling";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/counseling" element={<Counseling />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
