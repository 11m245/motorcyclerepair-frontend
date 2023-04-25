import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DoughnutChart } from "../../components/workshop/DoughnutChart";

import { ReLoad } from "../../components/workshop/ReLoad";

import { workshopDataContext } from "./workshopLayout";
function WorkshopDashboard() {
  const { allBookings } = useContext(workshopDataContext);
  const statusCodeArray = ["00", "01", "02", "03", "04", "05", "06"];

  const doughnutChartData = {
    labels: [
      "Booked",
      "Vehicle Picked",
      "Under Inspection",
      "Inprocess",
      "Delivery Pending",
      "Completed",
      "Cancelled",
    ],
    datasets: [
      {
        label: "# of Bookings",
        data: statusCodeArray.map(
          (code) =>
            allBookings.filter((booking) => booking.statusCode === code).length
        ),

        backgroundColor: [
          "#000",
          "#5bc0de",
          "#f0ad4e",
          "#9FA6B2",
          "#0275d8",
          "#5cb85c",
          "#d9534f",
        ],
        borderColor: [
          "#000",
          "#5bc0de",
          "#f0ad4e",
          "#9FA6B2",
          "#0275d8",
          "#5cb85c",
          "#d9534f",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="all-bookings-page">
        <h5 className="page-title text-center"> Workshop Dashboard</h5>
        <ReLoad />
        <h6 className="text-center">Total Orders : {allBookings.length}</h6>
        <div className="count-cards-container p-3">
          {statusCodeArray.map((code) => (
            <CountCard key={code} code={code} />
          ))}
        </div>
        <div className="doughnut-chart">
          <DoughnutChart data={doughnutChartData} />
        </div>
      </div>
    </>
  );
}

function CountCard(props) {
  const { code } = props;
  const { allBookings } = useContext(workshopDataContext);
  const navigate = useNavigate();

  const bookingStatusCodes = {
    "00": { text: "Booked", bgColor: "#000", path: "00" },
    "01": { text: "Vehicle picked", bgColor: "#5bc0de", path: "00" },
    "02": { text: "Under Inspection", bgColor: "#f0ad4e", path: "00" },
    "03": { text: "Inprocess", bgColor: "#9FA6B2", path: "00" },
    "04": { text: "Delivery Pending", bgColor: "#0275d8" },
    "05": { text: "Completed", bgColor: "#5cb85c", path: "00" },
    "06": { text: "Cancelled", bgColor: "#d9534f", path: "00" },
  };

  return (
    <>
      <button
        type="button"
        style={{
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: bookingStatusCodes[code].bgColor,
          borderRadius: "5px",
        }}
        className="booking-count-card-wrapper "
        onClick={() => navigate(`allBookings/${code}`)}
      >
        <p
          style={{
            backgroundColor: bookingStatusCodes[code].bgColor,
          }}
          className="booking-count text-center d-block"
        >
          {allBookings.filter((booking) => booking.statusCode === code).length}
        </p>
        <p className=" text-center">{bookingStatusCodes[code].text}</p>
      </button>
    </>
  );
}

export { WorkshopDashboard };
