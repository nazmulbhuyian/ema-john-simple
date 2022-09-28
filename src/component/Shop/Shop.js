import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, getStoreCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);

    useEffect(() => {
        const storeCart = getStoreCart();
        const saveCart = [];
        for(const id in storeCart){
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                const quantity = storeCart[id]
                //console.log(addedProduct);
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct);
            }
        }
        setCart(saveCart);
    }, [products])

    const handleAddToCart = (product) =>{
        // console.log(product);
        let newCart = [];
        const exits = cart.find(frd => frd.id === product.id);
        if(!exits){
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else{
            const rest = cart.filter(frd => frd.id !== product.id);
            exits.quantity = exits.quantity + 1;
            newCart = [...rest, exits];
        }

        // const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {/* <h1>This is total product: {products.length}</h1> */}
                {
                    products.map(product => <Product
                         key={product.id}
                          product={product}
                           handleAddToCart={handleAddToCart}
                           >
                           </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;