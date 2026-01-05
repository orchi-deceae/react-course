import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../utils/data";
import dayjs from "dayjs";

export default function Page() {
    const [orderItem, setOrderItem] = useState(null)
    const { orderId, productId } = useParams()
    
    useEffect(()=>{
        api(setOrderItem, `orders/${orderId}`)
    }, [orderId]);

    let orderProduct
    if (orderItem) orderProduct = orderItem.products.find((product)=>{
        return product.productId === productId
    });
    let deliveryPercent
    if (orderItem) {
        const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - orderItem.orderTimeMs
        const timePassedMs = dayjs().valueOf() - orderItem.orderTimeMs
        deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100
        if (deliveryPercent > 100) deliveryPercent = 100
    }
    let isPreparing, isShipped, isDelivered
    if (orderItem) {
        if (deliveryPercent < 33) isPreparing = true
        else if (deliveryPercent < 100) isShipped = true
        else isDelivered = true
       
    }

    return Boolean(orderItem) && (<>
        <link rel="icon" href="images/tracking-favicon.png" />

        <div className="tracking-page">
            <div className="order-tracking">
                <Link className="back-to-orders-link link-primary" to="/orders">
                    View all orders
                </Link>

                <div className="delivery-date">
                    {deliveryPercent >= 100 ? "Delivered " : "Arriving "}
                     on {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM DD")}
                </div>

                <div className="product-info">
                    {orderProduct.product.name}
                </div>

                <div className="product-info">
                    Quantity: {orderProduct.quantity}
                </div>

                <img className="product-image" src={orderProduct.product.image} />

                <div className="progress-labels-container">
                    <div className={`progress-label ${isPreparing && "current-status"}`}>
                        Preparing
                    </div>
                    <div className={`progress-label ${isShipped && "current-status"}`}>
                        Shipped
                    </div>
                    <div className={`progress-label ${isDelivered && "current-status"}`}>
                        Delivered
                    </div>
                </div>

                <div className="progress-bar-container">
                    <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
                </div>
            </div>
        </div>
    </>)
}