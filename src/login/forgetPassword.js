import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { validEmail } from "../utils/common";
import { message } from "antd";

export const FrogetPassword = () => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState({
    input: {},
    errors: {},
  });

  const handleChange = (event) => {
    let input = { ...userEmail.input };
    input[event.target.name] = event.target.value;

    setUserEmail({ ...userEmail, input });
  };

  const validateEmail = () => {
    let user = { ...userEmail, errors: {} };
    let isValid = true;

    if (!user.input["email"]) {
      isValid = false;
      user.errors["email"] = "이메일을 입력하세요.";
    }

    if (typeof user.input["email"] !== "undefined" && !validEmail(user.input["email"])) {
        isValid = false;
        user.errors["email"] = "형식이 잘못되었습니다";
    }
    setUserEmail(user);
    return isValid;
  }

  const handleEmailSubmit = () => {
    if(validateEmail()) {
      message.success('OTP 성공적으로 전송');
      history.push(`/email-verification?email=${userEmail.input["email"]}`);
    }else {
      message.error('이메일 주소를 확인해주세요');
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img className="logo-icon" alt="logo" src="images/gradation.svg" />
        <p className="title-text">비밀번호를 잊으 셨나요 ?</p>
        <p className="sub-title-text">계정과 연결된 이메일을 입력하세요.</p>
        <div className="form-container forget-password-container">
          <div className="form-row email-forget-password">
            <label className="label">Email</label>
            <img className="email-icon" alt="logo" src="images/email.svg" />
            <input
              name="email"
              onChange={handleChange}
              placeholder="sabahat@gmail.com"
              type="text"
            />
            <div className="text-danger">
               {userEmail.errors.email} 
            </div>
          </div>
        </div>
        <div className="form-submit">
          <button onClick={handleEmailSubmit} className="submit-button">이메일 제출</button>
        </div>
      </div>
    </div>
  );
};
