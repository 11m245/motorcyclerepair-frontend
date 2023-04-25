import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";

import { useContext, useEffect, useState } from "react";

import { apiContext } from "../../App";

function MobileHeader() {
  const { serverApi } = useContext(apiContext);
  const [showDropLog, setShowDropLog] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const colors = { backgroundColor: "#1975d2", color: "#fff" };

  async function logout() {
    const response = await fetch(`${serverApi}/user/makeLoginTokenExpire`, {
      method: "POST",
      headers: {
        logintoken: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    // console.log("expire token resp", response);
    localStorage.removeItem("token");
    navigate("/");
  }

  async function fetchUserInfo() {
    const response = await fetch(`${serverApi}/user/getUserNameImage`, {
      method: "GET",
      headers: {
        logintoken: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      setUser(data.payload);
    } else {
      const data = await response.json();
      console.log(data.message);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <>
      <header
        style={{
          height: "60px",
          padding: "2px 5px",
          backgroundColor: colors.backgroundColor,
        }}
        className="header-container d-flex justify-content-between align-items-center "
      >
        <div className="brand">
          <img
            width="80px"
            height={"38px"}
            className="service-icon"
            src="https://static.vecteezy.com/system/resources/thumbnails/002/154/609/small/bike-repair-icon-free-vector.jpg"
            alt="service-icon"
          />
          <h6 style={{ color: colors.color }} className="brand-name">
            Moto Service App
          </h6>
        </div>

        <div
          className="profile-container d-flex justify-content-center flex-column align-items-center position-relative"
          onClick={() => setShowDropLog(!showDropLog)}
          onBlur={() => setShowDropLog(false)}
        >
          <Avatar
            className="profile-pic"
            alt={user?.name}
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            sx={{
              width: 35,
              height: 35,
              minWidth: 35,
              borderRadius: "100vw",
            }}
          />
          <p style={{ color: colors.color }} className="username">
            {user?.name}
          </p>
          {showDropLog ? (
            <div
              style={{ top: "60px", right: "0px", backgroundColor: "#fff" }}
              className="drop-log-out position-absolute drop-down-container"
            >
              <p className="drop-down-item" onClick={() => navigate("profile")}>
                profile
              </p>
              <p className="drop-down-item" onClick={logout}>
                logout
              </p>
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
}

export { MobileHeader };
