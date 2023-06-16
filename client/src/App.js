import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthRequired from "./components/AuthRequired";
import { ROLES } from "./constants/index";
import useTitle from "./hooks/useTitle";
import AllAnswer from "./pages/AllAnswer";
import AllQuestion from "./pages/AllQuestion";
import AllSave from "./pages/AllSave";
import { AllTag } from "./pages/AllTag";
import DetailQuestion from "./pages/DetailQuestion";
import EditQuestion from "./pages/EditQuestion";
import Login from "./pages/Login";
import PasswordResetPage from "./pages/PasswordResetPage";
import PasswordResetRequestPage from "./pages/PasswordResetRequestPage";
import PostQuestion from "./pages/PostQuestion";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import YourQuestion from "./pages/YourQuestion";
import AuthLayout from "./templates/auth/AuthLayout";
import BaseLayout from "./templates/base/BaseLayout";
import MainLayout from "./templates/main/MainLayout";
import setAuthToken from "./utils/setAuthToken";
import AllTagQuestion from "./pages/AllTagQuestion";
import EditAnswer from "./pages/EditAnswer";
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
            <BaseLayout setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
          }
        >
          <Route path="/" element={<MainLayout />}>
            <Route index element={<AllQuestion searchTerm={searchTerm} />} />

            <Route path="tags" element={<AllTag />} />
            <Route
              path="question/:id"
              element={<DetailQuestion user={user} />}
            />
            <Route
              path="question/tag/:tagId"
              element={<AllTagQuestion user={user} />}
            />
            <Route element={<AuthRequired allowedRoles={[ROLES.User]} />}>
              <Route
                path="question/add"
                element={<PostQuestion user={user} />}
              />
              <Route
                path="question/edit/:id"
                element={<EditQuestion user={user} />}
              />
              <Route
                path="answer/edit/:id"
                element={<EditAnswer user={user} />}
              />
              <Route path="users/:id" element={<ProfilePage user={user} />}>
                <Route index element={<YourQuestion user={user} />} />
                <Route path="answers" element={<AllAnswer user={user} />} />
                <Route path="saves" element={<AllSave user={user} />} />
              </Route>
            </Route>
          </Route>
          <Route path="/user" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="reset_password_request"
              element={<PasswordResetRequestPage />}
            />
            <Route
              path="reset_password/:token"
              element={<PasswordResetPage />}
            />
          </Route>
        </Route>
      </Routes>

      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
