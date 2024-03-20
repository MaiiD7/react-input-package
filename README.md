# React Custom Input

A simple Input/Select type component to be used in any React project.

## Description

React custom input is a simple input with very few dependencies to be used in your project. It can be used as an input and a select to create your forms. It also comes with a default style that can be overridden and all the features you need to handle values.

## Getting Started

### Install

* Add this package to your React project using npm

  ```
  npm install @/maiid7/react-custom-input
  ```

### Import

* Import the custom input in your React project like so : 

  ```
  import { Input } from 'react-custom-input'
  ```

## Usage

* Once imported, use it this way : 

  * As an input

  ```
  <div>
    <Input 
      label="First Name"
      placeholder="First Name"
      value={form.firstName}
      onChange={handleInputChange}
      regExp={simpleTextRegExp} 
    />
  </div>
  ```

  * As a select

  ```
  <div>
    <Input
      select
      options={states}
      label="State"
      placeholder="State"
      value={form.state}
      onChange={handleValueChange}
    />
  </div>
  ```

* Available Props : 

  | Name        | Type     | Description                                              |
  |-------------|----------|----------------------------------------------------------|
  | name        | string   | Define input name                                        |
  | label       | string   | If undefined, label is not displayed                     |
  | placeholder | string   | Placeholder for input                                    |
  | style       |          | Add custom style to input                                |
  | className   |          | Add custom class to input                                |
  | ref         |          | Can be used to get reference element (instead of using `onChange` event)                     |
  | select      | boolean  | Set the input type to select                             |
  | options     | array    | If select is `true`, add select options to input         |
  | value       | variable | Value of input                                           |
  | onChange    | function | Runs when the value of the input changes. The first parameter is the value.                                           |

  Check this [exemple project](https://github.com/MaiiD7/Wealth-Health) for more details on usage.

## Authors

Mairo Dronsart  
[LinkedIn/MairoDronsart](https://www.linkedin.com/in/mairo-dronsart/)

## Version History

* 1.0.3
    * Initial Release

## License

CopyRight 2024 Maro Dronsart.
