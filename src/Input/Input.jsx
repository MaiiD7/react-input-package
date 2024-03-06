import { useState } from 'react';
import './input.css';

export const Input = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.options[0]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  const onOptionClick = (value) => () => {
     setSelectedOption(value);
     setIsOpen(false);
  };

  return (
    <>
    {props.label && (
      <label htmlFor="custom-select">{props.label}</label>
    )}
    {props.select ? 
      <div 
        style={{ 
          border: isOpen ? '1px solid rgba(60, 120, 238, 1)' : '',
          borderRadius: isOpen ? '8px 8px 0px 0px' : ''
        }} 
        className="custom-select" onClick={toggleOpen}>
        <div className="selected-option">
          {selectedOption}
        </div>
        {isOpen && (
          <div className="options">
            {props.options.map((option) => (
              <div key={option} className="option" onClick={onOptionClick(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      : 
      <input 
        type="text" 
        placeholder={props.placeholder}
      />
    }
    </>
  )
}