import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

function ForgotForm(props) {
  const { form, setForm } = props;
  const initialValidationSchema = {
    email: yup.string().min(8).email(),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: yup.object(initialValidationSchema),
      onSubmit: () => console.log(values),
    });

  return (
    <>
      <div className="forgot-form-container">
        <h2 className="text-center title-small">Forgot Form</h2>
        <form onSubmit={handleSubmit} className="form forgot-form">
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

          <Button type="submit" variant="contained">
            Reset Password
          </Button>
          <div className="add-menus d-flex justify-content-between">
            <button className="text-danger" onClick={() => setForm("login")}>
              Login?
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

export { ForgotForm };
