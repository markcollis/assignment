import * as React from 'react';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  AreaSeries,
  DiscreteColorLegend,
} from 'react-vis';

import { CakeData } from './CakeFranchiseData';
import { FranchiseSummary, getCakeNameData } from './dataManipulation';

interface CakeViewProps {
  franchiseSummary: FranchiseSummary;
  selectedData: CakeData;
}

const CakeView: React.FC<CakeViewProps> = ({ franchiseSummary, selectedData }) => {
  if (franchiseSummary.length === 0) return <p>No data to display.</p>;
  const [selectedFranchise, setSelectedFranchise] = React
    .useState(franchiseSummary[0].franchiseId);
  const handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void = (e) => {
    setSelectedFranchise(parseInt(e.target.value, 10));
  };
  const franchiseSelect = (
    <select onChange={handleOnChange}>
      {franchiseSummary.map((franchise) => {
        const { franchiseId, franchiseName } = franchise;
        return <option key={franchiseId} value={franchiseId}>{franchiseName}</option>;
      })}
    </select>
  );
  const franchiseData = selectedData.filter(record => record.franchiseId === selectedFranchise);
  const cakeNameData = getCakeNameData(franchiseData);

  // define data series to display
  const cakeDataSeriesArray = Object.keys(cakeNameData).map((cakeName) => {
    const dataSeries = cakeNameData[cakeName].map(record => ({
      x: new Date(record.date),
      y: record.cakeSold,
    }));
    return <AreaSeries key={cakeName} data={dataSeries} />;
  });

  const cakeChart = (
    <div className="cake-chart">
      <p>Daily cake sales by type:</p>
      <FlexibleWidthXYPlot
        xType="time"
        stackBy="y"
        height={300}
      >
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        {cakeDataSeriesArray}
      </FlexibleWidthXYPlot>
      <DiscreteColorLegend
        orientation="horizontal"
        items={Object.keys(cakeNameData).map(cakeName => ({ title: cakeName }))}
      />
    </div>
  );

  return (
    <div className="cake-view">
      <p>
        Select franchise:
        {franchiseSelect}
      </p>
      {cakeChart}
    </div>
  );
};

export default CakeView;
