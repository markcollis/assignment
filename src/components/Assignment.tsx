import * as React from 'react';

const Assignment: React.SFC = () => {
  return (
    <div className="container">
      <header>
        <p>Header</p>
      </header>
      <section className="left-panel">
        <p>Left panel</p>
      </section>
      <section className="main">
        <p>Main</p>
      </section>
      <section className="right-panel">
        <p>Right panel</p>
      </section>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Assignment;
