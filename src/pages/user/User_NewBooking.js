import { useContext, useState } from "react";

import { userDataContext } from "./UserLayout ";

function UserNewBooking() {
  const { allServices, allServiceCategories, cartDispatch } =
    useContext(userDataContext);

  const [filteredServices, setFilteredServices] = useState(allServices);

  const handleAddToCart = (value) => {
    cartDispatch({ type: "ADDED", payload: value });
  };

  return (
    <>
      <div className="booking-page d-flex flex-column w-100">
        <h5 className="page-title text-center"> Select Services</h5>

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
                onClick={() =>
                  setFilteredServices(
                    allServices.filter(
                      (service) => service.category === category.name
                    )
                  )
                }
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
              onClick={() => setFilteredServices(allServices)}
            >
              {"All Services"}
            </button>
          </div>
        </div>

        <div className="services-container mt-2">
          {filteredServices.map((service, i) => {
            return (
              <div
                type="button"
                key={service._id}
                className="service-wrapper"
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
                <p
                  style={{ color: "orange" }}
                  className="serviceName text-center py-2"
                >
                  ₹ {service.charge}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export { UserNewBooking };
