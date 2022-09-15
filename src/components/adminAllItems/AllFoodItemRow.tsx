import { useMutation } from "@apollo/client";
import moment from "moment";
import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Form from "react-bootstrap/Form";

import {
  DELETE_FOOD_ITEM_MUTATION,
  UPDATE_FOOD_ITEM_MUTATION,
} from "../../models/graphql/mutations";
import {
  GET_ALL_FOOD_ITEMS_QUERY,
  GET_DAILY_REPORT_QUERY,
  GET_USER_FOOD_ITEMS_QUERY,
} from "../../models/graphql/queries";
import { FoodItemType } from "../../models/objects/FoodItem";
import styled from "styled-components";
import { AuthContext } from "../../context/userContext";

interface Props {
  foodItem: FoodItemType;
}

function AllFoodItemRow({ foodItem }: Props) {
  const context = useContext(AuthContext);

  const userId = context?.auth.id;
  const [deleteFoodItem] = useMutation(DELETE_FOOD_ITEM_MUTATION, {
    context: { headers: { Authorization: `Bearer ${context?.auth.token}` } },
    variables: { id: foodItem.id },
    refetchQueries: [{ query: GET_ALL_FOOD_ITEMS_QUERY }],
  });

  const [updateFoodItem] = useMutation(UPDATE_FOOD_ITEM_MUTATION, {
    context: { headers: { Authorization: `Bearer ${context?.auth.token}` } },
    refetchQueries: [
      { query: GET_ALL_FOOD_ITEMS_QUERY },
      { query: GET_DAILY_REPORT_QUERY, variables: { userId } },
    ],
  });

  const onDeleteHandler = () => {
    deleteFoodItem();
  };

  const formatDate = (DateString: string) => {
    return moment(DateString).calendar();
  };

  const handleSwitchChange = () => {
    const excluded = !foodItem.excluded;
    updateFoodItem({ variables: { id: foodItem.id, excluded } });
  };

  return (
    <tr>
      <td>{foodItem.name}</td>
      <td>{formatDate(foodItem.dateAdded)}</td>
      <td>{foodItem.user?.userName}</td>
      <td>{foodItem.calorieValue}</td>
      <StyledRow>
        <button className="btn btn-danger btn-sm" onClick={onDeleteHandler}>
          <FaTrash />
        </button>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label={`${foodItem.excluded ? "Excluded from total" : ""}`}
            checked={foodItem.excluded}
            onChange={handleSwitchChange}
          />
        </Form>
      </StyledRow>
    </tr>
  );
}

const StyledRow = styled.td`
  display: flex;
  width: 280px;
  align-items: center;

  form {
    padding: 0 10px;
  }
`;

export default AllFoodItemRow;
