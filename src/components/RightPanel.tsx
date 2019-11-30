import * as React from 'react';

import { assignmentNumber } from './Assignment';

// The RightPanel component renders a description of the selected assignment
// and notes in response to it
const RightPanel: React.FC<{ selectedAssignment: assignmentNumber }> = ({ selectedAssignment }) => {
  const assignments: JSX.Element[] = [
    (
      <>
        <p>Please select an assignment.</p>
      </>
    ),
    (
      <>
        <p>Create an HTML layout as specified.</p>
        <p>
          Bonus: Create a local HTTP server which serves this layout, incorporating the other tasks.
        </p>
      </>
    ),
    (
      <>
        <p>
          Create three inputs (number, +/- buttons either side of value, slider) linked to
          the same variable.
        </p>
      </>
    ),
    (
      <>
        <p>
          Display cake shop cost and sales data in a way that will enable a manager to make
          informed decisions, in particular:
        </p>
        <ul>
          <li>to close unsatisfactory shops and establish new ones</li>
          <li>to determine which cake will be replaced with a new one</li>
          <li>to hire or fire employees</li>
        </ul>
        <p>Bonus: React immediately to any changes in the input data files.</p>
      </>
    ),
    (
      <>
        <p>
          Create a simple drawing tool, controlled by click and drag on the drawing area.
          The user can vary the thickness of the line drawn.
        </p>
        <p>
          Bonus: The user can save the current drawing and retrieve any previously saved drawing.
        </p>
      </>
    ),
  ];
  const responses: JSX.Element[] = [
    (
      <>
        <p>Please select an assignment.</p>
      </>
    ),
    (
      <>
        <p>Layout created as specified.</p>
        <p>
          {'Webpack-dev-server provided to view the assignments (start using '}
          <code>npm run serve/yarn serve</code>
          ).
        </p>
      </>
    ),
    (
      <>
        <p>
          Inputs created as specified. Each of the three is a separate component with the same
          value, setValue function, and minimum and maximum acceptable values passed as props to it.
        </p>
      </>
    ),
    (
      <>
        <p>
          to do (need to investigate best visualisation library and think about how best to
          slice and dice the data)
        </p>
      </>
    ),
    (
      <>
        <p>to do</p>
      </>
    ),
  ];

  return (
    <>
      <h3>Assignment:</h3>
      {assignments[selectedAssignment]}
      <h3>Response:</h3>
      {responses[selectedAssignment]}
    </>
  );
};

export default RightPanel;
