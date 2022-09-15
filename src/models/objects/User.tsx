export interface UserCall {
  user: UserType;
}

export interface UserType {
  id: string;
  userName: string;
  token: string;
  calorieLimit: number;
  role: string;
}
