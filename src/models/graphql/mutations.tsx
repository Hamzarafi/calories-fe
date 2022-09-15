import { gql } from "@apollo/client";

export const ADD_FOOD_ITEM_MUTATION = gql`
  mutation ($name: String!, $calorieValue: Int!, $userId: ID!) {
    addFoodEntry(name: $name, calorieValue: $calorieValue, userId: $userId) {
      id
      name
    }
  }
`;

export const UPDATE_FOOD_ITEM_MUTATION = gql`
  mutation ($id: ID!, $name: String, $calorieValue: Int, $excluded: Boolean) {
    updateFoodEntry(
      id: $id
      name: $name
      calorieValue: $calorieValue
      excluded: $excluded
    ) {
      id
      name
    }
  }
`;

export const DELETE_FOOD_ITEM_MUTATION = gql`
  mutation ($id: ID!) {
    deleteFoodEntry(id: $id) {
      id
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation ($id: ID!, $calorieLimit: Int) {
    updateUser(id: $id, calorieLimit: $calorieLimit) {
      id
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation ($userName: String!, $password: String!) {
    addUser(userName: $userName, password: $password) {
      id
      userName
      token
      calorieLimit
      role
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation ($userName: String!, $password: String!) {
    userLogin(userName: $userName, password: $password) {
      id
      userName
      token
      calorieLimit
      role
    }
  }
`;
