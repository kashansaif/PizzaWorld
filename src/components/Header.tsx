import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { sumOfAmount, sumOfQty } from "../store/CartSlice";

const Header = () => {
  const myTotalQty = useAppSelector(sumOfQty());
  const totalPrice = useAppSelector(sumOfAmount());
  const [isFocused, setIsFocused] = useState(false);
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  return (
    <div className="navbar bg-primary text-base-100 sticky top-0 z-40 gap-4">
      <Link to={"/"} className="btn btn-ghost text-xl">
        PizzaSpot
      </Link>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          navigate(`/order/${orderId}`);
          setOrderId("");
        }}
        className="flex-1 flex justify-end"
      >
        <input
          name="orderId"
          required
          onChange={(ev) => {
            setOrderId(ev.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          value={orderId}
          placeholder={isFocused ? "Enter order#" : "Find your order"}
          className="input text-neutral-100 input-bordered w-full md:w-auto"
        />
      </form>
      <div className="flex-none">
        {totalPrice ? (
          <div className="font-semibold gap-1 flex">
            <span className="hidden md:flex">Cart total: </span>
            <span>€{totalPrice}</span>{" "}
          </div>
        ) : null}
        <Link to="/cart" tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">{myTotalQty}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
