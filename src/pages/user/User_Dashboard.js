import ImageSliderCarousel from "../../components/user/ImageSlider";

// import { userDataContext } from "./UserLayout ";

function UserDashboard() {
  // const userData = useContext(userDataContext);
  // console.log("data ctx", userData);
  const images = [
    {
      name: "image1",
      url: "https://image.similarpng.com/very-thumbnail/2020/08/Car-service-center-advertisement-Premium-vector-PNG.png",
    },
    { url: "https://repairs24.in/assets/img/home/bike2.jpg", name: "image2" },
    {
      name: "image3",
      url: "https://lh6.googleusercontent.com/7lLObL4ZHfXzQYQ8hxRX8vnTkf6EMurQ09jwxrAZCdyfPC6EfStUom49k2CdgsMevMcgVz2nmKFrh4BdiTCaVMZJcbzlN8IVvMi6e1KUEcibBV1x5on9RsQ9T_yxBIEA6y3wliOO",
    },
    {
      name: "image4",
      url: "https://media.istockphoto.com/id/614415432/photo/this-bike-will-be-perfect.jpg?s=612x612&w=0&k=20&c=ocm2We_PX3gWAz5UtdHlC2Ns5L43_A-OAK2a1jtnBV0=",
    },
    {
      name: "image5",
      url: "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20171122115622_1--Main-Image-copy.jpg&w=700&q=90&c=1",
    },
    {
      name: "image6",
      url: "https://bikeadvice.in/wp-content/uploads/2020/07/Royal-Enfield-Service-on-Wheels-2-1280x720.jpeg",
    },
    {
      name: "image7",
      url: "https://www.oillubesystems.com/images-new/two-wheeler-garage-equipments/heavy-duty-bike-service-lif.jpg",
    },
  ];
  return (
    <>
      <div className="user-dashboard-page">
        <h5 className="page-title text-center"> User Dashboard</h5>
        <div className="body-container">
          <div className="image-slider-container">
            <ImageSliderCarousel images={images} />
          </div>
        </div>
      </div>
    </>
  );
}

export { UserDashboard };
