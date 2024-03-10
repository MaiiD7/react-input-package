import { forwardRef, useEffect, useRef, useState } from 'react';
import './input.css';
import VectorArrow from '../../assets/Vector.svg'

export const Input = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.options ? props.options[0] : null);
  const customSelectRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  const onOptionClick = (value) => () => { 
     setSelectedOption(value);
     setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
       if (customSelectRef.current && !customSelectRef.current.contains(event.target)) {
         setIsOpen(false);
       }
      }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [customSelectRef]);

  return (
    <>
    {props.label && (
      <label htmlFor="custom-select">{props.label}</label>
    )}
    {props.select ? 
      <div 
        style={{ 
          
          border: isOpen ? '1px solid rgba(60, 120, 238, 1)' : '',
          borderRadius: isOpen ? '8px 8px 0px 0px' : '',
          display: 'flex',
          justifyContent: 'space-between',
          ...props.style
        }} 
        ref={customSelectRef}
        className="custom-select" onClick={toggleOpen}>
        <div ref={ref} className="selected-option">
          {selectedOption}
        </div>
        <img src={VectorArrow} alt="Arrow" style={{transform: isOpen ? 'rotate(180deg)' : '', transitionDuration: '0.3s'}} />
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
        ref={ref}
        type="text" 
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        style={{...props.style}}
      />
    }
    </>
  )
})