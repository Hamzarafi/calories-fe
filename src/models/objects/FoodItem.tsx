import { UserType } from "./User";

export interface FoodItemCall {
  userFoodEntries: FoodItemType[];
}

export interface FoodItemType {
  id: string;
  name: string;
  dateAdded: string;
  calorieValue: number;
  excluded: boolean;
  user?: UserType;
}
