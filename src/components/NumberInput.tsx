import * as React from 'react';

export interface InputProps {
  value: number;
  setValue: (enteredValue: number) => void;
  minValue: number;
  maxValue: number;
}

// The NumberInput component renders a range-limited controlled number input
const NumberInput: React.FC<InputProps> = ({
  value,
  setValue,
  minValue,
  maxValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const enteredValue = parseInt(e.target.value, 10);
    /* eslint-disable-next-line no-restricted-globals */
    if (isNaN(enteredValue)) return setValue(0);
    if (enteredValue > maxValue) return setValue(maxValue);
    if (enteredValue < minValue) return setValue(minValue);
    return setValue(enteredValue);
  };
  return (
    <input
      className="number-input"
      type="number"
      value={value}
      min={minValue}
      max={maxValue}
      onChange={handleChange}
    />
  );
};

export default NumberInput;
