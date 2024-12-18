import '../CSS/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUser, FaHome } from 'react-icons/fa';
import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { useContext } from 'react';
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Header() {
  const { cartItemCount } = useContext(CartContext);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Delete user information
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar className='navbar' expand="lg">
      <Container>
        {/* Drop Down Menu Button for Mobile Devices */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">

           {/* <Nav.Link as={Link} to="/home" className="mx-1">
              All Campaigns
            </Nav.Link>*/}


            {/* Conditionally render "My Account" or login icon based on user login status */}
            {user ? (
              <Nav.Link as={Link} to="/account" className="mx-1">
                My Account
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="mx-1 d-flex align-items-center">
                <FaUser className="nav-icon" />
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/home" className="mx-1 d-flex align-items-center">
              <FaHome className="nav-icon" />
            </Nav.Link>



            {user && ( // if user exist, then render
              <Nav.Link as={Link} to="/login" onClick={handleLogout} className="mx-1 d-flex align-items-center">
                <MdLogout className="nav-icon" />
              </Nav.Link>

            )}


            <Nav.Link as={Link} to="/cart" className="mx-1 d-flex align-items-center position-relative">
              <FiShoppingCart className="nav-icon" />
              {cartItemCount > 0 && (
                <span className="cart-count-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItemCount}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
