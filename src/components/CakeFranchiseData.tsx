import * as React from 'react';

import DatasetSelector from './DatasetSelector';
import ThemeSelector from './ThemeSelector';
import DataViewer from './DataViewer';

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

export type LabelledCakeData = Array<{
  name: string;
  cakeData: CakeData;
}>

// The CakeFranchiseData component is the top level component for Assignment 3
const CakeFranchiseData: React.FC = () => {
  // keep track of data and currently selected views with state
  const [combinedData, setCombinedData] = React.useState<LabelledCakeData>([]);
  const [dataLoadCount, setDataLoadCount] = React.useState(0);
  const [selectedDataset, setSelectedDataset] = React.useState<string>(null);
  const [selectedTheme, setSelectedTheme] = React.useState(0);

  // expand as required while building appropriate views in DataViewer
  const THEMES = ['Summary', 'Shop performance', 'Cake performance'];

  // load data from ./data/, can be triggered by incrementing dataLoadCount
  React.useEffect(() => {
    const COUNT_DATA_FILES = 4;
    const getFileData: (n: number) => void = async (n) => {
      fetch(`./data/data${n}.json`)
        .then(response => response.json())
        .then((jsonData) => {
          setCombinedData((oldData): LabelledCakeData => {
            const name = `data${n}`;
            const filteredOldData = oldData.filter(el => el.name !== name);
            return [...filteredOldData, { name, cakeData: jsonData }];
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('Error loading data:', err);
        });
    };
    for (let i = 1; i < COUNT_DATA_FILES + 1; i += 1) {
      getFileData(i);
    }
  }, [dataLoadCount]);

  const selectedLabelledData = combinedData.find(dataset => dataset.name === selectedDataset);
  const selectedData = (selectedLabelledData) ? selectedLabelledData.cakeData : [];
  const triggerDataLoad = (): void => setDataLoadCount(dataLoadCount + 1);

  return (
    <div className="cake-franchise-data">
      <div className="selectors">
        <DatasetSelector
          combinedData={combinedData}
          selectedDataset={selectedDataset}
          triggerDataLoad={triggerDataLoad}
          setSelectedDataset={setSelectedDataset}
        />
        <ThemeSelector
          themes={THEMES}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
      </div>
      <DataViewer
        selectedData={selectedData}
        selectedTheme={selectedTheme}
      />
    </div>
  );
};

export default CakeFranchiseData;
