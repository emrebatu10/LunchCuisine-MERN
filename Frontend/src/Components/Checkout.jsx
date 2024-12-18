import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Checkout.css';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        address: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    // Calculating the total price
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price + (item.extraOptionsTotal || 0)) * item.quantity, 0);

    // Capturing form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({
            ...customerInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment processed for:', customerInfo);
        localStorage.removeItem('cart');
        navigate('/menu');
    };

    

    return (
        <div className="checkout-page-container">
            <h2>Checkout</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. <Link to="/menu">Go to Menu</Link></p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={`/images/${item.image}`} alt={item.name} />
                                <div className="cart-item-details">
                                    <h2>{item.name}</h2>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price per item: ${item.price.toFixed(2)}</p>
                                    {item.extraOptions.length > 0 && (
                                        <div className="extra-options">
                                            <h4>Extra Options:</h4>
                                            <ul>
                                                {item.extraOptions.map(option => (
                                                    <li key={option}>{option}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <p>Subtotal: ${(item.price + (item.extraOptionsTotal || 0)) * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    <div className="total-price">
                        Total Price: ${totalPrice.toFixed(2)}
                    </div>
                    </div>
                    

                    <form onSubmit={handleSubmit} className="customer-info-form">
                        <h3>Customer Information</h3>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Full Name" 
                            value={customerInfo.name} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email Address" 
                            value={customerInfo.email} 
                            onChange={handleChange} 
                            required 
                        />
                        <textarea 
                            name="address" 
                            placeholder="Shipping Address" 
                            value={customerInfo.address} 
                            onChange={handleChange} 
                            required 
                        />
                        <button  type="submit" className="submit-btn">Pay Now</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Checkout;
