import * as React from 'react';

import { InputProps } from './NumberInput';

// The SliderInput component renders a controlled slider input
const SliderInput: React.FC<InputProps> = ({
  value,
  setValue,
  minValue,
  maxValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const enteredValue = parseInt(e.target.value, 10);
    setValue(enteredValue);
  };
  return (
    <input
      className="slider-input"
      type="range"
      value={value}
      min={minValue}
      max={maxValue}
      onChange={handleChange}
    />
  );
};

export default SliderInput;
