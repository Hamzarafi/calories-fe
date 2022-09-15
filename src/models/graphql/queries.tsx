import { gql } from "@apollo/client";

export const GET_USER_FOOD_ITEMS_QUERY = gql`
  query ($userId: String!) {
    userFoodEntries(userId: $userId) {
      id
      name
      dateAdded
      calorieValue
      excluded
    }
  }
`;

export const GET_ALL_FOOD_ITEMS_QUERY = gql`
  query {
    foodEntries {
      id
      name
      dateAdded
      calorieValue
      excluded
      user {
        id
        userName
        token
        calorieLimit
        role
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      userName
      token
      calorieLimit
      role
    }
  }
`;

export const GET_DAILY_REPORT_QUERY = gql`
  query ($userId: String!) {
    DailyUserFoodEntries(userId: $userId) {
      date
      calorieValue
    }
  }
`;

export const GET_FOOD_COUNT_QUERY = gql`
  query {
    foodEntriesCount {
      lastWeekCount
      secondLastWeekCount
    }
  }
`;

export const GET_FOOD_AVERAGE_QUERY = gql`
  query {
    foodEntriesReport {
      average
    }
  }
`;
