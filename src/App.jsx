import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import AuthDemo from "./pages/AuthDemo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWithNav />} />
        <Route path="/demo/auth" element={<AuthDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomeWithNav() {
  const navigate = useNavigate();
  return <Home onDemoNavigate={(path) => navigate(path)} />;
}
