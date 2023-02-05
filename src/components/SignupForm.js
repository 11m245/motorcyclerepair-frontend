import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

function SignupForm(props) {
  const { form, setForm } = props;
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
      onSubmit: () => console.log(values),
    });

  return (
    <>
      <div className="signup-form-container">
        <h2 className="text-center title-small">SignupForm</h2>
        <form onSubmit={handleSubmit} className="form signup-form">
          <p className="text-primary">Select your Role</p>
          <RadioGroup
            row
            aria-labelledby="user role radio"
            name="role"
            value={values.role}
            onChange={handleChange}
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
            type="cpassword"
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
            Submit
          </Button>
          <div className="add-menus d-flex justify-content-between">
            <button className="text-danger" onClick={() => setForm("login")}>
              Already Have Account?
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export { SignupForm };
