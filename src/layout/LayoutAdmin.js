import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/userAuth";

//Componentes
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSigIn from "../pages/admin/SignIn";
import Footer from "../components/Web/Footer";

import "./LayoutAdmin.scss";

/*Probando los componentes para generar Route de otra forma
import Admin from "../pages/admin";
import SignIn from "../pages/admin/SignIn";
*/

const LayoutAdmin = (props) => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content } = Layout;
  const { routes } = props;
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return (
      <>
        <Route path={"/admin/login"} render={() => <AdminSigIn />} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header" style={{ zIndex: 2 }}>
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />

            {/* Otra forma de ocupar el sistema de rutas
          <Route exact={true} path={"/admin"} render={() => <Admin />} />
          <Route exact={true} path={"/admin/login"} render={() => <SignIn />} />
          */}
          </Content>
          <Footer admin={"yes"} />
        </Layout>
      </Layout>
    );
  }

  return null;
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

export default LayoutAdmin;
