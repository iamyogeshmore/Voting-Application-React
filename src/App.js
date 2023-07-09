import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterUser from "./User/RegisterUser";
import Login from "./User/Login";
import Voting from "./User/Voting";
import AdminLogin from "./Admin/AdminLogin";
import Admin from "./Admin/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Voting" element={<Voting />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
