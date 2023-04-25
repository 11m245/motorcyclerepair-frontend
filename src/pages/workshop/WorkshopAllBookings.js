import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiContext } from "../../App";

import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";

import { IconButton } from "@mui/material";
import { workshopDataContext } from "./workshopLayout";
import { ReLoad } from "../../components/workshop/ReLoad";
function WorkshopAllBookings() {
  const { allBookings } = useContext(workshopDataContext);
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

function Booking({ booking }) {
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
    invoiceAmount,
    selectedCartItems,
    comments,
    vehicleModel,
    vehicleNo,
    updatedAt,
    statusCode,
    user,
  } = booking;

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
          <table className="table table-sm table-borderless">
            <thead>
              <tr>
                <th scope="col">Service</th>
                <th scope="col">Qty</th>
                <th scope="col">Charge</th>
              </tr>
            </thead>
            <tbody>
              {selectedCartItems.map((service) => {
                const { name, qty, charge } = service;
                return (
                  <tr key={service._id}>
                    <td>{name}</td>
                    <td className="text-center">{qty}</td>
                    <td className="text-center">Rs. {charge}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="amount d-flex flex-column align-items-center ">
          <p>invoiceAmount</p>
          <p>₹ {invoiceAmount}</p>
        </div>
      </div>
      <div className="section" style={{ borderBottom: "2px solid #1975d2" }}>
        <p>
          comments : <b>{comments}</b>
        </p>
      </div>

      <div className="section3 section d-flex flex-column">
        <p className="text-center fw-bold">{user.name}</p>
        <p className="text-center">{user.address}</p>
        <div className="mobile-wrapper d-flex align-items-center justify-content-center">
          <p className="text-center">{user.mobile}</p>
          <a href={`tel:${user.mobile}`}>
            <IconButton color="primary" aria-label="add to shopping cart">
              <PhoneForwardedIcon />
            </IconButton>
          </a>
        </div>
      </div>

      {/* serviceslist */}
    </div>
  );
}
export { WorkshopAllBookings };
