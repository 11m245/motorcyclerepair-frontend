import { RepeatOneSharp } from "@mui/icons-material";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { apiContext } from "../../App";
import { MobileFooter } from "../../components/user/MobileFooter";
import { MobileHeader } from "../../components/user/MobileHeader";
import { PcFooter } from "../../components/user/PcFooter";
import { PcHeader } from "../../components/user/PcHeader.js";
import "../../user.css";

export const userDataContext = createContext();
function UserLayout() {
  const { serverApi, isMobile } = useContext(apiContext);
  const nnCtx = useContext(apiContext);

  const [allServiceCategories, setAllServiceCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  const dataContextObj = {
    allServices,
    setAllServices,
    allServiceCategories,
    setAllServiceCategories,
    workshops,
  };
  // console.log("data", dataContextObj);

  async function fetchCategories() {
    const response = await fetch(`${serverApi}/serviceCategories/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      setAllServiceCategories(data.payload);
    } else {
      console.log("categories not fetched");
    }
  }

  async function fetchServices() {
    const response = await fetch(`${serverApi}/services/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setAllServices(data.payload);
    } else {
      console.log("services not fetched");
    }
  }

  async function fetchUserPinWorkshops() {
    const response = await fetch(`${serverApi}/user/pinWorkshop`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setWorkshops(data.payload);
    } else {
      console.log("workshops not fetched");
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchServices();
    fetchUserPinWorkshops();
  }, []);
  return (
    <>
      <userDataContext.Provider value={dataContextObj}>
        <div className="user-page-container">
          <header className="header">
            {isMobile ? <MobileHeader /> : <PcHeader />}
          </header>
          <main className="body page-content-container">
            {/* {isMobile ? "Mobile" : "PC"} */}
            <Outlet />
          </main>
          <footer className="footer ">
            {isMobile ? <MobileFooter /> : <PcFooter />}
          </footer>
        </div>
      </userDataContext.Provider>
    </>
  );
}

export { UserLayout };
