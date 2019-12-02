import * as React from 'react';

import { CakeData } from './CakeFranchiseData';
import { getFranchiseSummary } from './dataManipulation';

import SummaryView from './SummaryView';
import ShopView from './ShopView';
import CakeView from './CakeView';

interface DataViewerProps {
  selectedData: CakeData;
  selectedTheme: number;
}

const DataViewer: React.FC<DataViewerProps> = ({
  selectedData,
  selectedTheme,
}) => {
  if (selectedData.length === 0) return <p>This data set is empty.</p>;
  const franchiseSummary = getFranchiseSummary(selectedData);
  console.log('franchiseSummary', franchiseSummary);
  return (
    <div className="data-viewer">
      {(selectedTheme === 0) ? <SummaryView franchiseSummary={franchiseSummary} /> : ''}
      {(selectedTheme === 1) ? <ShopView /> : ''}
      {(selectedTheme === 2) ? <CakeView /> : ''}
    </div>
  );
};

export default DataViewer;
