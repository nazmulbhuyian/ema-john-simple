import React from 'react';

const Cart = ({cart}) => {
    return (
        <div>
            <h1>Oder summary</h1>
            <p>Selected Item: {cart.length}</p>
        </div>
    );
};

export default Cart;