import * as React from 'react';

import { assignmentNumber } from './Assignment';

const Main: React.FC<{ selectedAssignment: assignmentNumber }> = ({ selectedAssignment }) => {
  return (
    <p>Main {selectedAssignment}</p>
  );
};

export default Main;
