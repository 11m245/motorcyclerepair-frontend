import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

function LoginForm(props) {
  const { form, setForm } = props;
  const initialValidationSchema = {
    email: yup.string().min(8).email(),
    password: yup.string().min(8),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: yup.object(initialValidationSchema),
      onSubmit: () => console.log(values),
    });

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
