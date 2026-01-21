import formatCurrency from '../../utils/formatCurrency'
import DeliveryOption from './_DeliveryOption';
import DeliveryDate from './_DeliveryDate';
import axios from 'axios';
import { useState } from 'react';

export default function CartItemContainer({ cartItem, loadCart, deliveryOptions }) {
    const [isUpdated, setIsUpdated] = useState(false)
    const [quantity, setQuantity] = useState(cartItem.quantity)
    async function deleteCartItem(){
        await axios.delete(`/api/cart-items/${cartItem.productId}`)
        loadCart()
    }
    function update() {
        axios.put(`/api/cart-items/${cartItem.productId}`, {quantity})
        setIsUpdated(false)
        loadCart()
    }
    function specialEvents(ev){
        console.log(typeof ev.key)
        if (ev.key === "Enter") update()
        if (ev.key === "Escape") {
            setQuantity(cartItem.quantity)
            setIsUpdated(false)
        }
    }
    
    return Boolean(deliveryOptions.length) && (<>
        <div className="cart-item-container">
            <DeliveryDate 
                deliveryOptions={deliveryOptions} 
                cartItem={cartItem} 
            />

            <div className="cart-item-details-grid">
                <img className="product-image"
                    src={cartItem.product.image} />

                <div className="cart-item-details">
                    <div className="product-name">
                        {cartItem.product.name}
                    </div>
                    <div className="product-price">
                        ${formatCurrency(cartItem.product.priceCents)}
                    </div>
                    <div className="product-quantity">
                        <span>
                            Quantity: 
                            {isUpdated ? 
                                (<input 
                                    type="text" 
                                    value={quantity}
                                    className="quantity-input-"
                                    onKeyDown={specialEvents}
                                    onChange={(ev)=>{setQuantity(Number(ev.target.value))}}
                                />)
                                :
                                (<span className="quantity-label">{cartItem.quantity}</span>)
                            }
                        </span>
                        <span className="update-quantity-link link-primary"
                            onClick={()=>!isUpdated ? setIsUpdated(true) : update()}
                        >
                            Update
                        </span>
                        <span className="delete-quantity-link link-primary"
                            onClick={deleteCartItem}
                        >
                            Delete
                        </span>
                    </div>
                </div>

                <div className="delivery-options">
                    <div className="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    {deliveryOptions.map((deliveryOption)=>{
                        return <DeliveryOption 
                            deliveryOption={deliveryOption} 
                            cartItem={cartItem}
                            loadCart={loadCart}
                            key={deliveryOption.id}
                         />
                    })}
                </div>
            </div>
        </div>
    </>)
}