import { useContext } from "react";
import { userDataContext } from "./UserLayout ";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartServices } = useContext(userDataContext);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const cTotal = cartServices.reduce((acc, cobj) => {
      return acc + parseInt(cobj.charge) * parseInt(cobj.qty);
    }, 0);
    setTotal(cTotal);
  }, [cartServices]);

  return (
    <>
      <div className="cart-page">
        {cartServices.length < 1 ? <NoCartItem /> : <CartItems total={total} />}
      </div>
    </>
  );
}

function NoCartItem() {
  return (
    <div className="no-cart-item-wrapper d-flex justify-content-center">
      <img
        src="https://nakshibanaras.in/assets/images/empty-cart.png"
        alt="no-cart-item"
      />
    </div>
  );
}

function CartItems({ total }) {
  const { cartServices, bookingDetails, setBookingDetails } =
    useContext(userDataContext);
  const navigate = useNavigate();

  const handleCartSubmission = () => {
    setBookingDetails({ ...bookingDetails, selectedCartItems: cartServices });
    navigate("workshop-selection");
  };

  return (
    <>
      <h5 className="page-title text-center">Cart Items</h5>
      <div className="total-check-out d-flex justify-content-center align-items-center gap-4">
        <h5>
          Total : <span style={{ color: "green" }}>Rs. {total}</span>
        </h5>
        <Button
          color="success"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => handleCartSubmission()}
        >
          Select Workshop
        </Button>
      </div>
      <div className="cart-items-container ">
        {cartServices
          .sort((a, b) => a.name - b.name)
          .map((cartService) => (
            <CartItem key={cartService._id} cartService={cartService} />
          ))}
      </div>
    </>
  );
}

function CartItem({ cartService }) {
  const { cartDispatch } = useContext(userDataContext);

  const handleAddToCart = (value) => {
    cartDispatch({ type: "ADDED", payload: value });
  };
  const handleMinusFromCart = (value) => {
    cartDispatch({ type: "REMOVED", payload: value });
  };

  return (
    <div className="cart-item-wrapper">
      <img
        className="cart-item-image"
        src={cartService.imageUrl}
        alt={cartService.name}
      />
      <div className="name-quantity-wrapper ">
        <span className="cart-service-name">{cartService.name}</span>
        <div className="qty-btns ">
          <span>X{cartService.qty}</span>
          <IconButton
            aria-label="add-cart"
            color="success"
            onClick={() => handleAddToCart(cartService)}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton
            aria-label="remove-cart"
            color="secondary"
            onClick={() => handleMinusFromCart(cartService)}
          >
            <RemoveCircleIcon />
          </IconButton>
        </div>
        <span className="cart-service-charge">Rs. {cartService.charge}</span>
      </div>
    </div>
  );
}

export { CartPage };
