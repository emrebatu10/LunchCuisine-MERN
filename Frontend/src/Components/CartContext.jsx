import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//  Create Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Get items in your cart from localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    // Calculate the number of cart
    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);


    const sizePriceDiff = {
        small: 0,
        medium: 5,
        large: 10,
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => {
        const itemPrice = item.price + item.extraOptionsTotal + (sizePriceDiff[item.selectedSize] || 0);
        return acc + itemPrice * item.quantity;
    }, 0);



    return (
        <CartContext.Provider value={{ cartItems, setCartItems, cartItemCount, totalPrice }}>
            {children}
        </CartContext.Provider>
    );

};
// PropTypes 
CartProvider.propTypes = {
    children: PropTypes.node.isRequired, // children prop
};