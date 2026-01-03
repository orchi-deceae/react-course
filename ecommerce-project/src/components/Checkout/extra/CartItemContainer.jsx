import { useEffect, useState } from 'react'
import formatCurrency from '../../utils/formatCurrency'
import DeliveryOption from './DeliveryOption';
import axios from 'axios';
import dayjs from 'dayjs';

export default function CartItemContainer({ cartItem }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const selectedDeliveryOption = deliveryOptions.find((deliveryOption)=>{
        return deliveryOption.id === cartItem.deliveryOptionId;
    });
    {                   /*Map version*/
        /* {deliveryOptions.map((deliveryOption)=>{
        if (deliveryOption.id === cartItem.deliveryOptionId) {
            return dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM DD')
        }
        })} */
   }
    useEffect(()=>{
        axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
        .then((response)=>{setDeliveryOptions(response.data)})
    }, [])

    return Boolean(deliveryOptions.length) && (<>
        <div className="cart-item-container">
            <div className="delivery-date">
                Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM DD')}
            </div>

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
                    {/* <div className="delivery-option">
                        <input type="radio" checked
                            className="delivery-option-input"
                            name="delivery-option-1" />
                        <div>
                            <div className="delivery-option-date">
                                {deliveryDate.add(7, 'day').format('dddd, MMMM DD')}
                            </div>
                            <div className="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div className="delivery-option">
                        <input type="radio"
                            className="delivery-option-input"
                            name="delivery-option-1" />
                        <div>
                            <div className="delivery-option-date">
                                {deliveryDate.add(5, 'day').format('dddd, MMMM DD')}
                            </div>
                            <div className="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                        </div>
                    </div>
                    <div className="delivery-option">
                        <input type="radio"
                            className="delivery-option-input"
                            name="delivery-option-1" />
                        <div>
                            <div className="delivery-option-date">
                                {deliveryDate.add(3, 'day').format('dddd, MMMM DD')}
                            </div>
                            <div className="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </>)
}