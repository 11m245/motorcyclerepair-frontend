import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import { apiContext } from "../../App";
import { useNavigate } from "react-router-dom";

function EditWorkshopProfile({ workshopProfile }) {
  const { serverApi } = useContext(apiContext);
  const navigate = useNavigate();

  const initialValidationSchema = {
    name: yup.string().required(),
    mobile: yup.string().min(10).required(),
    email: yup.string().min(8).email().required(),
    password: yup.string().min(8).required(),
    cpassword: yup
      .string()
      .min(8)
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    address: yup.string().min(10).required(),
    pins: yup.string().min(6).required(),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: workshopProfile,
      validationSchema: yup.object(initialValidationSchema),
      onSubmit: () => updateProfile(values),
      enableReinitialize: true,
      // validateOnChange: true,
      // validateOnBlur: true,
    });

  async function updateProfile(values) {
    const response = await fetch(`${serverApi}/user/updateWorkshopProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
      body: JSON.stringify(values),
    });
    // console.log("profile update response ", response);
    const data = await response.json();
    // console.log("profile update response data", data);
    data.message === "Workshop Updated, use the New credentials for login"
      ? toast.success(data.message)
      : toast.error(data.message);

    navigate("/workshop");
  }
  return (
    <>
      <div className="profile-edit-form-container">
        {/* <h2 className="text-center title-small">Edit User Profile Form</h2> */}
        <form onSubmit={handleSubmit} className="form edit-profile-form">
          <TextField
            id="name"
            type="text"
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name ? errors.name : null}
          />
          <TextField
            id="mobile"
            type="text"
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobile && Boolean(errors.mobile)}
            helperText={touched.mobile && errors.mobile ? errors.mobile : null}
          />
          <TextField
            id="email"
            type="text"
            label="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email ? errors.email : null}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
            required
          />
          <TextField
            id="cpassword"
            label="Confirm Password"
            type="password"
            name="cpassword"
            value={values.cpassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.cpassword && Boolean(errors.cpassword)}
            helperText={
              touched.cpassword && errors.cpassword ? errors.cpassword : null
            }
          />
          <TextField
            multiline
            id="address"
            label={values.role === "workshop" ? "Shop Address" : "Address"}
            type="address"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && Boolean(errors.address)}
            helperText={
              touched.address && errors.address ? errors.address : null
            }
          />

          {values.role === "workshop" ? (
            <TextField
              multiline
              id="pins"
              label="Comma Separated Service Pincodes"
              type="pins"
              name="pins"
              value={values.pins}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.pins && Boolean(errors.pins)}
              helperText={touched.pins && errors.pins ? errors.pins : null}
            />
          ) : (
            <TextField
              id="pin"
              label="Pincode"
              type="pin"
              name="pin"
              value={values.pin}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.pin && Boolean(errors.pin)}
              helperText={touched.pin && errors.pin ? errors.pin : null}
            />
          )}
          <Button type="submit" variant="contained">
            Update
          </Button>
        </form>
        {/* <pre>{JSON.stringify(errors)}</pre> */}
      </div>
    </>
  );
}

export { EditWorkshopProfile };
