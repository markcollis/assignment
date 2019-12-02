import { CakeData } from './CakeFranchiseData';

export type FranchiseSummaryData = {
  franchiseId: number; // collated by FranchiseId
  franchiseName: string;
  countDates: number; // number of records
  startDate: string; // earliest record
  endDate: string; // latest record
  totalIncome: number; // totals across all records, can be divided by countDates for mean
  totalCakesSold: number; // cake1Sold + cake2Sold + ...
  totalIngredientsCosts: number;
  totalWageCosts: number;
  totalOtherCosts: number;
}

export type FranchiseSummary = FranchiseSummaryData[]

export type FranchiseSummaryObject = {
  [key: string]: FranchiseSummaryData;
}

export const getFranchiseSummary: (data: CakeData) => FranchiseSummary = (data) => {
  const franchiseSummaryBuild: FranchiseSummaryObject = {};
  data.forEach((record) => {
    const {
      date,
      franchiseId,
      franchiseName,
      income,
      wageCosts,
      ingredientsCosts,
      otherCosts,
      cake1Sold,
      cake2Sold,
      cake3Sold,
      cake4Sold,
      cake5Sold,
      cake6Sold,
    } = record;
    const key: string = franchiseId.toString();
    const cakesSold = cake1Sold + cake2Sold + cake3Sold + cake4Sold + cake5Sold + cake6Sold;
    if (!franchiseSummaryBuild[key]) { // initialise summary for this franchiseId
      franchiseSummaryBuild[key] = {
        franchiseId,
        franchiseName,
        countDates: 1,
        startDate: date,
        endDate: date,
        totalIncome: income,
        totalCakesSold: cakesSold,
        totalIngredientsCosts: ingredientsCosts,
        totalWageCosts: wageCosts,
        totalOtherCosts: otherCosts,
      };
    } else { // add this record's data
      franchiseSummaryBuild[key].countDates += 1;
      if (franchiseSummaryBuild[key].startDate.localeCompare(date) > 0) {
        franchiseSummaryBuild[key].startDate = date;
      }
      if (franchiseSummaryBuild[key].endDate.localeCompare(date) < 0) {
        franchiseSummaryBuild[key].endDate = date;
      }
      franchiseSummaryBuild[key].totalIncome += income;
      franchiseSummaryBuild[key].totalCakesSold += cakesSold;
      franchiseSummaryBuild[key].totalIngredientsCosts += ingredientsCosts;
      franchiseSummaryBuild[key].totalWageCosts += wageCosts;
      franchiseSummaryBuild[key].totalOtherCosts += otherCosts;
    }
  });
  const franchiseSummary = Object.keys(franchiseSummaryBuild)
    .map(key => franchiseSummaryBuild[key]);
  return franchiseSummary;
};
