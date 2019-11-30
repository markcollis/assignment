import * as React from 'react';

import NumberInput from './NumberInput';
import PlusMinusInput from './PlusMinusInput';
import SliderInput from './SliderInput';

// The LinkedInputs component is the top level component for Assignment 2
const LinkedInputs: React.FC = () => {
  const MIN_VALUE = 0;
  const MAX_VALUE = 100;

  const [value, setValue] = React.useState((MIN_VALUE + MAX_VALUE) / 2);
  return (
    <>
      <h3>Linked Inputs</h3>
      <NumberInput
        value={value}
        setValue={setValue}
        minValue={MIN_VALUE}
        maxValue={MAX_VALUE}
      />
      <PlusMinusInput
        value={value}
        setValue={setValue}
        minValue={MIN_VALUE}
        maxValue={MAX_VALUE}
      />
      <SliderInput
        value={value}
        setValue={setValue}
        minValue={MIN_VALUE}
        maxValue={MAX_VALUE}
      />
    </>
  );
};

export default LinkedInputs;
