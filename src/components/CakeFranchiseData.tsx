import * as React from 'react';

import DatasetSelector from './DatasetSelector';

export type CakeData = Array<{
    date: string; // "%Y-%m-%d" https://github.com/d3/d3-time-format#locale_format
    franchiseId: number;
    franchiseName: string;
    income: number;
    wageCosts: number;
    ingredientsCosts: number;
    otherCosts: number;
    cake1Sold: number;
    cake1Name: string;
    cake2Sold: number;
    cake2Name: string;
    cake3Sold: number;
    cake3Name: string;
    cake4Sold: number;
    cake4Name: string;
    cake5Sold: number;
    cake5Name: string;
    cake6Sold: number;
    cake6Name: string;
}>

export type CombinedData = Array<{
  name: string;
  cakeData: CakeData;
}>

// The CakeFranchiseData component is the top level component for Assignment 3
const CakeFranchiseData: React.FC = () => {
  // keep track of data and currently selected views with state
  const [combinedData, setCombinedData] = React.useState<CombinedData>([]);
  const [dataLoadCount, setDataLoadCount] = React.useState(0);
  const [selectedDataset, setSelectedDataset] = React.useState<string>(null);

  // load data from ./data/, can be triggered by incrementing dataLoadCount
  React.useEffect(() => {
    const COUNT_DATA_FILES = 4;
    const getFileData: (n: number) => void = async (n) => {
      fetch(`./data/data${n}.json`)
        .then(response => response.json())
        .then((jsonData) => {
          setCombinedData((oldData): CombinedData => {
            const name = `data${n}`;
            const filteredOldData = oldData.filter(el => el.name !== name);
            return [...filteredOldData, { name, cakeData: jsonData }];
          });
        })
        .catch((err) => {
          console.log('Error loading data:', err);
        });
    };
    for (let i = 1; i < COUNT_DATA_FILES + 1; i += 1) {
      getFileData(i);
    }
  }, [dataLoadCount]);
  console.log('combinedData', combinedData);
  console.log('dataLoadCount', dataLoadCount);

  const triggerDataLoad = (): void => setDataLoadCount(dataLoadCount + 1);

  const dataSummary = combinedData
    .sort((a, b) => ((a.name > b.name) ? 1 : -1))
    .map((data) => {
      const { name, cakeData } = data;
      return <li key={name}>{`${name} (${cakeData.length} items)`}</li>;
    });
  return (
    <div className="cake-franchise-data">
      <h3>Cake shop data analysis</h3>
      <DatasetSelector
        combinedData={combinedData}
        selectedDataset={selectedDataset}
        triggerDataLoad={triggerDataLoad}
        setSelectedDataset={setSelectedDataset}
      />
      <p>CakeFranchiseData component</p>
      <p>Data summary:</p>
      <ul>
        {dataSummary}
      </ul>
      <button type="button" onClick={(): void => setDataLoadCount(dataLoadCount + 1)}>
        Reload
      </button>
      <p>{`Currently viewing: ${selectedDataset}`}</p>
    </div>
  );
};

export default CakeFranchiseData;
