import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/userContext";
import {
  LOGIN_USER_MUTATION,
  REGISTER_USER_MUTATION,
} from "../../models/graphql/mutations";
import { UserCall } from "../../models/objects/User";

function Login() {
  const [signUp, setSignUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [registerUser] = useMutation(REGISTER_USER_MUTATION, {
    variables: { userName, password },
    onCompleted(data) {
      context?.setAuthAndSave(data.addUser);
      navigate("/");
    },
  });

  const [loginUser] = useMutation(LOGIN_USER_MUTATION, {
    variables: { userName, password },
    onCompleted(data) {
      context?.setAuthAndSave(data.userLogin);
      navigate("/");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!password || !userName) {
      return alert("Please fill in all fields");
    }

    if (signUp) {
      registerUser();
    } else {
      loginUser();
    }
  };

  return (
    <AuthFormContainer>
      <AuthForm>
        <AuthFormContent>
          <AuthFormTitle>{`Sign  ${signUp ? "Up" : "In"}`}</AuthFormTitle>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="Enter Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <p
            className=" text-center mt-2 btn-link"
            style={{ cursor: "pointer" }}
            onClick={() => setSignUp(!signUp)}
          >
            {signUp ? "Sign In instead?" : "Sign Up instead?"}
          </p>
        </AuthFormContent>
      </AuthForm>
    </AuthFormContainer>
  );
}

const AuthFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  label {
    font-size: 14px;
    font-weight: 600;
    color: rgb(34, 34, 34);
  }
`;
const AuthForm = styled.form`
  width: 420px;
  box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
  padding-top: 30px;
  padding-bottom: 20px;
  border-radius: 8px;
  background-color: white;
`;
const AuthFormContent = styled.div`
  padding-left: 12%;
  padding-right: 12%;
`;
const AuthFormTitle = styled.h3`
  text-align: center;
  margin-bottom: 1em;
  font-size: 24px;
  color: rgb(34, 34, 34);
  font-weight: 800;
`;

export default Login;
