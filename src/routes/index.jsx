import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout"
import HomePage from "../pages/HomePage"
// import Dashboard from "../pages/Dashboard";

const AppRoutes = () => (
  <BrowserRouter>
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </AppLayout>
  </BrowserRouter>
);

export default AppRoutes;