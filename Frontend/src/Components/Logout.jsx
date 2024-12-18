import { useNavigate } from 'react-router-dom';
import '../CSS/Account.css'

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Delete user information
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
