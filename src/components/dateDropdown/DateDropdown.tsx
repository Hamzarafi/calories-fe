import React from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { DateFields } from "../../config/constants";

interface Props {
  setDateFilter: () => void;
}

function DateDropdown() {
  return (
    <FormContainer>
      {(Object.keys(DateFields) as Array<keyof typeof DateFields>).map(
        (key) => (
          <option key={key} value={key}>
            {DateFields[key]}
          </option>
        )
      )}
    </FormContainer>
  );
}

const FormContainer = styled(Form.Select)`
  width: 130px;
  margin: 10px;
`;

export default DateDropdown;
