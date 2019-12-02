import * as React from 'react';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  VerticalBarSeries,
  DiscreteColorLegend,
} from 'react-vis';

import { FranchiseSummary } from './dataManipulation';

interface SummaryViewProps {
  franchiseSummary: FranchiseSummary;
}

const SummaryView: React.FC<SummaryViewProps> = ({ franchiseSummary }) => {
  const textSummary: JSX.Element = (
    <div className="text-summary">
      <p>This data set contains data for the following franchises:</p>
      <ul>
        {franchiseSummary.map((franchise) => {
          const {
            franchiseId,
            franchiseName,
            countDates,
            startDate,
            endDate,
          } = franchise;
          return (
            <li key={franchiseId}>
              {`${franchiseName} (#${franchiseId}), ${countDates} records between ${startDate} and ${endDate}`}
            </li>
          );
        })}
      </ul>
    </div>
  );

  // define colour palette for charts
  const green = '#8ab636';
  const red1 = '#bb3333';
  const red2 = '#cc6666';
  const red3 = '#dd9999';

  const incomeDataSeries = franchiseSummary.map(franchise => ({
    x: franchise.franchiseName,
    y: franchise.totalIncome / (franchise.countDates * 1000),
  }));
  const wageCostsDataSeries = franchiseSummary.map(franchise => ({
    x: franchise.franchiseName,
    y: franchise.totalWageCosts / (franchise.countDates * 1000),
  }));
  const ingredientsCostsDataSeries = franchiseSummary.map(franchise => ({
    x: franchise.franchiseName,
    y: franchise.totalIngredientsCosts / (franchise.countDates * 1000),
  }));
  const otherCostsDataSeries = franchiseSummary.map(franchise => ({
    x: franchise.franchiseName,
    y: franchise.totalOtherCosts / (franchise.countDates * 1000),
  }));

  const summaryChart = (
    <div className="summary-chart">
      <p>Mean daily income and costs (in 000 CZK) by franchise:</p>
      <FlexibleWidthXYPlot
        xType="ordinal"
        stackBy="y"
        height={300}
      >
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          cluster="income"
          color={green}
          data={incomeDataSeries}
        />
        <VerticalBarSeries
          cluster="costs"
          color={red1}
          data={wageCostsDataSeries}
        />
        <VerticalBarSeries
          cluster="costs"
          color={red2}
          data={ingredientsCostsDataSeries}
        />
        <VerticalBarSeries
          cluster="costs"
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

  const volumeDataSeries = franchiseSummary.map(franchise => ({
    x: franchise.franchiseName,
    y: franchise.totalCakesSold / franchise.countDates,
  }));

  const volumeChart = (
    <div className="volume-chart">
      <p>Mean cakes sold per day by franchise:</p>
      <FlexibleWidthXYPlot
        xType="ordinal"
        height={300}
      >
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          color={green}
          data={volumeDataSeries}
        />
      </FlexibleWidthXYPlot>
    </div>
  );

  return (
    <div className="summary-view">
      {textSummary}
      {summaryChart}
      {volumeChart}
    </div>
  );
};

export default SummaryView;
