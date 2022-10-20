import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {props.isLoggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;
