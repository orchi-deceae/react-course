import formatCurrency from "../../utils/formatCurrency"
import OrderDetails from "./_OrderDetails"
import dayjs from "dayjs"

export default function OrderContainer({ orderItem }) {
    return (<>
        <div className="order-container">

            <div className="order-header">
                <div className="order-header-left-section">
                    <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{dayjs(orderItem.orderTimeMs).format("MMMM DD")}</div>
                    </div>
                    <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>${formatCurrency(orderItem.totalCostCents)}</div>
                    </div>
                </div>

                <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{orderItem.id}</div>
                </div>
            </div>

            <div className="order-details-grid">
                {orderItem.products.map((orderProduct)=>{
                    return <OrderDetails orderProduct={orderProduct} orderId={orderItem.id} key={orderProduct.productId} />
                })}
            </div>
        </div>
    </>)
}