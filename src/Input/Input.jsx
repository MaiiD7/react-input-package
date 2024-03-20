import React from 'react'
import { forwardRef, useEffect, useRef, useState } from 'react';
import VectorArrow from '../../assets/Vector.svg';
import './input.css';

// Input/Select type component to be used in any React project
export const Input = forwardRef((props, ref) => {

  // ********************************** //
  // Functions and useEffect for select //
  // ********************************** //

  // States and Refs
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.options ? props.options[0] : null);
  const customSelectRef = useRef(null); // Ref used to close select on click outside

  // Open or close custom select
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  // Set the new selected option on click
  const onOptionClick = (value) => () => { 
     setSelectedOption(value);
    // custom onChange prop is applied here
     props.onChange(value);
     setIsOpen(false);
  };

  // Initialize the value on user side
  useEffect(() => {
    if (props.select) {
      props.onChange(selectedOption)
    }
  }, []);

  // Handle click outside the select menu (close select)
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

  // ***************************** //
  // Functions for input component //
  // ***************************** //

  // Check if the input value is matching the regExp prop (optionnal)
  const validateValue = () => {
    if (props.value && props.value.length > 0 && props.regExp) {
        const validRgxp = new RegExp(props.regExp)
        return !validRgxp.test(props.value)
    } else return false
  }

  // **************** //
  // Component render //
  // **************** //

  return (
    <>

    {/* Label if prop exists */}
    {props.label && (
      <label htmlFor="custom-select">{props.label}</label>
    )}

    {/* Either a select (if prop exists) or an input by default */}
    {props.select ? 

      // Custom Select
      <div 
        // Ref
        ref={customSelectRef}
        onClick={toggleOpen}
        style={{ 
          border: isOpen ? '1px solid rgba(60, 120, 238, 1)' : '',
          outline: isOpen ? '2px solid rgba(60, 120, 238, 1)' : 'none',
          outlineOffset: '-1px',
          borderRadius: isOpen ? '8px 8px 0px 0px' : '',
          display: 'flex',
          justifyContent: 'space-between',
          // custom style applied by the user
          ...props.style
        }} 
        // custom className added by the user
        className={`custom-select ${props.className ? props.className : null}`}
      >
        {/* Selected Option */}
        <div ref={ref} className="selected-option" name={props.name}>
          {selectedOption}
        </div>

        {/* Select Arrow */}
        <img src={VectorArrow} alt="Arrow" style={{transform: isOpen ? 'rotate(180deg)' : '', transitionDuration: '0.3s'}} />

        {/* Menu if select is open */}
        {isOpen && (
          <div className="options">
            {/* Options are passed as a prop */}
            {props.options.map((option) => (
              <div key={option} className="option" onClick={onOptionClick(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      :
      
      // Custom Input
      <div style={{position: 'relative', maxWidth: '100%'}}>
        <input 
          // custom className added by the user
          className={`custom-input ${validateValue() ? 'error' : 'valid' } ${props.className ? props.className : null}`}
          ref={ref}
          type="text" 
          placeholder={props.placeholder}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          style={{ 
            paddingRight: props.icon ? '32px' : '10px' ,
            // custom style applied by the user
            ...props.style
          }}
        />

        {/* End Adornment if prop exists */}
        {props.icon && (
          <div className='icon'>
            {props.icon}
          </div>
          )
        }
      </div> 
      
    }
    </>
  )
})