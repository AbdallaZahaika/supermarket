import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../store";

interface Props {
  component: Function;
  path: string;
  exact?: boolean;
  admin?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  path,
  exact,
  admin,
}) => {
  const { userActive, user } = useSelector((state: RootStore) => state.user);
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        if (!userActive || (admin && !user.admin)) {
          return <Redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
