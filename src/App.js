import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Home } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { ActivateUser } from "./pages/ActivateUser";
import { NotFound } from "./components/notfound";
import { ChangePasswordForm } from "./components/ChangePassword";
import { UserLayout } from "./pages/user/UserLayout ";
import { UserDashboard } from "./pages/user/User_Dashboard";
import { UserNewBooking } from "./pages/user/User_NewBooking";
import { UserAllBookings } from "./pages/user/User_AllBookings";
import { UserSupport } from "./pages/user/User_Support";
import { WorkshopLayout } from "./pages/workshop/workshopLayout";
import { WorkshopAllBookings } from "./pages/workshop/WorkshopAllBookings";
import { WorkshopDashboard } from "./pages/workshop/WorkshopDashboard";
import { WorkshopStatusFilteredBookings } from "./pages/workshop/WorkshopStatusFilteredBookings";
export const apiContext = createContext();

function App() {
  // const serverUrl = "http://localhost:4000";
  // const clientUrl = "http://localhost:3000";
  const serverUrl = "https://motorcyclerepair-backend.vercel.app";
  const clientUrl = "https://whimsical-nasturtium-77b914.netlify.app";
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 720 ? true : false
  );
  const contextObj = { serverApi: serverUrl, clientUrl, isMobile };
  // console.log(contextObj);
  function handleResize() {
    window.innerWidth < 720 ? setIsMobile(true) : setIsMobile(false);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
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
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="" element={<UserDashboard />} />
              <Route path="bookNew" element={<UserNewBooking />} />
              <Route path="allBookings" element={<UserAllBookings />} />
              <Route path="support" element={<UserSupport />} />
              {/* <Route path="profile" element={<UserProfile />} /> */}
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/workshop" element={<WorkshopLayout />}>
              <Route index element={<WorkshopDashboard />} />
              <Route path="" element={<WorkshopDashboard />} />
              <Route path="allBookings" element={<WorkshopAllBookings />} />
              <Route
                path="allBookings/:id"
                element={<WorkshopStatusFilteredBookings />}
              />
              <Route path="support" element={<UserSupport />} />
              {/* <Route path="profile" element={<WorkshopProfile />} /> */}
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </apiContext.Provider>
      </div>
    </div>
  );
}

export default App;
