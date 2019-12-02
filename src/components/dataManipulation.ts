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

export type CakeNameData = {
  date: string;
  franchiseId: number;
  cakeName: string;
  cakeSold: number;
}

export type CakeNameCollatedData = {
  [key: string]: CakeNameData[];
}

export const getCakeNameData: (data: CakeData) => CakeNameCollatedData = (data) => {
  const collatedData: CakeNameCollatedData = {};
  data.forEach((record) => {
    const {
      date,
      franchiseId,
      cake1Name,
      cake1Sold,
      cake2Name,
      cake2Sold,
      cake3Name,
      cake3Sold,
      cake4Name,
      cake4Sold,
      cake5Name,
      cake5Sold,
      cake6Name,
      cake6Sold,
    } = record;
    const cake1Record = { date, franchiseId, cakeName: cake1Name, cakeSold: cake1Sold };
    const cake2Record = { date, franchiseId, cakeName: cake2Name, cakeSold: cake2Sold };
    const cake3Record = { date, franchiseId, cakeName: cake3Name, cakeSold: cake3Sold };
    const cake4Record = { date, franchiseId, cakeName: cake4Name, cakeSold: cake4Sold };
    const cake5Record = { date, franchiseId, cakeName: cake5Name, cakeSold: cake5Sold };
    const cake6Record = { date, franchiseId, cakeName: cake6Name, cakeSold: cake6Sold };
    if (!collatedData[cake1Name]) {
      collatedData[cake1Name] = [cake1Record];
    } else {
      collatedData[cake1Name].push(cake1Record);
    }
    if (!collatedData[cake2Name]) {
      collatedData[cake2Name] = [cake2Record];
    } else {
      collatedData[cake2Name].push(cake2Record);
    }
    if (!collatedData[cake3Name]) {
      collatedData[cake3Name] = [cake3Record];
    } else {
      collatedData[cake3Name].push(cake3Record);
    }
    if (!collatedData[cake4Name]) {
      collatedData[cake4Name] = [cake4Record];
    } else {
      collatedData[cake4Name].push(cake4Record);
    }
    if (!collatedData[cake5Name]) {
      collatedData[cake5Name] = [cake5Record];
    } else {
      collatedData[cake5Name].push(cake5Record);
    }
    if (!collatedData[cake6Name]) {
      collatedData[cake6Name] = [cake6Record];
    } else {
      collatedData[cake6Name].push(cake6Record);
    }
  });
  return collatedData;
};
