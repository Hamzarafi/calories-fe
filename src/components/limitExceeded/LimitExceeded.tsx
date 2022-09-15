import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { AuthContext } from "../../context/userContext";
import { GET_DAILY_REPORT_QUERY } from "../../models/graphql/queries";
import { ReportItemType, ReportType } from "../../models/objects/SummaryReport";
import LoadingComponent from "../loading";

function LimitExceeded() {
  const context = useContext(AuthContext);

  const {
    data: foodData,
    loading,
    error,
  } = useQuery<ReportType>(GET_DAILY_REPORT_QUERY, {
    context: { headers: { Authorization: `Bearer ${context?.auth.token}` } },
    variables: { userId: context?.auth.id },
  });

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div>
          <StyledTitle>Days Limit Exceeded</StyledTitle>
          <CardContainer>
            {foodData?.DailyUserFoodEntries.map(
              (element: ReportItemType, index) =>
                element.calorieValue - context?.auth.calorieLimit > 0 && (
                  <StyledCard key={`limit-card${index}`} body>
                    <h4>{element.date}</h4>
                    {`Limit exceeded by: ${
                      element.calorieValue - context?.auth.calorieLimit
                    }`}
                  </StyledCard>
                )
            )}
          </CardContainer>
        </div>
      )}
    </>
  );
}
const StyledTitle = styled.h1`
  margin: 25px;
  text-align: center;
`;

const StyledCard = styled(Card)`
  margin: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default LimitExceeded;
