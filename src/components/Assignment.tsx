import * as React from 'react';

import logo from '../logo.svg';
import Main from './Main';
import RightPanel from './RightPanel';

// select which assignment to show (0 is initial render with no assignment selected)
export type assignmentNumber = 0 | 1 | 2 | 3 | 4;

// top level component that renders each of the sections of the specified layout
// as appropriate for the selected assignment
const Assignment: React.FC = () => {
  const [selectedAssignment, setSelectedAssignment] = React.useState<assignmentNumber>(0);

  // render a button to select the specified assignment
  const renderButton: (a: assignmentNumber) => JSX.Element = (a: assignmentNumber) => (
    <li key={a}>
      <button
        type="button"
        onClick={(): void => setSelectedAssignment(a)}
        className={(selectedAssignment === a) ? 'active' : ''}
      >
        {`Assignment ${a}`}
      </button>
    </li>
  );

  return (
    <div className="container">
      <header>
        {(selectedAssignment === 1) ? <h3 className="assignment-label">Header</h3> : ''}
        <h1>
          <img src={logo} alt="Datamole logo" />
          JavaScript Assignment
        </h1>
      </header>
      <section className="left-panel">
        {(selectedAssignment === 1) ? <h3 className="assignment-label">Left panel</h3> : ''}
        <ul>
          {[1, 2, 3, 4].map((a: assignmentNumber) => renderButton(a))}
        </ul>
      </section>
      <section className="main">
        {(selectedAssignment === 1) ? <h3 className="assignment-label">Main</h3> : ''}
        <Main selectedAssignment={selectedAssignment} />
      </section>
      <section className="right-panel">
        {(selectedAssignment === 1) ? <h3 className="assignment-label">Right panel</h3> : ''}
        <RightPanel selectedAssignment={selectedAssignment} />
      </section>
      <footer>
        {(selectedAssignment === 1) ? <h3 className="assignment-label">Footer</h3> : ''}
        <p>
          {'prepared by '}
          <a href="https://markcollis.dev">Mark Collis</a>
          , December 2019
        </p>
      </footer>
    </div>
  );
};

export default Assignment;
