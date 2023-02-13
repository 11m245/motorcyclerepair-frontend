import { Button, IconButton } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { workshopDataContext } from "./workshopLayout";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { ReLoad } from "../../components/workshop/ReLoad";
import { apiContext } from "../../App";
import { toast } from "react-toastify";

function WorkshopStatusFilteredBookings() {
  const { id } = useParams();
  //   console.log("params id", id);
  const { allBookings, allServices } = useContext(workshopDataContext);
  const bookingStatusCodes = {
    "00": { text: "Booked", color: "#000" },
    "01": { text: "Vehicle picked", color: "#5bc0de" },
    "02": { text: "Under Inspection", color: "#f0ad4e" },
    "03": { text: "Inprocess", color: "#0275d8" },
    "04": { text: "Repair Done Delivery Pending", color: "#0275d8" },
    "05": { text: "Delivered-complete", color: "#5cb85c" },
    "06": { text: "Cancelled", color: "#d9534f" },
  };
  return (
    <>
      <div className="filtered-bookings-page-container">
        <h1 className="text-center">{bookingStatusCodes[id].text}</h1>
        <ReLoad />
        <div className="filtered-bookings-container">
          {allBookings
            .filter((booking) => booking.statusCode === id)
            .map((booking) => (
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
      <StatusUpdateButtons booking={booking} />
    </div>
  );
}

function StatusUpdateButtons({ booking }) {
  const statusCodeArray = ["00", "01", "02", "03", "04", "05", "06"];
  return (
    <>
      <h6 className="text-center text-success text-decoration-underline">
        update Status
      </h6>
      <div className="statuses-container">
        {statusCodeArray.map((statusCode, i) => (
          <StatusButton
            key={i}
            statusCode={statusCode}
            index={i}
            bookingId={booking._id}
          />
        ))}
      </div>
    </>
  );
}

function StatusButton(props) {
  const { statusCode, index, bookingId } = props;
  const { serverApi } = useContext(apiContext);
  const bookingStatusCodes = {
    "00": { text: "Booked", bgColor: "#000", path: "00" },
    "01": { text: "Vehicle picked", bgColor: "#5bc0de", path: "00" },
    "02": { text: "Under Inspection", bgColor: "#f0ad4e", path: "00" },
    "03": { text: "Inprocess", bgColor: "#9FA6B2", path: "00" },
    "04": { text: "Delivery Pending", bgColor: "#0275d8" },
    "05": { text: "Completed", bgColor: "#5cb85c", path: "00" },
    "06": { text: "Cancelled", bgColor: "#d9534f", path: "00" },
  };

  async function updateStatus(statusCode, bookingId) {
    const updateStatusResponse = await fetch(
      `${serverApi}/bookings/updateStatus/${statusCode}`,
      {
        method: "POST",
        headers: {
          logintoken: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId: bookingId }),
      }
    );

    if (updateStatusResponse.status === 200) {
      const data = await updateStatusResponse.json();
      toast.success(data.message);
    } else {
      const data = await updateStatusResponse.json();
      toast.error(data.message);
    }
  }
  return (
    <Button
      size="small"
      sx={{
        backgroundColor: bookingStatusCodes[statusCode].bgColor,
        color: "#FFF",
        fontWeight: "bold",
        "&:hover": {
          outline: "2px solid yellow!important",
        },
      }}
      variant="contained"
      onClick={() => updateStatus(statusCode, bookingId)}
    >
      {statusCode}-{bookingStatusCodes[statusCode].text}
    </Button>
  );
}

export { WorkshopStatusFilteredBookings };
