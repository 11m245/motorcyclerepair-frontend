import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";
import { apiContext } from "../App";
import { toast } from "react-toastify";
import { CustomLoadingButton } from "./customLoadingButton";

function SignupForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { serverApi } = useContext(apiContext);
  const { setForm } = props;
  const initialValidationSchema = {
    role: yup.string().required(),
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
    pin: yup.string().min(6),
    pins: yup.string().min(6),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        role: "",
        name: "",
        mobile: "",
        email: "",
        password: "",
        cpassword: "",
        address: "",
        pin: "",
        pins: "",
      },
      validationSchema: yup.object(initialValidationSchema),
      onSubmit: () => signup(values),
    });

  async function signup(values) {
    setIsLoading(true);
    const response = await fetch(`${serverApi}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    // console.log("signup response ", response);
    const data = await response.json();
    // console.log("signup response data", data);
    setIsLoading(false);
    data.message ===
    "User Created, use the Activation link Sent on mail for Activation"
      ? toast.success(data.message)
      : toast.error(data.message);
  }
  return (
    <>
      <div className="signup-form-container">
        <h2 className="text-center title-small">SignupForm</h2>
        <form onSubmit={handleSubmit} className="form signup-form">
          <label className="text-primary">Select your Role</label>
          {touched.role && errors.role ? (
            <p className="text-danger">{errors.role}</p>
          ) : null}
          <RadioGroup
            row
            aria-labelledby="user role radio"
            name="role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.role && Boolean(errors.role)}
            helperText={touched.role && errors.role ? errors.role : null}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel
              value="workshop"
              control={<Radio />}
              label="Workshop"
            />
          </RadioGroup>

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

          <CustomLoadingButton
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            buttonComponent={
              <Button type="submit" variant="contained">
                Signup
              </Button>
            }
          />
          <div className="add-menus d-flex justify-content-between">
            <button
              className="text-danger bg-transparent"
              onClick={() => setForm("login")}
            >
              Already Have Account?
            </button>
          </div>
        </form>
        {/* <pre>{JSON.stringify(errors)}</pre> */}
      </div>
    </>
  );
}

export { SignupForm };
