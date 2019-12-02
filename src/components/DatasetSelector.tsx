import * as React from 'react';

import { LabelledCakeData } from './CakeFranchiseData';

interface DatasetSelectorProps {
  combinedData: LabelledCakeData;
  selectedDataset: string;
  triggerDataLoad: () => void;
  setSelectedDataset: (selection: string) => void;
}

const DatasetSelector: React.FC<DatasetSelectorProps> = ({
  combinedData,
  selectedDataset,
  triggerDataLoad,
  setSelectedDataset,
}) => {
  const dataSummary = combinedData
    .sort((a, b) => ((a.name > b.name) ? 1 : -1))
    .map((data) => {
      const { name, cakeData } = data;
      return (
        <li key={name}>
          <button
            type="button"
            onClick={(): void => setSelectedDataset(name)}
            className={(selectedDataset === name) ? 'active' : ''}
          >
            {`${name} (${cakeData.length} items)`}
          </button>
        </li>
      );
    });

  return (
    <div className="dataset-selector">
      <p>Select one of the following data sets:</p>
      <ul>
        {dataSummary}
      </ul>
      <button type="button" onClick={(): void => triggerDataLoad()}>
        Reload data
      </button>
    </div>
  );
};

export default DatasetSelector;
