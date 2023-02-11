import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { apiContext } from "../../App";
import { MobileFooter } from "../../components/workshop/MobileFooter";
import { MobileHeader } from "../../components/workshop/MobileHeader";
import { PcFooter } from "../../components/workshop/PcFooter";
import { PcHeader } from "../../components/workshop/PcHeader.js";
import "../../user.css";
import "../../workshop.css";

export const workshopDataContext = createContext();
function WorkshopLayout() {
  const { serverApi, isMobile } = useContext(apiContext);
  const [reloadData, setReloadData] = useState(false);

  const [allBookings, setAllBookings] = useState([]);
  const [allServices, setAllServices] = useState([]);

  const dataContextObj = {
    allBookings,
    setAllBookings,
    allServices,
    setAllServices,
    reloadData,
    setReloadData,
  };
  // console.log("data", dataContextObj);

  async function fetchWorkshopBookings() {
    const response = await fetch(`${serverApi}/bookings/workshopBookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setAllBookings(data.payload);
    } else {
      console.log("workshop bookings not fetched");
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

  useEffect(() => {
    fetchWorkshopBookings();
    fetchServices();
  }, [reloadData]);
  return (
    <>
      <workshopDataContext.Provider value={dataContextObj}>
        <div className="workshop-page-container">
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
      </workshopDataContext.Provider>
    </>
  );
}

export { WorkshopLayout };
