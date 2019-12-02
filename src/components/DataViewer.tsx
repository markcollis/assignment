import * as React from 'react';

import { CakeData } from './CakeFranchiseData';
import { getFranchiseSummary } from './dataManipulation';

import SummaryView from './SummaryView';
import FranchiseView from './FranchiseView';
import CakeView from './CakeView';

interface DataViewerProps {
  selectedData: CakeData;
  selectedTheme: number;
}

const DataViewer: React.FC<DataViewerProps> = ({
  selectedData,
  selectedTheme,
}) => {
  if (selectedData.length === 0) return <p>There is no data to display.</p>;
  const franchiseSummary = getFranchiseSummary(selectedData);
  return (
    <div className="data-viewer">
      {(selectedTheme === 0) ? <SummaryView franchiseSummary={franchiseSummary} /> : ''}
      {(selectedTheme === 1) ? <FranchiseView franchiseSummary={franchiseSummary} selectedData={selectedData} /> : ''}
      {(selectedTheme === 2) ? <CakeView franchiseSummary={franchiseSummary} selectedData={selectedData} /> : ''}
    </div>
  );
};

export default DataViewer;
