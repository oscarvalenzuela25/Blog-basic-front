import React from "react";
import { Route, Switch } from "react-router-dom";
//import useAuth from "../hooks/userAuth";
import MenuTop from "../components/Web/MenuTop";
import Footer from "../components/Web/Footer";

const LayoutBasic = (props) => {
  const { routes } = props;

  return (
    <>
      <MenuTop />
      <LoadRoutes routes={routes} />
      <Footer />
    </>
  );
};

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={(props) => <route.component {...props} />}
        />
      ))}
    </Switch>
  );
}

export default LayoutBasic;
