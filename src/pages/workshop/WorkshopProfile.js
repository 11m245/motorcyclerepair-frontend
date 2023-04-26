import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { apiContext } from "../../App";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { EditWorkshopProfile } from "./EditWorkshopProfile.js";

function WorkshopProfile() {
  const { serverApi } = useContext(apiContext);
  const [workshopProfile, setWorkshopProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  async function fetchWorkshopProfile() {
    const response = await fetch(`${serverApi}/user/profile`, {
      method: "GET",
      headers: {
        logintoken: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      // console.log(data.message);
      setWorkshopProfile(data.payload);
    } else {
      const data = await response.json();
      console.log(data.message);
    }
  }

  useEffect(() => {
    fetchWorkshopProfile();
  }, []);
  return (
    <>
      <div className="profile-page-container">
        <div className="profile-head-container d-flex justify-content-center">
          <h1 className="text-center">My Profile</h1>
          <IconButton
            onClick={() => setEditMode(!editMode)}
            color="secondary"
            aria-label="add an alarm"
          >
            <EditIcon />
          </IconButton>
        </div>
        {editMode ? (
          <EditWorkshopProfile workshopProfile={workshopProfile} />
        ) : (
          <ViewWorkshopProfile workshopProfile={workshopProfile} />
        )}
        {/* <pre>{JSON.stringify(userProfile)}</pre> */}
      </div>
    </>
  );
}

function ViewWorkshopProfile({ workshopProfile }) {
  return (
    <div className="view-profile-container">
      <div className="credentials-wrapper">
        <p>Name : {workshopProfile?.name}</p>
        <p>email : {workshopProfile?.email}</p>
        <p>Password ***</p>
      </div>
      <div className="contacts-wrapper">
        <p>Mobile : {workshopProfile?.mobile}</p>
        <p>Address : {workshopProfile?.address}</p>
        <p
          style={{
            wordWrap: "break-word",
          }}
        >
          Pincodes : {workshopProfile?.pins.join(",")}
        </p>
      </div>
    </div>
  );
}

export { WorkshopProfile };
