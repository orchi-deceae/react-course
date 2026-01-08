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

    if (!orderItem) return null

    const product = orderItem.products.find((product)=>{
        return product.productId === productId
    });
    
    const totalDeliveryTimeMs = product.estimatedDeliveryTimeMs - orderItem.orderTimeMs
    const timePassedMs = dayjs().valueOf() - orderItem.orderTimeMs
    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100
    if (deliveryPercent > 100) deliveryPercent = 100

    const isPreparing = deliveryPercent < 33
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100
    const isDelivered = deliveryPercent === 100

    // orderItem.orderTimeMs / 1000 //? First - When you asked
    // product.estimatedDeliveryTimeMs / 1000 //? Second - when it will arrive

    // console.log(dayjs(product.product.createdAt).format("dddd DD MMMM, YYYY"))
    // console.log(dayjs(orderItem.createdAt).format("dddd DD MMMM, YYYY"))
    // console.log(dayjs(orderItem.orderTimeMs).format("dddd DD MMMM, YYYY"))
    // console.log(dayjs(product.estimatedDeliveryTimeMs).format("dddd DD MMMM, YYYY"))

    return (<>
        <link rel="icon" href="images/tracking-favicon.png" />

        <div className="tracking-page">
            <div className="order-tracking">
                <Link className="back-to-orders-link link-primary" to="/orders">
                    View all orders
                </Link>

                <div className="delivery-date">
                    {deliveryPercent >= 100 ? "Delivered " : "Arriving "}
                     on {dayjs(product.estimatedDeliveryTimeMs).format("dddd, MMMM DD")}
                </div>

                <div className="product-info">
                    {product.product.name}
                </div>

                <div className="product-info">
                    Quantity: {product.quantity}
                </div>

                <img className="product-image" src={product.product.image} />

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