export interface ReportType {
  DailyUserFoodEntries: ReportItemType[];
}

export interface ReportItemType {
  date: string;
  calorieValue: number;
}
