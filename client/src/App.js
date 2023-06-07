import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTitle from "./hooks/useTitle";
import setAuthToken from "./utils/setAuthToken";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./templates/main/MainLayout";
import AuthLayout from "./templates/auth/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRequired from "./components/AuthRequired";
import { ROLES } from "./constants/index";
import AllQuestion from "./pages/AllQuestion";
import PostQuestion from "./pages/PostQuestion";
import "react-toastify/dist/ReactToastify.min.css";
import DetailQuestion from "./pages/DetailQuestion";
import { ToastContainer } from "react-toastify";
function App() {
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (user?.token) {
      setAuthToken(user.token);
    }
  }, [user]);
  useTitle("Index | Question");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
          }
        >
          <Route index element={<AllQuestion searchTerm={searchTerm} />} />
          <Route element={<AuthRequired allowedRoles={[ROLES.User]} />}>
            <Route path="question/add" element={<PostQuestion user={user} />} />
          </Route>
          <Route path="question/:id" element={<DetailQuestion user={user} />} />
        </Route>
        <Route path="/user" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <ToastContainer theme="light" />
    </>
  );
}

export default App;
