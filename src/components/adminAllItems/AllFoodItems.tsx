import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/userContext";
import {
  GET_ALL_FOOD_ITEMS_QUERY,
  GET_USER_FOOD_ITEMS_QUERY,
} from "../../models/graphql/queries";
import { FoodItemCall, FoodItemType } from "../../models/objects/FoodItem";
import ErrorPage from "../../pages/errorPage";
import LoadingComponent from "../loading";
import AllFoodItemRow from "./AllFoodItemRow";

interface Props {}

function AllFoodItems({}: Props) {
  const context = useContext(AuthContext);

  const {
    data: foodItemsData,
    refetch,
    loading,
    error,
  } = useQuery(GET_ALL_FOOD_ITEMS_QUERY, {
    context: { headers: { Authorization: `Bearer ${context?.auth.token}` } },

    variables: {},
  });

  if (error) return <ErrorPage />;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Container>
          <TableContainer className="table table-hover mt-3 ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date/Time Added</th>
                <th>Added by</th>
                <th>Calories</th>
                <th style={{ width: "280px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodItemsData?.foodEntries.map((foodItem: FoodItemType) => (
                <AllFoodItemRow key={foodItem.id} foodItem={foodItem} />
              ))}
            </tbody>
          </TableContainer>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const TableContainer = styled.table`
  width: 95%;
`;

export default AllFoodItems;
