import * as React from 'react';

import { CombinedData } from './CakeFranchiseData';

interface DatasetSelectorProps {
  combinedData: CombinedData;
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
          <button type="button" onClick={(): void => setSelectedDataset(name)}>
            {`${name} (${cakeData.length} items)`}
          </button>
        </li>
      );
    });

  return (
    <div className="dataset-selector">
      <p>Data summary:</p>
      <ul>
        {dataSummary}
      </ul>
      <button type="button" onClick={(): void => triggerDataLoad()}>
        Reload
      </button>
      <p>{`Currently viewing: ${selectedDataset}`}</p>
    </div>
  );
};

export default DatasetSelector;
