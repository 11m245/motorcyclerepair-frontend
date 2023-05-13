import { useState } from "react";
import { ForgotForm } from "../components/ForgotForm";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

function Home() {
  const [form, setForm] = useState("login");
  const homeImage = {
    url: "https://media.istockphoto.com/id/614415432/photo/this-bike-will-be-perfect.jpg?s=612x612&w=0&k=20&c=ocm2We_PX3gWAz5UtdHlC2Ns5L43_A-OAK2a1jtnBV0=",
    name: "MotorCycle Repair Logo",
  };
  return (
    <>
      <div className="homepage-container page">
        <h1 className="text-center title-big">Moto Service App</h1>
        <div className="homepage-body p-1">
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
