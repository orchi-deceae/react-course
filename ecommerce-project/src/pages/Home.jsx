import Header from "../components/universal/Header";
import Page from "../components/Home/Page";
import { useEffect, useState } from "react"
import axios from 'axios'
import "../components/universal/general.css"
import "../components/universal/Header.css"
import "../components/Home/Page.css"

export default function Home() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(()=>{
        async function loadProducts(){
            const response = await axios.get("/api/products")
            console.log(response.data)
            setProducts(response.data)
        }
        async function loadCart(){
            const response = await axios.get("/api/cart-items")
            setCart(response.data)
        }
        loadProducts()
        loadCart()
    }, [])

    return (<>
        <Header cart={cart}/>
        <Page products={products}/>
    </>)
}