import React, { useState } from "react";

import { message } from "antd";
import "./login.scss";
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import { validEmail } from "../utils/common";

export const Login = (props) => {
  const { setAuthentication } = props;
  const history = useHistory();
  const [userCredentials, setUserCredentials] = useState({
    input: {},
    errors: {},
  });

  const validateCredentials = () => {
    let credentials = { ...userCredentials, errors: {} };
    let isValid = true;

    if (!credentials.input["email"]) {
      isValid = false;
      credentials.errors["email"] = "이메일을 입력하세요.";
    }

    if (typeof credentials.input["email"] !== "undefined" && !validEmail(credentials.input["email"])) {
        isValid = false;
        credentials.errors["email"] = "형식이 잘못되었습니다";
    }

    if (!credentials.input["password"]) {
      isValid = false;
      credentials.errors["password"] = "비밀번호를 입력하세요.";
    }

    setUserCredentials(credentials);
    return isValid;
  };

  const handleChange = (event) => {
    let input = { ...userCredentials.input };
    input[event.target.name] = event.target.value;

    setUserCredentials({ ...userCredentials, input });
  };

  const checkCredentials = () => {
    return (
      userCredentials.input.email === "test@luxpmsoft.com" &&
      userCredentials.input.password === "test1234!."
    );
  };

  const login = () => {
    if (validateCredentials() && checkCredentials()) {
      message.success('성공적 로그인');
      setAuthentication(true);
      history.push('/dashboard');
    } else {
      message.error('잘못된 이메일 및 비밀번호');
      setAuthentication(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img className="logo-icon" alt="logo" src="images/gradation.svg" />
        <p className="login-text">로그인</p>
        <div className="form-container">
          <div className="form-row">
            <label className="label">Email</label>
            <img className="email-icon" alt="logo" src="images/email.svg" />
            <input
              name="email"
              onChange={handleChange}
              placeholder="sabahat@gmail.com"
              type="text"
            />
            <div className="text-danger">{userCredentials.errors.email}</div>
          </div>
          <div className="form-row">
            <label className="label">비밀번호</label>
            <img className="email-icon" alt="logo" src="images/password.svg" />
            <input
              name="password"
              onChange={handleChange}
              placeholder="**********"
              type="password"
            />
            <div className="text-danger">{userCredentials.errors.password}</div>
          </div>
          <p className="forgot-password">
            <a className="forgot-password-link" href="/forgot-password">비밀번호 찾기</a>
            </p>
          <div className="form-submit">
            <button onClick={login} className="submit-button">
              로그인
            </button>
            <p className="sign-up-text">
              계정이 없으신가요? 가입하기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
