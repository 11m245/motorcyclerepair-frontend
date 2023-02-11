import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiContext } from "../../App";
import { ReLoad } from "../../components/workshop/ReLoad";

import { workshopDataContext } from "./workshopLayout";
function WorkshopDashboard() {
  const { serverApi } = useContext(apiContext);
  const { allBookings, setAllBookings } = useContext(workshopDataContext);
  const statusCodeArray = ["00", "01", "02", "03", "04", "05", "06"];
  return (
    <>
      <div className="all-bookings-page">
        <h5 className="page-title text-center"> Workshop Dashboard</h5>
        <ReLoad />
        <h6 className="text-center">Total Orders : {allBookings.length}</h6>
        <div className="count-cards-container p-3">
          {statusCodeArray.map((code) => (
            <CountCard code={code} />
          ))}
        </div>
      </div>
    </>
  );
}

function CountCard(props) {
  const { code } = props;
  const { allBookings } = useContext(workshopDataContext);

  const bookingStatusCodes = {
    "00": { text: "Booked", bgColor: "#000" },
    "01": { text: "Vehicle picked", bgColor: "#5bc0de" },
    "02": { text: "Under Inspection", bgColor: "#f0ad4e" },
    "03": { text: "Inprocess", bgColor: "#9FA6B2" },
    "04": { text: "Delivery Pending", bgColor: "#0275d8" },
    "05": { text: "Completed", bgColor: "#5cb85c" },
    "06": { text: "Cancelled", bgColor: "#d9534f" },
  };

  return (
    <>
      <div
        style={{
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: bookingStatusCodes[code].bgColor,
          borderRadius: "5px",
        }}
        className="booking-count-card-wrapper "
      >
        <span
          style={{ backgroundColor: bookingStatusCodes[code].bgColor }}
          className="booking-count text-center d-block"
        >
          {allBookings.filter((booking) => booking.statusCode === code).length}
        </span>
        <p className=" text-center">{bookingStatusCodes[code].text}</p>
      </div>
    </>
  );
}
export { WorkshopDashboard };
