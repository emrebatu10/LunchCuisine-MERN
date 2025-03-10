import './CSS/App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';
import MenuPage from '../pages/MenuPage';
import AccountPage from '../pages/AccountPage';
import RegisterPage from '../pages/RegisterPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentPage from '../pages/PaymentPage';
import OrderPage from '../pages/OrderPage';
import { CartProvider } from '../src/Components/CartContext';

function App() {
  return (

    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> {/* Default routing */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/orders" element={<OrderPage />} />
        {/*<Route path="/product/:productId" element={<ProductDetailPage />} />*/}
        <Route path="/product/:productName" element={<ProductDetailPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
