import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import { getAccessToken } from "../../../API/auth";

//Componentes
import RegisterForm from "../../../components/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";

import "./SignIn.scss";

const SignIn = () => {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  if (getAccessToken()) {
    return <Redirect to="/admin/" />;
  }

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Entrar</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span>Nuevo Usuario</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default SignIn;
