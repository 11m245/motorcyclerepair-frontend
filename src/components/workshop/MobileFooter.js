import AddTaskIcon from "@mui/icons-material/AddTask";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function MobileFooter() {
  const navItems = [
    // { name: "Book", path: "bookNew", icon: <AddTaskIcon /> },
    { name: "Home", path: "", icon: <HomeIcon /> },
    { name: "Bookings", path: "allBookings", icon: <ListAltIcon /> },
    { name: "Support", path: "support", icon: <SupportAgentIcon /> },
  ];
  const [activeMenu, setActiveMenu] = useState("Home");
  return (
    <>
      <div
        style={{ width: "100%", height: "100%", backgroundColor: "#FFF" }}
        className="mobile-footer-menus-container d-flex justify-content-center gap-1 px-2"
      >
        {navItems.map((item, i) => (
          <FooterMenu
            item={item}
            key={i}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        ))}
      </div>
    </>
  );
}

function FooterMenu(props) {
  const { item, activeMenu, setActiveMenu } = props;
  const { name, path, icon } = item;
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          setActiveMenu(name);
          navigate(path);
        }}
        color={activeMenu === name ? "secondary" : "primary"}
        variant="text"
        className="footer-menu-wrapper d-flex flex-column justify-content-center"
        startIcon={icon}
      >
        {name}
      </Button>
      {/* <div className="footer-menu-wrapper d-flex flex-column justify-content-center">
        <IconButton color="primary" aria-label={`${name} icon`}>
          {icon}
        </IconButton>
        {activeMenu === name ? <p>{name}</p> : null}
      </div> */}
    </>
  );
}

export { MobileFooter };
