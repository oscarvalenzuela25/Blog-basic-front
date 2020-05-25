import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

//Componentes
import { signUpAdminApi } from "../../../../API/user";
import { getAccessToken } from "../../../../API/auth";

//Estilos
import "./AddUserForm.scss";

const AddUserForm = (props) => {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [userData, setUserData] = useState({});

  //Funcion del formulario
  const addUser = () => {
    if (
      !userData.name ||
      !userData.lastname ||
      !userData.role ||
      !userData.email ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (userData.password !== userData.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas deben ser iguales",
        });
      } else {
        const accesToken = getAccessToken();

        signUpAdminApi(accesToken, userData)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setIsVisibleModal(false);
            setReloadUsers(true);
            setUserData({});
          })
          .catch((error) => {
            notification["error"]({
              message: error,
            });
          });
      }
    }
  };

  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
};

const AddForm = (props) => {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;
  return (
    <Form className="form-add" onFinish={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              value={userData.name}
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellido"
              value={userData.lastname}
              onChange={(e) => {
                setUserData({ ...userData, lastname: e.target.value });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Correo electronico"
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona un rol"
              onChange={(e) => {
                setUserData({ ...userData, role: e });
              }}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviwer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="Password"
              value={userData.password}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="Repeat password"
              value={userData.repeatPassword}
              onChange={(e) => {
                setUserData({ ...userData, repeatPassword: e.target.value });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
