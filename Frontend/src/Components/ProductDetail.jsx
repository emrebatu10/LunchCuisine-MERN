import { useState, useEffect } from 'react';
import '../CSS/ProductDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const sizePriceDiff = {
    small: 0,
    medium: 5,
    large: 10,
    xlarge: 15
};

const extraOptionPrices = {
    "Extra Cheese": 2.00,
    "Mushrooms": 1.50,
    "Peppers": 1.00
};

const ProductDetail = () => {
    const { cartItems, setCartItems } = useContext(CartContext); 
    const { productName } = useParams(); //  get name from URL
    const [product, setProduct] = useState(null); // product details fetched from the API
    const [quantity, setQuantity] = useState(1); //  quantity selection
    const [extraOptions, setExtraOptions] = useState([]);
    const [selectedSize, setSelectedSize] = useState('small');
    const [isInCart, setIsInCart] = useState(false);
    const [loading, setLoading] = useState(true); //  loading state
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const productsData = await response.json();
                //console.log(productsData);


                const decodedProductName = decodeURIComponent(productName);
                const foundProduct = productsData.find(product =>
                    product.name.toLowerCase() === decodedProductName.toLowerCase()
                );

                if (!foundProduct) {
                    console.error(`Product with name "${decodedProductName}" not found.`);
                    throw new Error("Product not found in the fetched data.");
                }
                
                setProduct(foundProduct);
            } catch (error) {
                console.error("Error fetching product:", error);
                alert("Product could not be loaded. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productName]);

    useEffect(() => {
        if (product) {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cartItems.find(item => item.id === product.id);
            setIsInCart(!!existingItem);
        }
    }, [product]);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleOptionChange = (option) => {
        setExtraOptions(prev =>
            prev.includes(option)
                ? prev.filter(opt => opt !== option)
                : [...prev, option]
        );
    };

    const extraOptionsTotal = extraOptions.reduce((acc, option) => acc + extraOptionPrices[option], 0);
    const totalPrice = product ? (product.price + extraOptionsTotal + sizePriceDiff[selectedSize]) * quantity : 0;

    const addToCart = () => {
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.image,
            extraOptions,
            extraOptionsTotal,
            selectedSize
        };

        const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

        let updatedCartItems;
        if (existingItemIndex >= 0) {
            updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += quantity;
        } else {
            updatedCartItems = [...cartItems, newItem];
        }

        // Update the cartItems state and localStorage
        setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        setIsInCart(true);
    };
    

    const handleBackToMenu = () => {
        navigate('/menu');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} />
                <p>{product.description}</p>
            </div>

            <div className="product-extras">
                <h3>Price: ${product.price}</h3>
                {product.category === 'Pizza' && (
                    <>
                        <div className="size-select">
                            <h4>Pizza Size:</h4>
                            {Object.keys(sizePriceDiff).map(size => (
                                <label key={size}>
                                    <input
                                        type="radio"
                                        value={size}
                                        checked={selectedSize === size}
                                        onChange={() => setSelectedSize(size)}
                                    />
                                    {size.charAt(0).toUpperCase() + size.slice(1)} (+${sizePriceDiff[size]})
                                </label>
                            ))}
                        </div>

                        <div className="extra-options">
                            <h4>Extra Options:</h4>
                            {Object.keys(extraOptionPrices).map(option => (
                                <label key={option}>
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={extraOptions.includes(option)}
                                        onChange={() => handleOptionChange(option)}
                                    />
                                    {option} (+${extraOptionPrices[option]})
                                </label>
                            ))}
                        </div>
                    </>
                )}

                <div className="quantity-select">
                    <label htmlFor="quantity">Quantity:</label>
                    <select id="quantity" value={quantity} onChange={handleQuantityChange}>
                        {[...Array(10).keys()].map(n => (
                            <option key={n + 1} value={n + 1}>{n + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="total-price">
                    <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
                </div>

                <div className="cart-buttons">
                    <button className="continue-shopping-btn" onClick={handleBackToMenu}>Back to Menu</button>
                    <button
                        className="add-to-cart-btn"
                        onClick={addToCart}
                        disabled={isInCart}
                    >
                        {isInCart ? 'Already in Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
