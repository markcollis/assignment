import * as React from 'react';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  LineSeries,
  DiscreteColorLegend,
} from 'react-vis';

import { CakeData } from './CakeFranchiseData';
import { FranchiseSummary } from './dataManipulation';

interface FranchiseViewProps {
  franchiseSummary: FranchiseSummary;
  selectedData: CakeData;
}

const FranchiseView: React.FC<FranchiseViewProps> = ({ franchiseSummary, selectedData }) => {
  if (franchiseSummary.length === 0) return <p>No franchise data to display.</p>;
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


  // define colour palette for charts
  const green = '#8ab636';
  const red1 = '#bb3333';
  const red2 = '#cc6666';
  const red3 = '#dd9999';

  // define data series to display
  const incomeDataSeries = franchiseData.map(record => ({
    x: new Date(record.date),
    y: record.income / 1000,
  }));
  const wageCostsDataSeries = franchiseData.map(record => ({
    x: new Date(record.date),
    y: record.wageCosts / 1000,
  }));
  const ingredientsCostsDataSeries = franchiseData.map(record => ({
    x: new Date(record.date),
    y: record.ingredientsCosts / 1000,
  }));
  const otherCostsDataSeries = franchiseData.map(record => ({
    x: new Date(record.date),
    y: record.otherCosts / 1000,
  }));

  const franchiseChart = (
    <div className="franchise-chart">
      <p>Daily income and costs trends (in 000 CZK):</p>
      <FlexibleWidthXYPlot
        xType="time"
        height={300}
      >
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries
          color={green}
          data={incomeDataSeries}
        />
        <LineSeries
          color={red1}
          data={wageCostsDataSeries}
        />
        <LineSeries
          color={red2}
          data={ingredientsCostsDataSeries}
        />
        <LineSeries
          color={red3}
          data={otherCostsDataSeries}
        />
      </FlexibleWidthXYPlot>
      <DiscreteColorLegend
        orientation="horizontal"
        items={[
          { title: 'income', color: green },
          { title: 'wage costs', color: red1 },
          { title: 'ingredients costs', color: red2 },
          { title: 'other costs', color: red3 },
        ]}
      />
    </div>
  );

  return (
    <div className="franchise-view">
      <p>
        Select franchise:
        {franchiseSelect}
      </p>
      {franchiseChart}
    </div>
  );
};

export default FranchiseView;
