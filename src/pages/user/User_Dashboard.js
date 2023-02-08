import { useContext } from "react";
import { userDataContext } from "./UserLayout ";

function UserDashboard() {
  const userData = useContext(userDataContext);
  console.log("data ctx", userData);
  return (
    <>
      <h1> UserDashboard</h1>
    </>
  );
}

export { UserDashboard };
