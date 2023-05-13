import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { apiContext } from "../App";
import { CustomLoadingButton } from "./customLoadingButton";

function LoginForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { setForm } = props;
  const { serverApi } = useContext(apiContext);
  const navigate = useNavigate();
  const initialValidationSchema = {
    email: yup.string().min(8).email(),
    password: yup.string().min(8),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: yup.object(initialValidationSchema),
      onSubmit: () => login(values),
    });

  const login = async (values) => {
    setIsLoading(true);
    const response = await fetch(`${serverApi}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (response.status === 200) {
      setIsLoading(false);
      const data = await response.json();
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      data.role === "workshop" ? navigate("/workshop") : navigate("/user");
    } else {
      setIsLoading(false);
      const data = await response.json();
      toast.error(data.message);
    }
  };
  return (
    <>
      <div className="login-form-container">
        <h2 className="text-center title-small">Login Form</h2>
        <form onSubmit={handleSubmit} className="form login-form">
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

          <CustomLoadingButton
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            buttonComponent={
              <Button type="submit" variant="contained">
                Login
              </Button>
            }
          />
          <div className="add-menus d-flex justify-content-between">
            <button
              className="text-danger bg-transparent"
              onClick={() => setForm("forgot")}
            >
              Forgot password?
            </button>
            <button
              className="text-primary bg-transparent"
              onClick={() => setForm("signup")}
            >
              Don't have an account? Sign Up
            </button>
          </div>
          <div className="demo-login-buttons d-flex justify-content-between">
            <Button
              type="button"
              variant="contained"
              color="success"
              onClick={() =>
                login({ email: "user@gmail.com", password: "12345678" })
              }
            >
              Demo User-Login
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() =>
                login({ email: "admin@gmail.com", password: "12345678" })
              }
            >
              Demo Admin-Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export { LoginForm };
