import  { useState } from 'react';
import '../CSS/Account.css'


const Account = () => {
  const [selected, setSelected] = useState('Credit Cards');

  const menuItems = [
    'Membership',
    'My orders',
    'Pizza Tracker',
    'My addresses',
    'My Credit Cards',
    'Change password',
  ];

  return (
    <div className="account-menu">
      <h3 className="account-title">Account</h3>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item}
            className={item === selected ? 'selected' : ''}
            onClick={() => setSelected(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Account;
