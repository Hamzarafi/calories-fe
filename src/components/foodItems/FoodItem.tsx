import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/userContext";
import { GET_USER_FOOD_ITEMS_QUERY } from "../../models/graphql/queries";
import { FoodItemCall, FoodItemType } from "../../models/objects/FoodItem";
import ErrorPage from "../../pages/errorPage";
import AddFoodItemPopup from "../addFoodItemPopup";
import DateDropdown from "../dateDropdown";
import LoadingComponent from "../loading";
import FoodItemRow from "./FoodItemRow";

interface Props {
  userId: string;
}

function FoodItem({ userId }: Props) {
  const context = useContext(AuthContext);
  const {
    data: foodItemsData,
    refetch,
    loading,
    error,
  } = useQuery<FoodItemCall>(GET_USER_FOOD_ITEMS_QUERY, {
    context: { headers: { Authorization: `Bearer ${context?.auth.token}` } },
    variables: {
      userId,
    },
  });

  if (error) return <ErrorPage />;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <TableSettingsContainer>
            <DateDropdown />
            <AddFoodItemPopup refetchFoodItems={refetch} userId={userId} />
          </TableSettingsContainer>
          <TableContainer className="table table-hover mt-3 ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date/Time Added</th>
                <th>Calories</th>
                <th style={{ width: "280px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodItemsData?.userFoodEntries.map((foodItem: FoodItemType) => (
                <FoodItemRow
                  key={foodItem.id}
                  foodItem={foodItem}
                  userId={userId}
                />
              ))}
            </tbody>
          </TableContainer>
        </>
      )}
    </>
  );
}

const TableSettingsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
const TableContainer = styled.table`
  width: 95%;
`;

export default FoodItem;
