import axios from "axios";

export async function api(set, id) {
    const extra = id.replaceAll(/products|cart-items|delivery-options|orders|payment-summary/g, "")
    const key = id.replace(extra, "")
    const endpoints = {
        "products": `/api/products${extra}`,
        "orders": `/api/orders${extra}?expand=products`,
        "payment-summary": `/api/payment-summary${extra}`,
        "cart-items": `/api/cart-items${extra}?expand=product`,
        "delivery-options": `/api/delivery-options${extra}?expand=estimatedDeliveryTime`,
    };
    const endpoint = endpoints[key];

    !endpoint && console.log(`${key} <- unknown resource`)

    const response = await axios.get(endpoint)
    set(response.data)
}


// export class Storage {
//     async api(set, id) {
//         if (id === "products") {
//             const response = await axios.get("/api/products")
//             set(response.data)
//         }
//         else if (id === "cart-items") {
//             const response = await axios.get("/api/cart-items?expand=product")
//             set(response.data)
//         }
//         else if (id === "delivery-options") {
//             const response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
//             set(response.data)
//         }
//         else if (id === "orders") {
//             const response = await axios.get("/api/orders?expand=products")
//             set(response.data)
//         }
//         else if (id === "payment-summary") {
//             const response = await axios.get("/api/payment-summary")
//             set(response.data)
//         }
//         else {
//             console.log(id + " <- fix")
//         }
//     }
// }
/* */
// export class ApiService {
//     async loadStateData(set, resourceId) {
//         const endpoints = {
//             "products": "/api/products",
//             "cart-items": "/api/cart-items?expand=product",
//             "delivery-options": "/api/delivery-options?expand=estimatedDeliveryTime",
//             "orders": "/api/orders?expand=products",
//             "payment-summary": "/api/payment-summary",
//         };

//         const endpoint = endpoints[resourceId];

//         if (!endpoint) {
//             console.warn(`${resourceId} <- unknown resource`);
//             return;
//         }

//         try {
//             const response = await axios.get(endpoint);
//             set(response.data);
//         } catch (error) {
//             console.error(`Failed to load ${resourceId}`, error);
//         }
//     }
// }
