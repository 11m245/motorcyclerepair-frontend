import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
function CustomLoadingButton({ isLoading, setIsLoading, buttonComponent }) {
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, [isLoading]);
  return (
    <>
      {isLoading ? (
        <div className="loading-conatiner d-flex justify-content-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        buttonComponent
      )}
    </>
  );
}

export { CustomLoadingButton };
