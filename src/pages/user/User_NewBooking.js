import { Button, Rating, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { apiContext } from "../../App";
import { userDataContext } from "./UserLayout ";

function UserNewBooking() {
  const { allServiceCategories, allServices, workshops } =
    useContext(userDataContext);
  const [bookingStage, setBookingStage] = useState(0);
  const [currentBooking, setCurrentBooking] = useState({
    category: "",
    services: [],
  });
  const [workshopSelected, setWorkshopSelected] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const symbol = "->";
  return (
    <>
      <div className="booking-page">
        <h5 className="page-title text-center"> User New Service Booking</h5>
        <p style={{ backgroundColor: "green", color: "#FFF" }}>
          {currentBooking?.category} {symbol}
          {currentBooking?.services.join(",")}
          {symbol} {currentBooking?.workshopId}
        </p>
        <div className="booking-body-content px-2">
          {bookingStage === 0 ? <ServiceCategorySelection /> : null}
          {bookingStage === 1 ? <ServicesSelection /> : null}
          {bookingStage === 2 ? <WorkshopSelection /> : null}
        </div>
      </div>
    </>
  );

  function WorkshopSelection() {
    const [selectedWorkshop, setSelectedWorkshop] = useState("");
    const { serverApi } = useContext(apiContext);

    const formik = useFormik({
      initialValues: { vehicleNo: "", vehicleModel: "" },
      onSubmit: (values) => placeServiceRequest(values),
    });

    const placeServiceRequest = async (values) => {
      // console.log("book", currentBooking);
      // console.log(e.target.vehicleModel.value);
      // console.log("value", values);
      const response = await fetch(`${serverApi}/bookings/new`, {
        method: "POST",
        headers: {
          logintoken: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentBooking,
          vehicleModel: values.vehicleModel,
          vehicleNo: values.vehicleNo,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    };

    return (
      <>
        {workshops.lenth === 0 ? (
          <p>
            no workshop found for your pincode, update your correct pin or sorry
            for the inconvenience
          </p>
        ) : (
          <div className="workshop-selection-page">
            <h6>Select a Workshop you prefer</h6>
            <div className="workshops-container ">
              {workshops.map((workshop, i) => {
                const { mobile, name, email, address, rating = 2 } = workshop;
                const handleWorkshopClick = () => {
                  setCurrentBooking({
                    ...currentBooking,
                    workshopId: workshop._id,
                  });
                  setSelectedWorkshop(name);
                };
                return (
                  <div
                    key={i}
                    className={
                      selectedWorkshop === name
                        ? "workshop-wrapper selectedShop"
                        : "workshop-wrapper"
                    }
                    onClick={handleWorkshopClick}
                  >
                    <p
                      style={{ borderBottom: "2px solid" }}
                      className="workshop-name text-center"
                    >
                      {name}
                    </p>
                    <p className="workshop-mobile">{mobile}</p>
                    <p className="workshop-email">{email}</p>
                    <p className="workshop-address">{address}</p>
                    <Rating
                      name="read-only"
                      value={parseInt(rating)}
                      readOnly
                    />
                  </div>
                );
              })}
            </div>
            {true ? (
              <form
                onSubmit={formik.handleSubmit}
                style={{ maxWidth: "500px" }}
                className="mx-auto mt-4 d-flex flex-column gap-2"
              >
                <TextField
                  // id="vehichle-rno"
                  label="Vehicle Reg. No."
                  variant="outlined"
                  name="vehicleNo"
                  value={formik.values.vehicleNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <TextField
                  // id="vehichle-model"
                  label="Vehicle Model"
                  variant="outlined"
                  name="vehicleModel"
                  value={formik.values.vehicleModel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <Button type="submit" variant="contained">
                  Book Now
                </Button>
              </form>
            ) : null}
          </div>
        )}
      </>
    );
  }

  function ServicesSelection() {
    const handleServiceClick = (serviceName) => {
      console.log(serviceName);
      // setBookingStage(2);
      setCurrentBooking({
        ...currentBooking,
        services: [...currentBooking.services, serviceName],
      });

      console.log(currentBooking);
    };
    return (
      <>
        <div className="services-selection-page">
          <h6>Select Required Services</h6>
          <div className="services-container">
            {filteredServices.map((service, i) => {
              return (
                <div
                  key={i}
                  className="service-wrapper d-flex flex-column align-items-center gap-0"
                  onClick={() => handleServiceClick(service.name)}
                >
                  <img
                    style={{
                      width: "100%",
                      aspectRatio: 1,
                      borderRadius: "10px",
                    }}
                    src={service.imageUrl}
                    alt={service.name}
                  />
                  <p style={{}} className="serviceName text-center py-2">
                    {service.name}
                  </p>
                  <p style={{}} className="serviceName text-center py-2">
                    ₹ {service.charge}
                  </p>
                </div>
              );
            })}
          </div>
          {currentBooking.services.length > 0 ? (
            <div className="description-container mx-auto ">
              <TextField
                className="description-input"
                id="outlined-textarea"
                label="Enter Repair Description"
                placeholder="type here"
                multiline
                rows={4}
                onBlur={(e) => {
                  setCurrentBooking({
                    ...currentBooking,
                    description: e.target.value,
                  });
                  setBookingStage(2);
                }}
              />
              <Button variant="contained" onClick={() => setBookingStage(2)}>
                Next
              </Button>
            </div>
          ) : null}
        </div>
      </>
    );
  }

  function ServiceCategorySelection() {
    return (
      <div className="category-selection-page">
        <h6> Select the Service Category</h6>
        <div className="service-categories-container">
          {allServiceCategories.map((serviceCategory) => (
            <ServiceCategoryMenu
              key={serviceCategory._id}
              serviceCategory={serviceCategory}
              setBookingStage={setBookingStage}
              currentBooking={currentBooking}
              setCurrentBooking={setCurrentBooking}
              allServices={allServices}
              setFilteredServices={setFilteredServices}
            />
          ))}
        </div>
      </div>
    );
  }
}

function ServiceCategoryMenu(props) {
  const {
    allServices,
    setFilteredServices,
    serviceCategory,
    setBookingStage,
    currentBooking,
    setCurrentBooking,
  } = props;

  const handleServiceCategoryClick = (categoryName) => {
    setBookingStage(1);
    setCurrentBooking({ ...currentBooking, category: categoryName });
    console.log(currentBooking);
    setFilteredServices(
      allServices.filter((service) => service.category === categoryName)
    );
  };
  return (
    <>
      <div
        className="service-category-wrapper d-flex flex-column align-items-center gap-0"
        onClick={() => handleServiceCategoryClick(serviceCategory.name)}
      >
        <img
          style={{ width: "100%", aspectRatio: 1, borderRadius: "10px" }}
          src={serviceCategory.imageUrl}
          alt={serviceCategory.name}
        />
        <p className="categoryName text-center py-2">{serviceCategory.name}</p>
      </div>
    </>
  );
}
export { UserNewBooking };
