import CartItemContainer from "./extra/cartItemContainer"
import PaymentSummary from "./extra/PaymentSummary"

export default function Page(){
    return (<>
        <link rel="icon" type="image/svg+xml" href="images/cart-favicon.png" />
    
        <div className="checkout-page">
            <div className="page-title">Review your order</div>

            <div className="checkout-grid">
                <div className="order-summary">
                    {cart.map((cartItem)=>{
                        return <CartItemContainer cartItem={cartItem} key={cartItem.id} />
                    })}
                </div>

                <PaymentSummary />
            </div>
        </div>
    </>)
}
