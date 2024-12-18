import { useState } from 'react';
import '../CSS/PizzaSizeSelector.css'; 

const pizzaSizes = [
  { id: 'small', label: 'Small', slices: 4, price: 0 },
  { id: 'medium', label: 'Medium', slices: 6, price: 60 },
  { id: 'large', label: 'Large', slices: 8, price: 100 },
  { id: 'xlarge', label: 'XL', slices: 12, price: 150 },
];

function PizzaSizeSelector() {
  const [selectedSize, setSelectedSize] = useState('small');

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="pizza-size-container">
      <div className="pizza-sizes">
        {pizzaSizes.map((size) => (
          <div
            key={size.id}
            className={`pizza-size ${selectedSize === size.id ? 'selected' : ''}`}
            onClick={() => handleSizeSelect(size.id)}
          >
            <img
              src={`./images/${size.id}-pizza.png`} 
              alt={`${size.label}`}
              className="pizza-image"
            />
            <div className="pizza-info">
              <span className="pizza-label">{size.label}</span>
              <span className="pizza-slices">{size.slices} dilim</span>
              {size.price > 0 && <span className="pizza-price">+{size.price}</span>}
            </div>
            {selectedSize === size.id && <div className="selected-icon">✔</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PizzaSizeSelector;
