import { useEffect, useState } from "react"
import OrderContainer from "./extra/OrderContainer"
import api from "../utils/data";

export default function Page() {
    const [orders, setOrders] = useState(null)
    useEffect(() => {api(setOrders, "orders")}, [orders]);

    return Boolean(orders) && (<>
        <link rel="icon" type="image/svg+xml" href="images/orders-favicon.png" />

        <div className="orders-page">
            <div className="page-title">Your Orders</div>

            <div className="orders-grid">
                {orders.map((orderItem) => {
                    return <OrderContainer orderItem={orderItem} key={orderItem.id} />
                })}
            </div>
        </div>
    </>)
}