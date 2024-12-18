import '../CSS/Menu.css';
import { useState, useEffect } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(4);
    const [products, setProducts] = useState([]); // products from backend
    const [categories, setCategories] = useState(['All']); // dynamic categories
    const navigate = useNavigate();

    // Fetch categories and products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetch("/api/categories");
                const categoriesData = await categoriesResponse.json();

                const productsResponse = await fetch("/api/products");
                const productsData = await productsResponse.json();

                setCategories(['All', ...categoriesData.map(category => category.name)]);
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("There was a problem fetching data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    // Filter by category
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    // Limiting the products displayed
    const visibleProducts = filteredProducts.slice(0, visibleCount);

    // Show more products
    const handleViewMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    // Redirect to product detail page
    const handleProductClick = (productName) => {
        if (productName) {
            navigate(`/product/${productName}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            console.error("Invalid product name");
        }
    };


    return (
        <div className="menu-container">
            <h2>Our Menu</h2>
            <div className="category-filter">
                {categories.map((category, index) => (
                    <button
                        key={`${category}-${index}`} // A unique key prop is provided
                        className={category === selectedCategory ? 'active' : ''}
                        onClick={() => {
                            setSelectedCategory(category);
                            setVisibleCount(4);
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="product-list">
                {visibleProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="product-footer">
                            <span>${product.price}</span>
                            <button
                                className='product-footer-button'
                                onClick={() => handleProductClick(product.name)}
                            >
                                <FaShoppingCart style={{ height: 24, width: 24 }} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < filteredProducts.length && (
                <button className="view-more-btn" onClick={handleViewMore}>
                    View More
                </button>
            )}
        </div>
    );
};

export default Menu;
