type valuesType = {
  goalId: string;
  cardHeading: string;
  amount: number;
  totalAmount: number;
  daystoGo: number;
  maturityDate: string;
}

type dataTypeInnerSection = {
  goalTypeId: string;
  goalType: string;
  values: valuesType[];
}
export type dataType = {
  data: dataTypeInnerSection[];
}
