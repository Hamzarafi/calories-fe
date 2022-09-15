import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { AuthContext } from "../../context/userContext";
import {
  GET_FOOD_AVERAGE_QUERY,
  GET_FOOD_COUNT_QUERY,
} from "../../models/graphql/queries";

function AdminSummary() {
  const context = useContext(AuthContext);

  const { data: dataCount, loading: loadingCount } = useQuery(
    GET_FOOD_COUNT_QUERY,
    {
      context: { headers: { Authorization: `Bearer ${context?.auth.token}` } },
    }
  );

  const { data: dataAverage, loading: loadingAverage } = useQuery(
    GET_FOOD_AVERAGE_QUERY,
    {
      context: { headers: { Authorization: `Bearer ${context?.auth.token}` } },
    }
  );

  return (
    <div>
      <StyledCard>
        <Card.Body>
          <Card.Title>Last week</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Total entries:{" "}
            <strong>{dataCount?.foodEntriesCount.lastWeekCount}</strong>
          </Card.Subtitle>
        </Card.Body>
      </StyledCard>
      <StyledCard>
        <Card.Body>
          <Card.Title>Second last week</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Total entries:{" "}
            <strong>{dataCount?.foodEntriesCount.secondLastWeekCount}</strong>
          </Card.Subtitle>
        </Card.Body>
      </StyledCard>
      <br />
      <StyledCard>
        <Card.Body>
          <Card.Title>Average Calories added by user per week</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Total entries:{" "}
            <strong>{dataAverage?.foodEntriesReport.average}</strong>
          </Card.Subtitle>
        </Card.Body>
      </StyledCard>
    </div>
  );
}

const StyledCard = styled(Card)`
  margin: 30px;
  width: 50%;
`;

export default AdminSummary;
