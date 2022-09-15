import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";

import "./app.scss";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import UserInfo from "./pages/userInfo";
import NavHeader from "./components/NavHeader";
import Summary from "./pages/summary";
import Login from "./pages/login";
import RequireAuth from "./services/auth";
import Layout from "./components/layout";
import { AuthContext } from "./context/userContext";
import AdminSummary from "./pages/adminSummary";
import AdminList from "./pages/adminList";

function App() {
  const context = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <NavHeader />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/login"
              element={context?.auth ? <Home /> : <Login />}
            />
            <Route path="/unauthorized" element={<NotFound />} />

            <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
              <Route path="/" element={<Home />} />
              <Route path="/user/:id" element={<UserInfo />} />
              <Route path="/summary" element={<Summary />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["admin"]} />}>
              <Route path="/report" element={<AdminSummary />} />
              <Route path="/alllist" element={<AdminList />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
