import { useMutation } from "@apollo/client";
import { FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UPDATE_USER_MUTATION } from "../../models/graphql/mutations";
import { GET_USER_QUERY } from "../../models/graphql/queries";
import styled from "styled-components";
import { AuthContext } from "../../context/userContext";

interface Props {
  userId: string | undefined;
}

function EditUserCalorieLimitPopup({ userId }: Props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const [caloriesLimit, setCaloriesLimit] = useState(0);

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    variables: { id: userId, calorieLimit: caloriesLimit },
    context: { headers: { Authorization: `Bearer ${context?.auth.token}` } },
    refetchQueries: [{ query: GET_USER_QUERY, variables: { id: userId } }],
    onCompleted: () => navigate("/"),
  });

  const onSaveHandler = () => {
    if (!caloriesLimit) {
      return alert("Please fill in all fields");
    }

    updateUser();
    setCaloriesLimit(0);
    setShow(false);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <StyledButton variant="primary" onClick={handleShow}>
        <FaList className="icon" />
        Edit User
      </StyledButton>

      <div
        className="modal fade"
        id="addFoodItemModal"
        aria-labelledby="addFoodItemModalLabel"
        aria-hidden="true"
      >
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label className="form-label">Calories Limit</label>
                <input
                  type="caloriesLimit"
                  className="form-control"
                  inputMode="numeric"
                  id="caloriesLimit"
                  value={caloriesLimit?.toString()}
                  onChange={(e) =>
                    e.target.value
                      ? setCaloriesLimit(parseInt(e.target.value))
                      : setCaloriesLimit(0)
                  }
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSaveHandler}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 170px;
  margin: 10px;
`;

export default EditUserCalorieLimitPopup;
