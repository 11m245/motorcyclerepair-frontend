import { createContext } from "react";
import "./App.css";
import { Home } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { ActivateUser } from "./pages/ActivateUser";
import { NotFound } from "./components/notfound";
import { ChangePasswordForm } from "./components/ChangePassword";
export const apiContext = createContext();

function App() {
  // const serverUrl = "http://localhost:4000";
  const clientUrl = "http://localhost:3000";
  const serverUrl = "https://motorcyclerepair-backend.vercel.app";
  const contextObj = { serverApi: serverUrl, clientUrl };

  return (
    <div className="App">
      <div className="project-container">
        <ToastContainer theme="dark" />
        <apiContext.Provider value={contextObj}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activate/:id" element={<ActivateUser />} />
            <Route
              path="/change-password/:id"
              element={<ChangePasswordForm />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </apiContext.Provider>
      </div>
    </div>
  );
}

export default App;
