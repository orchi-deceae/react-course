import axios from "axios"
import CartItemContainer from "./extra/cartItemContainer"
import PaymentSummary from "./extra/PaymentSummary"
import { useEffect, useState } from "react";

export default function Page({ cart, loadCart }){
    const [paymentSummary, setPaymentSummary] = useState(null)
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    async function loadPaymentSummary(){
        const response = await axios.get("/api/payment-summary")
        setPaymentSummary(response.data)
    }
    async function loadDeliveryOptions(){
        const response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
        setDeliveryOptions(response.data)
    }
    useEffect(() => {loadPaymentSummary()}, [cart]);
    useEffect(()=>{loadDeliveryOptions()}, [])

    if (!paymentSummary) return null
    if (!deliveryOptions) return null

    return (<>
        <link rel="icon" type="image/svg+xml" href="images/cart-favicon.png" />
    
        <div className="checkout-page">
            <div className="page-title">Review your order</div>

            <div className="checkout-grid">
                <div className="order-summary">
                    {cart.map((cartItem)=>{
                        return <CartItemContainer 
                            cartItem={cartItem} 
                            loadCart={loadCart}
                            deliveryOptions={deliveryOptions}
                            key={cartItem.id} 
                        />
                    })}
                </div>

                <PaymentSummary 
                    loadCart={loadCart} 
                    paymentSummary={paymentSummary}
                />
            </div>
        </div>
    </>)
}
