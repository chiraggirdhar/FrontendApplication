import React from "react";
import { useHistory } from "react-router-dom";

export const Dashboard = () => {
    const history = useHistory();

    const handleLogOut = () => {
        history.push('/login');
    }
    return(
        <div className="dashboard-text">
            <p>Coming soon</p>
            <button onClick={handleLogOut}>로그 아웃</button>
        </div>
    )
}