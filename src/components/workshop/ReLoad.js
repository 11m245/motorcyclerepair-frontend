import { useContext } from "react";
import { workshopDataContext } from "../../pages/workshop/workshopLayout";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";

function ReLoad() {
  const { reloadData, setReloadData } = useContext(workshopDataContext);
  return (
    <>
      <div className="refresh-button-wrapper">
        <IconButton
          onClick={() => {
            setReloadData(!reloadData);
            toast.success("refreshed");
          }}
          color="primary"
          aria-label="reload data"
        >
          <AutorenewIcon />
        </IconButton>
      </div>
    </>
  );
}

export { ReLoad };
