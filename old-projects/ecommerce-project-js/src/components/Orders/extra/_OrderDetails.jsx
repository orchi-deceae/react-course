import { Link } from "react-router";
import { Fragment } from "react";
import buyAgainIcon from "../../../assets/images/icons/buy-again.png"
import dayjs from "dayjs";
import axios from "axios";

export default function OrderDetails({ orderProduct, orderId, loadCart }) {
    async function addToCart() {
        axios.post(`/api/cart-items`, {
            productId: orderProduct.productId,
            quantity: 1
        })
        loadCart()
    }
    return (<Fragment>

        <div className="product-image-container">
            <img src={orderProduct.product.image} />
        </div>

        <div className="product-details">
            <div className="product-name">
                {orderProduct.product.name}
            </div>
            <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM DD")}
            </div>
            <div className="product-quantity">
                Quantity: {orderProduct.quantity}
            </div>
            <button className="buy-again-button button-primary" onClick={addToCart}>
                <img className="buy-again-icon" src={buyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
            </button>
        </div>

        <div className="product-actions">
            <Link to={`/tracking/${orderId}/${orderProduct.productId}`}>
                <button className="track-package-button button-secondary">
                    Track package
                </button>
            </Link>
        </div>

    </Fragment>)
}