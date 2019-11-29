import * as React from 'react';

import { assignmentNumber } from './Assignment';

const RightPanel: React.FC<{ selectedAssignment: assignmentNumber }> = ({ selectedAssignment }) => {
  const assignments: JSX.Element[] = [
    null,
    (
      <>
        <p>Create an HTML layout as specified.</p>
        <p>Create a local HTTP server to serve this layout with the assignments</p>
      </>
    ),
    (
      <>
        <p>Create three inputs (number, +/- buttons, slider) linked to the same variable.</p>
      </>
    ),
    (
      <>
        <p>to do</p>
      </>
    ),
    (
      <>
        <p>to do</p>
      </>
    ),
  ];
  const responses: JSX.Element[] = [
    null,
    (
      <>
        <p>Layout created as specified.</p>
        <p>Webpack-dev-server provided (start using <code>npm serve/yarn serve</code>)</p>
      </>
    ),
    (
      <>
        <p>to do</p>
      </>
    ),
    (
      <>
        <p>to do</p>
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
      <h2>Assignment:</h2>
      {assignments[selectedAssignment]}
      <h2>Response:</h2>
      {responses[selectedAssignment]}
    </>
  )
};

export default RightPanel;
