import "./App.scss";
import { Login } from "./login/login";
import {
  useHistory,
  Switch,
  Route,
} from "react-router-dom";
import { Dashboard } from "./dashboard/index";
import { FrogetPassword } from "./login/forgetPassword";
import { EmailVerification } from "./login/emailVerification";
import { NewPassword } from "./login/newPassword";
import { useEffect, useState } from "react";
import { PrivateRoute } from "./utils/PrivateRoute";

function App() {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleUserAuthentication = (authentication) => {
    setIsAuthenticated(authentication);
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      history.push("/login");
    }
  }, [history]);

  return (
      <Switch>
        <Route exact path="/new-password">
          <NewPassword />
        </Route>
        <Route exact path="/email-verification">
          <EmailVerification />
        </Route>
        <Route exact path="/forgot-password">
          <FrogetPassword />
        </Route>
        <PrivateRoute
          authed={isAuthenticated}
          path="/dashboard"
          component={Dashboard}
        />
        <Route path="/login">
          <Login setAuthentication={handleUserAuthentication} />{" "}
        </Route>
      </Switch>
  );
}

export default App;
