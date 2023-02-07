import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { apiContext } from "../App";
import { Link, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export function ChangePasswordForm() {
  const { id } = useParams();
  const { serverApi } = useContext(apiContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("user");
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const navigate = useNavigate();
  // console.log(serverApi);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: email,
        password: "",
        cpassword: "",
      },
      enableReinitialize: true,
      validationSchema: yup.object({
        password: yup.string().required().min(8),
        cpassword: yup.string().required().min(8),
      }),
      onSubmit: () => {
        // console.log(values);
        updatePassword(values);
      },
    });

  async function checkPostPasswordResponse(response) {
    const data = await response.json();
    if (response.status === 200) {
      data.message === "Password Change Success"
        ? toast.success(data.message)
        : toast.error(data.message);
      navigate("/");
      return data;
    } else {
      console.log(data.message);
    }
  }
  function updatePassword(values) {
    fetch(`${serverApi}/user/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", resetToken: `${id}` },
      body: JSON.stringify(values),
    })
      .then((response) => checkPostPasswordResponse(response))
      .catch((error) => console.log(error));
  }
  function checkTokenResponse(response) {
    const data = response.json();
    if (response.status === 200) {
      return data;
    } else {
      console.log("error in response got");
    }
  }

  function getUserInfoFromResetToken() {
    if (isApiLoaded === false) {
      fetch(`${serverApi}/user/getInfoFromResetToken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          resetToken: `${id}`,
        },
      })
        .then((response) => checkTokenResponse(response))
        .then((data) => {
          setEmail(data.payload.email);
          setName(data.payload.name);
        })
        .then(setIsApiLoaded(true))
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {
    getUserInfoFromResetToken();
  }, [isApiLoaded]);
  return (
    <>
      <form
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
        className="change-password-form form"
      >
        <h3 className="text-center">Change Password Form</h3>
        <h4 className="text-center">hi, {name}</h4>
        <TextField
          id="email"
          type="text"
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <div className="signup-forgot d-flex justify-content-between">
          <Link to="/signup" className="link-primary">
            Don't have an account? Sign Up
          </Link>
          <Link to="/forgot-password" className="link-danger text-danger">
            ResetPassword
          </Link>
        </div>
      </form>
    </>
  );
}
