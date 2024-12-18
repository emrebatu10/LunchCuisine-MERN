
import '../CSS/Social.css'; 
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Social = () => {
  return (
    <div className="social-container">
      <div className="social-apps">
        <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.dpeurasia.com/dms/images/icon/google-play-badge.png" alt="Google Play" />
        </a>
        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.dpeurasia.com/dms/images/icon/app-store-badge.png" alt="App Store" />
        </a>
        <a href="https://appgallery.huawei.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.dpeurasia.com/dms/images/icon/huawei-badge.png" alt="AppGallery" />
        </a>
        
      </div>

      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default Social;
