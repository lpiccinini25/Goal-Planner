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
      <div className="select" onClick={handleToggle}>
        <span className="selected">{selected}</span>
        <span className="caret"></span>
      </div>
      {isOpen && (
        <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
          {options.map((opt) => (
            <li
              key={opt}
              className={`option ${opt === selected ? 'active' : ''}`}
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