import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiContext } from "../../App";
import { userDataContext } from "./UserLayout ";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

function UserAllBookings() {
  const { serverApi } = useContext(apiContext);
  const [allUserBookings, setAllUserBookings] = useState([]);

  async function getBookings() {
    const response = await fetch(`${serverApi}/bookings/getAllUserBookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setAllUserBookings(data.payload);
    } else {
      const data = await response.json();
      toast.error(data.message);
    }
  }
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <>
      <div className="all-bookings-page">
        <h5 className="page-title text-center"> UserAllBookings</h5>
        <div className="bookings-container   p-3">
          {allUserBookings.map((booking) => (
            <Booking key={booking._id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
}

function Booking(props) {
  const { booking } = props;
  const { allServices } = useContext(userDataContext);
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
    workshop,
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

  const {
    name: workshopName,
    mobile: workshopMobile,
    address: workshopAddress,
  } = workshop[0];
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

      <p className="text-center fw-bold">{workshopName}</p>
      <p className="text-center">{workshopAddress}</p>
      <div className="mobile-wrapper d-flex align-items-center justify-content-center">
        <p className="text-center">{workshopMobile}</p>
        <a href={`tel:${workshopMobile}`}>
          <IconButton color="primary" aria-label="add to shopping cart">
            <PhoneForwardedIcon />
          </IconButton>
        </a>
      </div>
      {/* serviceslist */}
    </div>
  );
}

export { UserAllBookings };
