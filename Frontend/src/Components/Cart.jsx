import '../CSS/Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Components/CartContext';

const sizePriceDiff = {
    small: 0,
    medium: 5,
    large: 10,
    xlarge: 15
};

const Cart = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const [productsData, setProductsData] = useState([]); //products from API
    const navigate = useNavigate();

    // Fetch product data from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) throw new Error("Failed to fetch products.");
                const data = await response.json();
                setProductsData(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Merge cart items with fetched product details
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

        if (productsData.length > 0) {
            const updatedCart = savedCart.map(item => {
                const productDetails = productsData.find(p => p.product_id === item.id);
                return productDetails
                    ? { ...item, ...productDetails } // Merge product details into cart
                    : item; // Keep original if no match
            });

            setCartItems(updatedCart);
        }
    }, [productsData, setCartItems]);

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalPrice = cartItems.reduce((acc, item) =>
        acc + (item.price + (item.extraOptionsTotal || 0) + sizePriceDiff[item.selectedSize || 'small']) * item.quantity, 0
    );

   
    const handleProceedToCheckout = () => {
        const user = localStorage.getItem("user"); // get user from Local Storage
    
        if (user) {
            // if user exist
            navigate('/payment');
        } else {
            // if user does not exist
            alert("Please log in to proceed to checkout.");
            navigate('/login');
        }
    };




    const handleClick = () => {
        navigate('/menu');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="cart-page-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. <Link to="/menu">Go to Menu</Link></p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Selected Size: {item.selectedSize.charAt(0).toUpperCase() + item.selectedSize.slice(1)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price per item: ${item.price.toFixed(2)}</p>
                                    {item.extraOptions?.length > 0 && (
                                        <div className="extra-options">
                                            <h4>Extra Options:</h4>
                                            <ul>
                                                {item.extraOptions.map(option => (
                                                    <li key={option}>{option}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <p>Subtotal: ${((item.price || 0) + (item.extraOptionsTotal || 0) + sizePriceDiff[item.selectedSize || 'small']) * item.quantity}</p>
                                </div>
                                <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

                        <button className="continue-shopping-btn" onClick={handleClick}>Continue Shopping</button>
                        <button className="checkout-btn" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
