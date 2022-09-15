import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle className="text-danger" size="5em" />
      <h1>401</h1>
      <p className="lead">Sorry, You are not authorized to see this Page</p>
      <Link to="/" className="btn btn-primary">
        Go Back
      </Link>
    </div>
  );
}

export default UnauthorizedPage;
