import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiContext } from "../../App";
import { userDataContext } from "./UserLayout ";

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
      <h1> UserAllBookings</h1>
      <div className="bookings-container  d-grid gap-2">
        {allUserBookings.map((booking) => (
          <Booking key={booking._id} booking={booking} />
        ))}
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
    <div className="booking-wrapper">
      <p>{vehicleNo}</p>
      <p>{vehicleModel}</p>
      <p>Id : {bookingId.slice(-5)}</p>
      <p>description</p>
      <p>{description}</p>
      <p>updated At {new Date(updatedAt).toLocaleString()}</p>
      <p>{`${statusCode} - ${bookingStatusCodes[statusCode].text} `}</p>
      <p>{workshopName}</p>
      <p>{workshopMobile}</p>
      <p>{workshopAddress}</p>
      <p>{serviceCategory}</p>
      {/* serviceslist */}
    </div>
  );
}

export { UserAllBookings };
