import axios from "axios";
import formatCurrency from "../../utils/formatCurrency";
import checkmark from "../../../assets/images/icons/checkmark.png"
import { useState } from "react";

export default function ProductGrid({ product, loadCart }) {
    const { id, image, name, priceCents, rating } = product
    const [quantity, setQuantity] = useState(1);
    const [isVisible, setIsVisible] = useState(false)

    async function addToCart() {
        await axios.post("/api/cart-items", {
            productId: id,
            quantity
        });
        loadCart()
        setIsVisible(true)
        setTimeout(()=>setIsVisible(false), 2000)
    }
    function selectedQuantity(ev) {
        const quantitySelected = Number(ev.target.value);
        setQuantity(quantitySelected)
    }
    return (<>
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    data-testid="product-image"
                    src={image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    data-testid="product-rating-stars"
                    src={`images/ratings/rating-${rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary"
                    data-testid="product-rating-count"
                >
                    {rating.count}
                </div>
            </div>

            <div className="product-price">
                ${formatCurrency(priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={selectedQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart"
                style={{opacity: isVisible? 1 : 0}}
            >
                <img src={checkmark} />
                Added
            </div>

            <button
                className="add-to-cart-button button-primary"
                onClick={addToCart}
                data-product-id={id}
            >
                Add to Cart
            </button>
        </div>
    </>)
}