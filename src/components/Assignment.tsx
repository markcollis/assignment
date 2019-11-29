import * as React from 'react';

import logo from '../logo.svg';
import Main from './Main';
import RightPanel from './RightPanel';

export type assignmentNumber = 1 | 2 | 3 | 4; // select which assignment to show

// top level component that renders each of the sections of the specified layout
// as appropriate for the selected assignment
const Assignment: React.FC = () => {
  const [selectedAssignment, setSelectedAssignment] = React.useState<assignmentNumber>(1);

  // render a button to select the specified assignment
  const renderButton: React.ReactType = (a: assignmentNumber) => (
    <li>
      <button
        type="button"
        onClick={(): void => setSelectedAssignment(a)}
        className={(selectedAssignment === a) ? 'active' : ''}
      >Assignment {a}</button>
    </li>
  );

  return (
    <div className="container">
      <header>
        {(selectedAssignment === 1) ? <h3>Header</h3> : ''}
        <h1>
          <img src={logo} alt="Datamole logo"/>
          JavaScript Assignment
        </h1>
      </header>
      <section className="left-panel">
        {(selectedAssignment === 1) ? <h3>Left panel</h3> : ''}
        <ul>
        {[1, 2, 3, 4].map((a: assignmentNumber) => renderButton(a))}
        </ul>
      </section>
      <section className="main">
        {(selectedAssignment === 1) ? <h3>Main</h3> : ''}
        <Main selectedAssignment={selectedAssignment} />
      </section>
      <section className="right-panel">
        {(selectedAssignment === 1) ? <h3>Right panel</h3> : ''}
        <RightPanel selectedAssignment={selectedAssignment} />
      </section>
      <footer>
        {(selectedAssignment === 1) ? <h3>Footer</h3> : ''}
        <p>prepared by <a href="https://markcollis.dev">Mark Collis</a>, December 2019</p>
      </footer>
    </div>
  );
};

export default Assignment;
