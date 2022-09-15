import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { UserType } from "../../models/objects/User";
import styled from "styled-components";

interface Props {
  user: UserType | undefined;
}

function UserCard({ user }: Props) {
  const navigate = useNavigate();
  return (
    <StyledCard>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title>{user?.userName}</Card.Title>
          <Button
            className="btn btn-light"
            onClick={() => navigate(`/user/${user?.id}`)}
          >
            View
          </Button>
        </div>
        <Card.Subtitle className="mb-2 text-muted">
          Daily Calorie Limit: <strong>{user?.calorieLimit.toString()}</strong>
        </Card.Subtitle>
      </Card.Body>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  margin: 30px;
  width: 50%;
`;

export default UserCard;
