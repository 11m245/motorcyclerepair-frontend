import { useContext, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { IconButton } from "@mui/material";

import { userDataContext } from "./UserLayout ";

function UserNewBooking() {
  const { allServices, allServiceCategories, cartDispatch } =
    useContext(userDataContext);

  const [filteredServices, setFilteredServices] = useState(allServices);
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const handleAddToCart = (value) => {
    cartDispatch({ type: "ADDED", payload: value });
  };

  return (
    <>
      <div className="booking-page d-flex flex-column w-100">
        <h5 className="page-title text-center">Filter Services by Category</h5>

        <div className="service-category-container ">
          <div className="service-categories-container">
            {allServiceCategories.map((category, i) => (
              <button
                key={category._id}
                style={{
                  backgroundColor: i % 2 === 0 ? "green" : "blue",
                  color: "white",
                  padding: "4px 10px",

                  borderRadius: "8px",
                }}
                className="d-block"
                onClick={() => {
                  setSelectedCategory(category.name);
                  setFilteredServices(
                    allServices.filter(
                      (service) => service.category === category.name
                    )
                  );
                }}
              >
                {category.name}
              </button>
            ))}
            <button
              style={{
                backgroundColor: "brown",
                color: "white",
                padding: "4px 10px",
                borderRadius: "8px",
              }}
              className="d-block"
              onClick={() => {
                setFilteredServices(allServices);
                setSelectedCategory("All Services");
              }}
            >
              {"All Services"}
            </button>
          </div>
          <h5 className="page-title text-center">
            {` select from ${selectedCategory}`}
          </h5>
        </div>

        <div className="services-container mt-2">
          {filteredServices.map((service, i) => {
            return (
              <div
                type="button"
                key={service._id}
                className="service-wrapper"
                style={{ padding: "5px 5px 0 5px" }}
                onClick={() => handleAddToCart(service)}
              >
                <img
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                    borderRadius: "10px",
                  }}
                  src={service.imageUrl}
                  alt={service.name}
                />
                <p
                  style={{ fontWeight: "bold" }}
                  className="serviceName text-center py-2"
                >
                  {service.name}
                </p>
                <div className="button-charge d-flex justify-content-between align-items-center">
                  <p
                    style={{
                      color: "#ffc107",
                      fontWeight: "bold",
                    }}
                    className="serviceName text-center py-2"
                  >
                    ₹ {service.charge}
                  </p>
                  <IconButton
                    aria-label="add-cart"
                    sx={{ color: "#0dcaf0" }}
                    // onClick={() => handleAddToCart(service)}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export { UserNewBooking };
