import { useState } from "react";
import { ForgotForm } from "../components/ForgotForm";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

function Home() {
  const [form, setForm] = useState("login");
  const homeImage = {
    url: "https://cdn3.vectorstock.com/i/1000x1000/33/67/motorcycle-shop-and-service-vector-18913367.jpg",
    name: "MotorCycle Repair Logo",
  };
  return (
    <>
      <div className="homepage-container page">
        <h1 className="text-center title-big">MotorCycle Service App</h1>
        <div className="homepage-body">
          <div className="home-image-container" style={{ alignSelf: "center" }}>
            <img src={homeImage.url} alt={homeImage.name} />
          </div>
          <div className="home-form-container">
            {form === "login" ? (
              <LoginForm form={form} setForm={setForm} />
            ) : form === "signup" ? (
              <SignupForm form={form} setForm={setForm} />
            ) : form === "forgot" ? (
              <ForgotForm form={form} setForm={setForm} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export { Home };
