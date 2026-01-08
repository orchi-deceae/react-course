import formatCurrency from "../../utils/formatCurrency";
import dayjs from 'dayjs'

export default function DeliveryOption({ deliveryOption, cartItem }) {
    const deliveryDate = dayjs(deliveryOption.estimatedDeliveryTimeMs)
    const isChecked =  deliveryOption.id == cartItem.deliveryOptionId

    return (<>
        <div className="delivery-option">
            <input type="radio" checked={isChecked}
                className="delivery-option-input"
                name={`delivery-option-${deliveryOption.id}`} />
            <div>
                <div className="delivery-option-date">
                    {deliveryDate.format('dddd, MMMM DD')}
                </div>
                <div className="delivery-option-price">
                    {
                    !deliveryOption.priceCents ? "FREE Shipping" 
                     : 
                    `$${formatCurrency(deliveryOption.priceCents)} - Shipping`
                    }
                </div>
            </div>
        </div>
    </>)
}