import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import EditUserCalorieLimitPopup from "../../components/EditUserCalorieLimitPopup";
import LoadingComponent from "../../components/loading";
import { AuthContext } from "../../context/userContext";
import { GET_USER_QUERY } from "../../models/graphql/queries";
import { UserCall } from "../../models/objects/User";
import ErrorPage from "../errorPage";

function UserInfo() {
  const { id } = useParams();
  const context = useContext(AuthContext);

  const {
    data: userData,
    loading,
    error,
  } = useQuery<UserCall>(GET_USER_QUERY, {
    context: { headers: { Authorization: `Bearer ${context?.auth.token}` } },
    variables: { id },
  });

  if (error) return <ErrorPage />;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Container className="mx-auto w-75 card p-5">
          <LinkStyle
            to="/"
            className="btn btn-light btn-sm w-25 d-inline ms-auto"
          >
            Back
          </LinkStyle>

          <h1>{userData?.user.userName}</h1>
          <p>Calorie Limit: {userData?.user.calorieLimit}</p>

          <EditUserCalorieLimitPopup userId={id} />
        </Container>
      )}
    </>
  );
}
const LinkStyle = styled(Link)`
  background-color: lightgray;
  border-radius: 8px;
`;

const Container = styled.div`
  margin: 100px;
  background: #f8f8f8;
`;
export default UserInfo;
