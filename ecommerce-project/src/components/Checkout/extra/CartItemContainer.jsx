import { useEffect, useState } from 'react'
import formatCurrency from '../../utils/formatCurrency'
import DeliveryOption from './_DeliveryOption';
import DeliveryDate from './_DeliveryDate';
import get from '../../utils/data';

export default function CartItemContainer({ cartItem }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    useEffect(()=>{get("delivery-options", setDeliveryOptions)}, [])

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
                            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                            Update
                        </span>
                        <span className="delete-quantity-link link-primary">
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
                            key={deliveryOption.id}
                         />
                    })}
                </div>
            </div>
        </div>
    </>)
}