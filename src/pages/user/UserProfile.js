import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { apiContext } from "../../App";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { EditUserProfile } from "../user/EditUserProfile.js";

import { toast } from "react-toastify";

function UserProfile() {
  const { serverApi } = useContext(apiContext);
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  async function fetchUserProfile() {
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
      setUserProfile(data.payload);
      // toast.success(data.message);
    } else {
      const data = await response.json();
      toast.error(data.message);
      // console.log(data.message);
    }
  }

  useEffect(() => {
    fetchUserProfile();
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
          <EditUserProfile userProfile={userProfile} />
        ) : (
          <ViewUserProfile userProfile={userProfile} />
        )}
        {/* <pre>{JSON.stringify(userProfile)}</pre> */}
      </div>
    </>
  );
}

function ViewUserProfile({ userProfile }) {
  return (
    <div className="view-profile-container">
      <div className="credentials-wrapper">
        <p>Name : {userProfile?.name}</p>
        <p>email : {userProfile?.email}</p>
        <p>Password ***</p>
      </div>
      <div className="contacts-wrapper">
        <p>Mobile : {userProfile?.mobile}</p>
        <p>Address : {userProfile?.address}</p>
        <p>Pincode : {userProfile?.pin}</p>
      </div>
    </div>
  );
}

export { UserProfile };
