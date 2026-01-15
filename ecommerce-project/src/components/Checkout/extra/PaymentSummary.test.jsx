import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaymentSummary from "./PaymentSummary";
import axios from "axios";
import { MemoryRouter, useLocation } from "react-router";
vi.mock("axios")

describe("PaymentSummary component", ()=>{
    let paymentSummary;
    let loadCart;
    let user;
    beforeEach(()=>{
        paymentSummary = {
            "totalItems":7,
            "productCostCents":8635,
            "shippingCostCents":499,
            "totalCostBeforeTaxCents":9134,
            "taxCents":913,
            "totalCostCents":10047
        }
        loadCart = vi.fn();
        user = userEvent.setup();
    });
    it("shows dollar amounts correctly", ()=>{
        render(<MemoryRouter><PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} /></MemoryRouter>)

        const items = screen.getByTestId("items")
        const shipping = screen.getByTestId("shipping")
        const totalBeforeTax = screen.getByTestId("total-before-tax")
        const estimatedTax = screen.getByTestId("estimated-tax")
        const orderTotal = screen.getByTestId("order-total")

        expect(items).toHaveTextContent("$86.35")
        expect(shipping).toHaveTextContent("$4.99")
        expect(totalBeforeTax).toHaveTextContent("91.34")
        expect(estimatedTax).toHaveTextContent("$9.13")
        expect(orderTotal).toHaveTextContent("$100.47")
    });
    it("clicked place order button", async ()=>{
        render(<MemoryRouter><Location /><PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} /></MemoryRouter>)

        const placeOrderBtt = screen.getByTestId("place-order-button")
        const path = screen.getByTestId("url-path")
        await user.click(placeOrderBtt)

        expect(axios.post).toHaveBeenCalledWith("/api/orders")
        expect(loadCart).toHaveBeenCalledTimes(1)
        expect(path).toHaveTextContent("/orders")

        function Location() {
            const location = useLocation();
            return (<>
                <div data-testid="url-path">{location.pathname}</div>
            </>)
        }
    });
});