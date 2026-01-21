import { useEffect, useState } from "react"
import OrderContainer from "./extra/OrderContainer"
import axios from "axios";

export default function Page({ loadCart }) {
    const [orders, setOrders] = useState(null)
    async function loadOrders() {
        const response = await axios.get("/api/orders?expand=products")
        setOrders(response.data)
    }
    useEffect(() => {loadOrders()}, []);

    if (!orders) return null


    return Boolean(orders) && (<>
        <link rel="icon" type="image/svg+xml" href="images/orders-favicon.png" />

        <div className="orders-page">
            <div className="page-title">Your Orders</div>

            <div className="orders-grid">
                {orders.map((orderItem) => {
                    return <OrderContainer
                        orderItem={orderItem}
                        loadCart={loadCart}
                        key={orderItem.id}
                    />
                })}
            </div>
        </div>
    </>)
}