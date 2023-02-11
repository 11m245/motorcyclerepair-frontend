import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiContext } from "../../App";

import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";

import { IconButton } from "@mui/material";
import { workshopDataContext } from "./workshopLayout";
import { ReLoad } from "../../components/workshop/ReLoad";
function WorkshopAllBookings() {
  const { serverApi } = useContext(apiContext);
  const { allBookings, setAllBookings } = useContext(workshopDataContext);
  return (
    <>
      <div className="all-bookings-page">
        <h5 className="page-title text-center"> Workshop AllBookings</h5>
        <ReLoad />
        <div className="bookings-container   p-3">
          {allBookings.map((booking) => (
            <Booking key={booking._id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
}

function Booking(props) {
  const { booking } = props;
  const { allBookings, allServices } = useContext(workshopDataContext);

  const bookingStatusCodes = {
    "00": { text: "Booked", color: "#000" },
    "01": { text: "Vehicle picked by Workshop", color: "#5bc0de" },
    "02": { text: "Under Inspection by Workshop", color: "#f0ad4e" },
    "03": { text: "Inprocess", color: "#0275d8" },
    "04": { text: "Repair Done Delivery Pending", color: "#0275d8" },
    "05": { text: "Delivered-complete", color: "#5cb85c" },
    "06": { text: "Cancelled", color: "#d9534f" },
  };
  const {
    _id: bookingId,
    category: serviceCategory,
    services,
    description,
    vehicleModel,
    vehicleNo,
    updatedAt,
    statusCode,
    user,
  } = booking;

  const pricedServices = services.map((service) => {
    return { name: service, price: getServicePrice(service) };
  });

  const total = pricedServices.reduce(
    (acc, cobj) => acc + parseInt(cobj.price),
    0
  );
  // console.log("pricedServices", pricedServices);
  function getServicePrice(serviceName) {
    const pricedService = allServices.find(
      (service) => service.name === serviceName
    );
    return pricedService.charge;
  }

  const { name: userName, mobile: userMobile, address: userAddress } = user[0];
  return (
    <div className="booking-wrapper p-2">
      <div className="section1 section">
        <div className="vehicle-details">
          <p className="fw-bold">{vehicleNo}</p>
          <p>{vehicleModel}</p>
        </div>
        <div className="status text-end">
          <p
            style={{
              color: bookingStatusCodes[statusCode].color,
              fontWeight: "bold",
            }}
          >{`${statusCode} - ${bookingStatusCodes[statusCode].text} `}</p>
          <p>updated At {new Date(updatedAt).toLocaleString()}</p>
          <p>Id : {bookingId.slice(-5)}</p>
        </div>
      </div>
      <div className="section2 section">
        <div className="services">
          <p className="fw-bold">
            <span>{serviceCategory}</span> {"->"}{" "}
            <span>{services.join(",")}</span>
          </p>
          <p>description</p>
          <p>{description}</p>
        </div>
        <div className="amount d-flex flex-column align-items-center ">
          <p>Total</p>
          <p>₹ {total}</p>
        </div>
      </div>

      <p className="text-center fw-bold">{userName}</p>
      <p className="text-center">{userAddress}</p>
      <div className="mobile-wrapper d-flex align-items-center justify-content-center">
        <p className="text-center">{userMobile}</p>
        <a href={`tel:${userMobile}`}>
          <IconButton color="primary" aria-label="add to shopping cart">
            <PhoneForwardedIcon />
          </IconButton>
        </a>
      </div>
      {/* serviceslist */}
    </div>
  );
}
export { WorkshopAllBookings };
