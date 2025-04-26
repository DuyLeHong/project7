import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddIdea from "./pages/AddIdea";
import IdeaDetail from "./pages/IdeaDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-idea" element={<AddIdea />} />
        <Route path="/idea/:id" element={<IdeaDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
