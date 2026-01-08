import axios from "axios";
import api from "../../utils/data";
import formatCurrency from "../../utils/formatCurrency";
import checkmark from "../../../assets/images/icons/checkmark.png"
import { useState } from "react";

export default function ProductGrid({ id, image, name, priceCents, rating, setCart }) {
    const [quantity, setQuentity] = useState(0);

    function selectedQuantity(ev) {
        const quantitySelected = Number(ev.target.value);
        setQuentity(quantitySelected)
    }
    async function addToCart() {
        await axios.post("/api/cart-items", {
            productId: id,
            quantity
        });
        await api(setCart, "cart-items")
    }
    return (<>
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    src={image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    src={`images/ratings/rating-${rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatCurrency(priceCents)}
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

            <div className="added-to-cart">
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