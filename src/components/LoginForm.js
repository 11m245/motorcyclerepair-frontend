import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { apiContext } from "../App";

function LoginForm(props) {
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
    const response = await fetch(`${serverApi}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      data.role === "workshop" ? navigate("/workshop") : navigate("/user");
    } else {
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
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <div className="add-menus d-flex justify-content-between">
            <button className="text-danger" onClick={() => setForm("forgot")}>
              Forgot password?
            </button>
            <button className="text-primary" onClick={() => setForm("signup")}>
              Don't have an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export { LoginForm };
