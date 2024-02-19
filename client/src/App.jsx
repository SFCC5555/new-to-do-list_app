import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRequest } from "./api/get";
import { updateProfile } from "./redux/profileSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      const profile = await getRequest("profile");

      dispatch(updateProfile(profile));
    };

    getProfile();
  });

  return (
    <BrowserRouter>
      <h1 className="text-2xl mb-5">To-do List</h1>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TasksPage />} />
          <Route path="/add-task" element={<TaskFormPage />} />
          <Route path="/edit-task/:id" element={<TaskFormPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
