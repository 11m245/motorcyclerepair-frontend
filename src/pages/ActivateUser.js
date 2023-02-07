import { CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiContext } from "../App";

function ActivateUser() {
  const { id } = useParams();
  const { serverApi, clientUrl } = useContext(apiContext);
  const navigate = useNavigate();

  const activateUser = async () => {
    const response = await fetch(`${serverApi}/user/activate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        activationtoken: id,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      toast.success(data.message);
      navigate(clientUrl);
      //   window.location.href = clientUrl;
    } else {
      const data = await response.json();

      toast.error(data.message);
      navigate(clientUrl);
      //   window.location.href = clientUrl;
    }
  };

  useEffect(() => {
    activateUser();
  }, []);
  return (
    <>
      <h1 className="text-center"> Please wait Activating... </h1>
      <CircularProgress
        style={{
          margin: "0 auto",
          width: "50px",
          height: "50px",
          display: "block",
        }}
        color="success"
      />
    </>
  );
}

export { ActivateUser };
