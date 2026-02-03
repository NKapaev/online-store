import { useDispatch, useSelector } from "react-redux";
import { calcTotalPrice } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../redux/cartSlice";
import { resetContacts } from "../redux/contactsSlice";

export default function ResultPage() {
  const {
    contacts: { firstName, lastName, email, phone },
    shipment: { address, apartment, city, state, zipCode, country },
    orderId,
    orderDate,
  } = useSelector((state) => state.contacts);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="result-section">
      <div className="container">
        <div className="result-image-container">
          <img src="./images/order-check-icon.svg" alt="" />
        </div>
        <h2 className="title result-section-title">
          Thank you for your order!
        </h2>
        <p className="confirmation-message">
          The order confirmation email with details of your order and a link to
          track its progress has been sent to your email address.
        </p>

        <p className="bold-text">Your order # is {orderId} - PENDING</p>

        <p className="order-date-message">
          Order Date:{" "}
          {`${orderDate.orderDay} ${orderDate.orderMonth} ${orderDate.orderYear}`}
        </p>

        <div className="contacts-container">
          <div className="white-wrapper result-white-wrapper">
            <h3 className="bold-text result-title contacts-title">
              Contact information
            </h3>
            <p>{`${firstName} ${lastName}`}</p>
            <p>{`${email}`}</p>
            <p>{`${phone}`}</p>
          </div>
          <div className="white-wrapper result-white-wrapper">
            <h3 className="bold-text result-title shipment-title">
              Shipment information
            </h3>
            <p>{`${address} ${apartment ? ", " + apartment : ""}`}</p>
            <p>{`${city}, ${state}, ${zipCode}`}</p>
            <p>{`${country}`}</p>
          </div>
        </div>

        <div className="summary-container">
          <div className="white-wrapper result-white-wrapper">
            <h3 className="bold-text result-title summary-title">
              Order summary
            </h3>

            <ul className="list summary-list">
              {cart.map(({ id, images, title, price, counter }) => (
                <li key={id} className="summary-item">
                  <div className="summary-image-container">
                    <img src={images[0]} alt={title} />
                  </div>
                  <div className="summary-product-description">
                    <p>{title}</p>
                    <p className="summary-product-price">
                      ${price * counter}, {counter} products
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-price-calc-container">
              <div className="total-price-keys">
                <p className="result-total-price-output">Subtotal:</p>
                <p className="result-total-price-output">
                  Shipping & Handling:
                </p>
                <p className="result-total-price-output">Tax:</p>
                <p className="grand-total">Grand Total:</p>
              </div>
              <div className="total-price-values">
                <p className="result-total-price-output">
                  ${calcTotalPrice(cart)}
                </p>
                <p className="result-total-price-output">$0</p>
                <p className="result-total-price-output">$0</p>
                <p className="grand-total">${calcTotalPrice(cart)}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              navigate("/");
              dispatch(resetCart());
              dispatch(resetContacts());
            }}
            className="button link next-step-button"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </section>
  );
}
