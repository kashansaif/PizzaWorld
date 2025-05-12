import { Link } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { useAppSelector } from "../store/hooks";
import { selectCartItem, sumOfAmount } from "../store/CartSlice";
import MenuItem from "../components/MenuItem";

const Cart = () => {
  const cartItems = useAppSelector(selectCartItem());
  const totalPrice = useAppSelector(sumOfAmount());
  return (
    <div className="flex flex-col items-center my-6">
      <BackBtn to={"/menu"}>Back to menu</BackBtn>
      <h2 className="text-3xl">Cart</h2>
      {cartItems.length ? (
        <>
          <ul className="my-4 w-full flex flex-col gap-4">
            {cartItems.map((item) => (
              <li>
                <MenuItem item={item} key={item.id} readonly={true} />
              </li>
            ))}
          </ul>
          <div className="flex text-2xl px-4 w-full font-semibold items-center justify-between">
            <span>Total price</span>
            <span className="text-primary">€{totalPrice}</span>
          </div>
          <Link to={"/checkout"} className="btn btn-primary w-44">
            Checkout
          </Link>
        </>
      ) : (
        <h3 className="text-2xl">No items in the cart</h3>
      )}
    </div>
  );
};

export default Cart;
