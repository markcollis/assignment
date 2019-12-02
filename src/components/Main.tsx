import * as React from 'react';

import { assignmentNumber } from './Assignment';
import LinkedInputs from './LinkedInputs';
import CakeFranchiseData from './CakeFranchiseData';
import SimpleDraw from './SimpleDraw';

// The Main component renders the appropriate main content for each assignment
const Main: React.FC<{ selectedAssignment: assignmentNumber }> = ({ selectedAssignment }) => {
  switch (selectedAssignment) {
    case 1:
      return <p>Here is the layout.</p>;
    case 2:
      return <LinkedInputs />;
    case 3:
      return <CakeFranchiseData />;
    case 4:
      return <SimpleDraw />;
    default:
      return <p>Select an assignment from the left panel to see the relevant content here.</p>;
  }
};

export default Main;
