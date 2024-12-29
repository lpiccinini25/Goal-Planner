import { useState } from 'react';
import "../styles/Dropdown.css"

function Dropdown({ options = [], callback}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Select an Importance Level');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelected(option);
    if (option === 'Essential (4 points)') {
        callback(4);
    } else if (option === 'Vital (3 points)') {
        callback(3)
    } else if (option === 'Fair (2 points)') {
        callback(2)
    } else {
        callback(1)
    }
    setIsOpen(false);
  };

  return (
    <div className={"dropdown"}>
      <div className={`select        
        ${selected === 'Essential (4 points)' ? 'Essential' : ''}
        ${selected === 'Vital (3 points)' ? 'Vital' : ''}
        ${selected === 'Fair (2 points)' ? 'Fair' : ''}
        ${selected === 'Trivial (1 point)' ? 'Trivial' : 'Unchosen'}       
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
                ${opt === 'Essential (4 points)' ? 'Essential' : ''}
                ${opt === 'Vital (3 points)' ? 'Vital' : ''}
                ${opt === 'Fair (2 points)' ? 'Fair' : ''}
                ${opt === 'Trivial (1 point)' ? 'Trivial' : ''}
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