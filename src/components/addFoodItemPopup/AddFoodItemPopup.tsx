import { useMutation } from "@apollo/client";
import { FaList } from "react-icons/fa";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ADD_FOOD_ITEM_MUTATION } from "../../models/graphql/mutations";
import styled from "styled-components";
import { AuthContext } from "../../context/userContext";

interface Props {
  refetchFoodItems: () => void;
  userId: string;
}

function AddFoodItemPopup({ refetchFoodItems, userId }: Props) {
  const context = useContext(AuthContext);

  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);

  const [addFoodItem] = useMutation(ADD_FOOD_ITEM_MUTATION, {
    context: { headers: { Authorization: `Bearer ${context?.auth.token}` } },
    variables: { name, calorieValue: calories, userId },
    onCompleted: () => refetchFoodItems(),
  });

  const onSaveHandler = () => {
    if (name === "" || !calories) {
      return alert("Please fill in all fields");
    }

    addFoodItem();
    setName("");
    setCalories(0);
    setShow(false);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <StyledButton variant="primary" onClick={handleShow}>
        <FaList className="icon" />
        Add Food Item
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
            <Modal.Title>Add Food Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Calories</label>
                <input
                  type="calories"
                  className="form-control"
                  inputMode="numeric"
                  id="calories"
                  value={calories?.toString()}
                  onChange={(e) =>
                    e.target.value
                      ? setCalories(parseInt(e.target.value))
                      : setCalories(0)
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

export default AddFoodItemPopup;
