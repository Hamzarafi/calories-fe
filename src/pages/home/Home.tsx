import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import styled from "styled-components";
import FoodItem from "../../components/foodItems";
import NavHeader from "../../components/NavHeader";
import UserCard from "../../components/userCard";
import { AuthContext } from "../../context/userContext";
import { GET_USER_QUERY } from "../../models/graphql/queries";
import { UserCall } from "../../models/objects/User";

function Home() {
  const context = useContext(AuthContext);

  const {
    data: userData,
    loading,
    error,
  } = useQuery<UserCall>(GET_USER_QUERY, {
    variables: { id: context?.auth.id },
  });

  return (
    <OuterContainer>
      <UserCard user={userData?.user} />
      <hr />
      <FoodItem userId={context?.auth.id} />
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

export default Home;
