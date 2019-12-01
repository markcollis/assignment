import * as React from 'react';

import { InputProps } from './NumberInput';

// The PlusMinusInput component renders a controlled input that is incremented or
// decremented using buttons
const PlusMinusInput: React.FC<InputProps> = ({
  value,
  setValue,
  minValue,
  maxValue,
}) => {
  const handleMinusButtonClick = (): void => {
    if (value > minValue) setValue(value - 1);
  };
  const handlePlusButtonClick = (): void => {
    if (value < maxValue) setValue(value + 1);
  };
  return (
    <div className="plus-minus-input">
      <button type="button" className="minus-button" onClick={handleMinusButtonClick}>-</button>
      <span>{value}</span>
      <button type="button" onClick={handlePlusButtonClick}>+</button>
    </div>
  );
};

export default PlusMinusInput;
