import SettingsPhoneIcon from "@mui/icons-material/SettingsPhone";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
function UserSupport() {
  return (
    <>
      <div className="support-page">
        <h5 className="page-title text-center"> User Support</h5>
        <div className="support-body-content px-2 ">
          <div className="customer-care-wrapper">
            <div className="care-content mx-auto">
              <h4 className="text-center">CONTACT US</h4>
              <p className="text-center">
                we are here to help you on just a click
              </p>
              <p className="text-center  ">
                Phone :
                <a
                  style={{ color: "black", fontWeight: "bold" }}
                  href={"tel:04348-296822"}
                >
                  {"04348-296822"}
                </a>
              </p>
              <p className="text-center ">
                Mail :
                <a
                  style={{ color: "black", fontWeight: "bold" }}
                  href={"mailto:care@nbi.in"}
                >
                  {"care@nbi.in"}
                </a>
              </p>
            </div>
            <img
              style={{ borderRadius: "20px" }}
              width={"100%"}
              src="https://media.istockphoto.com/id/1308610989/photo/shot-of-a-young-female-call-center-agent-working-in-office-stock-photo.jpg?s=612x612&w=0&k=20&c=VuZKacVVEPw0M_AtoBgdC-nFVvJBqvQYKcjFAdN6C7c="
              alt="customercare"
            />
          </div>
          <h3 className="text-center">Our Office</h3>
          <div className="office-care-wrapper">
            <div className="phone-wrapper section">
              <div className="title-wrapper">
                <SettingsPhoneIcon /> <h5>CALL US</h5>
              </div>
              <div className="content">
                <p>
                  <a
                    style={{ color: "black", fontWeight: "bold" }}
                    href={"tel:04348-298422"}
                  >
                    {"04348-298422"}
                  </a>
                </p>
                <p>
                  <a
                    style={{ color: "black", fontWeight: "bold" }}
                    href={"tel:04348-298423"}
                  >
                    {"04348-298423"}
                  </a>
                </p>
              </div>
            </div>
            <div className="mail-wrapper section">
              <div className="title-wrapper">
                <MarkEmailReadIcon /> <h5>MAIL US</h5>
              </div>
              <div className="content">
                <p>
                  <a
                    style={{ color: "black", fontWeight: "bold" }}
                    href={"mailto:motoservice@nbi.in"}
                  >
                    {"motoservice@nbi.in"}
                  </a>
                </p>
              </div>
            </div>
            <div className="location-wrapper section">
              <div className="title-wrapper">
                <LocationOnIcon /> <h5>OUR MAIN OFFICE</h5>
              </div>
              <div className="content">
                <p>
                  No. 12/22, Palacode, Dharmapuri, Tamilnadu, India, PIN 636808
                </p>
              </div>
            </div>
            <div className="hours-wrapper section">
              <div className="title-wrapper">
                <AccessTimeFilledIcon /> <h5>WORKING HOURS</h5>
              </div>
              <div className="content">
                <p>Mon - Fri ... 10 am - 8 pm</p>
                <p>Sat ... 10 am - 12 pm</p>
                <p>Sun ... Holiday 😊</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { UserSupport };
