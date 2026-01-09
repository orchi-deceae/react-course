import axios from "axios";
import formatCurrency from "../../utils/formatCurrency";
import dayjs from 'dayjs'

export default function DeliveryOption({ deliveryOption, cartItem }) {
    const deliveryDate = dayjs(deliveryOption.estimatedDeliveryTimeMs)
    const isChecked = deliveryOption.id == cartItem.deliveryOptionId
    async function updateDeliveryOption() {
        await axios.put(`api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id
        })
    }

    return (<>
        <div className="delivery-option" onClick={updateDeliveryOption}>
            <input type="radio" checked={isChecked} onChange={()=>{}}
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