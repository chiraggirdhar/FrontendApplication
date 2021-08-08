import { message } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const NewPassword = () => {
  const history = useHistory();
  const [userPassword, setUserPassword] = useState({
    input: {},
    errors: {},
  });

  const validatePassword = () => {
    let password = { ...userPassword, errors: {} };
    let isValid = true;

    if (!password.input["password"]) {
      isValid = false;
      password.errors["password"] = "비밀번호를 입력하세요.";
    }

    setUserPassword(password);
    return isValid;
  };
  const handleNewPassword = () => {
    if (validatePassword()) {
      message.success("비밀번호가 성공적으로 변경되었습니다.");
      history.push("/login");
    } else {
      message.error("새 비밀번호를 입력하세요");
    }
  };

  const handleChange = (event) => {
    let input = { ...userPassword.input };
    input[event.target.name] = event.target.value;
    setUserPassword({ ...userPassword, input });
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img className="logo-icon" alt="logo" src="images/gradation.svg" />
        <p className="title-text new-password-text">새로운 암호를 입력하세요</p>
        <div className="form-container forget-password-container">
          <div className="form-row">
            <label className="label">새 비밀번호</label>
            <img className="email-icon" alt="logo" src="images/password.svg" />
            <input
              onChange={handleChange}
              name="password"
              placeholder="**********"
              type="password"
            />
          </div>
        </div>
        <div className="form-submit">
          <button onClick={handleNewPassword} className="submit-button">
            새 비밀번호 설정
          </button>
        </div>
      </div>
    </div>
  );
};
