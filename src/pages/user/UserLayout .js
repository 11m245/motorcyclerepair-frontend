import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { apiContext } from "../../App";
import { MobileFooter } from "../../components/user/MobileFooter";
import { MobileHeader } from "../../components/user/MobileHeader";
import { PcFooter } from "../../components/user/PcFooter";
import { PcHeader } from "../../components/user/PcHeader.js";
import "../../user.css";

function UserLayout() {
  const { isMobile } = useContext(apiContext);
  return (
    <>
      <div className="user-page-container">
        <header className="header">
          {isMobile ? <MobileHeader /> : <PcHeader />}
        </header>
        <main className="body page-content-container">
          {isMobile ? "Mobile" : "PC"}
          <Outlet />
        </main>
        <footer className="footer ">
          {isMobile ? <MobileFooter /> : <PcFooter />}
        </footer>
      </div>
    </>
  );
}

export { UserLayout };
