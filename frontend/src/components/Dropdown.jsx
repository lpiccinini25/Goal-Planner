import { useState } from 'react';
import "../styles/Dropdown.css"

function Dropdown({ options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Select an Importance Level');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={"dropdown"}>
      <div className={`select        
        ${selected === 'Essential' ? 'Essential' : ''}
        ${selected === 'Vital' ? 'Vital' : ''}
        ${selected === 'Fair' ? 'Fair' : ''}
        ${selected === 'Trivial' ? 'Trivial' : 'Unchosen'}       
        `} onClick={handleToggle}>
        <span className={'selected'}>{selected}</span>
        <span className="caret"></span>
      </div>
      {isOpen && (
        <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
          {options.map((opt) => (
            <li
              key={opt}
              className={`
                ${opt === selected ? 'active' : ''} 
                ${opt === 'Essential' ? 'Essential' : ''}
                ${opt === 'Vital' ? 'Vital' : ''}
                ${opt === 'Fair' ? 'Fair' : ''}
                ${opt === 'Trivial' ? 'Trivial' : ''}
                `}
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;