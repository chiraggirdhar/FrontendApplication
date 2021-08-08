import { message } from "antd";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useHistory, useLocation } from "react-router-dom";

export const EmailVerification = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let email = query.get("email");
  const [userOTP, setUserOTP] = useState({ otp: "" });
  const [userEmail, setUserEmail] = useState("");

  const handleChange = (otp) => {
    const re = /^[0-9\b]+$/;
    if (re.test(otp)) {
      setUserOTP({ otp });
    }
  };

  const handleVerifyClick = () => {
    if (userOTP.otp && userOTP.otp.length === 6) {
      history.push("/new-password");
    } else {
      message.error("otp를 확인해주세요");
    }
  };

  const handleOTPReset = () => {
    setUserOTP({ otp: "" });
    message.success('OTP가 성공적으로 전송되었습니다.');
  }

  useEffect(() => {
    if (email) {
      setUserEmail(email);
    }
  }, [email]);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img className="logo-icon" alt="logo" src="images/gradation.svg" />
        <p className="title-text">귀하의 이메일로 코드가 전송되었습니다</p>
        <p className="sub-title-text sub-title-margin">
          코드가 다음 주소로 전송되었습니다. {userEmail}
        </p>
        <p className="sub-title-text">아래 코드를 입력하세요.</p>
        <div className="form-container">
          <div className="form-row center-row">
            <OtpInput
              className="otp-input"
              value={userOTP.otp}
              onChange={handleChange}
              numInputs={6}
            />
          </div>
        </div>
        <p onClick={handleOTPReset} className="resent-code-text">코드 재전송</p>
        <div className="form-submit">
          <button onClick={handleVerifyClick} className="submit-button">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
