import { useContext } from "react";
import { userDataContext } from "./UserLayout ";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Rating, TextField } from "@mui/material";
import { useState } from "react";
import { apiContext } from "../../App";
import { toast } from "react-toastify";
import { CustomLoadingButton } from "../../components/customLoadingButton";

function WorkshopSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const { serverApi, isMobile } = useContext(apiContext);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const { workshops, bookingDetails, setBookingDetails, cartDispatch } =
    useContext(userDataContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { vehicleNo: "", vehicleModel: "", remarks: "" },
    onSubmit: (values) => placeServiceRequest(values),
  });

  const placeServiceRequest = async (values) => {
    setIsLoading(true);
    const response = await fetch(`${serverApi}/bookings/new`, {
      method: "POST",
      headers: {
        logintoken: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vehicleModel: values.vehicleModel,
        vehicleNo: values.vehicleNo,
        comments: values.remarks,
        ...bookingDetails,
      }),
    });

    if (response.status === 200) {
      setIsLoading(false);
      const data = await response.json();
      toast.success(data.message);
      cartDispatch({ type: "CLEAR" });
      navigate("/user/allBookings");
    } else {
      setIsLoading(false);
      const data = await response.json();
      toast.error(data.message);
    }
  };
  const handleWorkshopClick = (workshop) => {
    setBookingDetails({
      ...bookingDetails,
      workshopId: workshop._id,
    });
    setSelectedWorkshop(workshop.name);
  };
  return (
    <>
      {workshops.length === 0 ? (
        <p>
          no workshop found for your pincode, sorry for the inconvenience or
          update your correct pin
        </p>
      ) : (
        <div className="workshop-selection-page">
          <h4 className="text-center">Select a Workshop you prefer</h4>
          <div className="workshops-container ">
            {workshops.map((workshop, i) => {
              const { mobile, name, email, address, rating = 2 } = workshop;
              return (
                <button
                  type="button"
                  key={i}
                  className={
                    selectedWorkshop === name
                      ? "workshop-wrapper selectedShop"
                      : "workshop-wrapper"
                  }
                  onClick={() => handleWorkshopClick(workshop)}
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
                  <Rating name="read-only" value={parseInt(rating)} readOnly />
                </button>
              );
            })}
          </div>

          {selectedWorkshop ? (
            <form
              onSubmit={formik.handleSubmit}
              style={isMobile ? { maxWidth: "350px" } : { maxWidth: "500px" }}
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
              <TextField
                // id="vehichle-model"
                label="Remarks"
                variant="outlined"
                name="remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <CustomLoadingButton
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                buttonComponent={
                  <Button type="submit" variant="contained">
                    Book Now
                  </Button>
                }
              />
            </form>
          ) : null}
        </div>
      )}
    </>
  );
}

export { WorkshopSelection };
