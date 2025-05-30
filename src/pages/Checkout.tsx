import "react-credit-cards-2/dist/es/styles-compiled.css";
import BackBtn from "../components/BackBtn";
import CreditCard from "../components/CreditCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetCart, selectCartItem, sumOfAmount } from "../store/CartSlice";
import { createOrder } from "../store/oderSlice";
import { createOrderId } from "../utils/order-utils";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useAppSelector(selectCartItem());
  const totalPrice = useAppSelector(sumOfAmount());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="my-6">
      <BackBtn to={"/cart"}>Back to cart</BackBtn>
      <h2 className="text-3xl my-4 text-center">CheckOut</h2>
      {cartItems.length ? (
        <div className="grid grid-cols-1 my-4 p-4 md:grid-cols-2 gap-8 card bg-base-300 shadow-xl">
          <section>
            <h2 className="text-2xl w-full text-center mb-4 card-title block">Order Summary</h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.price * item.quantity}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td>Subtotal: </td>
                    <td></td>
                    <td></td>
                    <td>€{totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <h2 className="text-2xl mb-4 card-title w-full block text-center">Payment Details</h2>
            <CreditCard
              submitHandler={(state) => {
                const orderId = createOrderId();
                dispatch(
                  createOrder({
                    id: orderId,
                    items: cartItems,
                    total: totalPrice,
                    creditCardNum: state.number,
                    state: "pending",
                  })
                );
                dispatch(resetCart());
                navigate(`/order/${orderId}`);
              }}
            />
          </section>
        </div>
      ) : (
        <h3 className="text-2xl text-center">No items in the cart</h3>
      )}
    </div>
  );
};

export default Checkout;
