import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "./Page";
import axios from "axios";
import { MemoryRouter } from "react-router";
vi.mock("axios")

describe("Home Page component", ()=>{
    let loadCart;
    let user;
    beforeEach(()=>{
        loadCart = vi.fn();
        axios.get.mockImplementation( async (urlPath)=>{
            if(urlPath !== "/api/products") return null
            return {
                data: [
                    {
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        rating: {
                        stars: 4.5,
                        count: 87
                        },
                        priceCents: 1090,
                        keywords: ["socks", "sports", "apparel"]
                    },
                    {
                        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        image: "images/products/intermediate-composite-basketball.jpg",
                        name: "Intermediate Size Basketball",
                        rating: {
                        stars: 4,
                        count: 127
                        },
                        priceCents: 2095,
                        keywords: ["sports", "basketballs"]
                    },
                    {
                        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
                        name: "Adults Plain Cotton T-Shirt - 2 Pack",
                        rating: {
                        stars: 4.5,
                        count: 56
                        },
                        priceCents: 799,
                        keywords: ["tshirts", "apparel", "mens"]
                    },
                ]
            }
        });
        user = userEvent.setup()
    });

    it("displays the products correctly", async ()=>{
        render(<MemoryRouter>
            <Page cart={[]} loadCart={loadCart} />
        </MemoryRouter>
        )
        
        const productContainers = await screen.findAllByTestId("product-container")

        expect(productContainers.length).toBe(3)

        expect(
            within(productContainers[0]).getByText(
                "Black and Gray Athletic Cotton Socks - 6 Pairs")
        )

        expect(
            within(productContainers[1]).getByText(
                "Intermediate Size Basketball")
        )

        expect(
            within(productContainers[2]).getByText(
                "Adults Plain Cotton T-Shirt - 2 Pack")
        )
    });

    // it("activates the addToCart button correctly", async ()=>{
    //     render(<MemoryRouter>
    //         <Page cart={[]} loadCart={loadCart} />
    //     </MemoryRouter>
    //     )
        
    //     const productContainers = await screen.findAllByTestId("product-container")
    //     const addToCartBtt1 = within(productContainers[0]).getByTestId("add-to-cart-button")
    //     const addToCartBtt2 = within(productContainers[1]).getByTestId("add-to-cart-button")

    //     await user.click(addToCartBtt1)
    //     await user.click(addToCartBtt2)

    //     expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
    //         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //         quantity: 1
    //     })

    //     expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
    //         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    //         quantity: 1
    //     })

    //     expect(loadCart).toHaveBeenCalledTimes(2)
    // });

    it("activates the addToCart button with differnt quantities", async ()=>{
        render(<MemoryRouter>
            <Page cart={[]} loadCart={loadCart} />
        </MemoryRouter>
        )
        
        const productContainers = await screen.findAllByTestId("product-container")
        const quantitySelector1 = within(productContainers[0]).getByTestId("quantity-selector")
        const quantitySelector2 = within(productContainers[1]).getByTestId("quantity-selector")
        const addToCartBtt1 = within(productContainers[0]).getByTestId("add-to-cart-button")
        const addToCartBtt2 = within(productContainers[1]).getByTestId("add-to-cart-button")

        await user.selectOptions(quantitySelector1, "2")
        await user.selectOptions(quantitySelector2, "3")

        await user.click(addToCartBtt1)
        await user.click(addToCartBtt2)

        expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2
        })

        expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 3
        })

        expect(loadCart).toHaveBeenCalledTimes(2)
    });
});