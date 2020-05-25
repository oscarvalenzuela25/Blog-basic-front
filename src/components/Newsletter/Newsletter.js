import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { suscribeNewsletterApi } from "../../API/newsletter";

import "./Newsletter.scss";
const Newsletter = () => {
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!email) {
      notification["error"]({
        message: "El email no puede estar vacio",
      });
    } else {
      let validation = emailValid.test(email);
      if (!validation) {
        notification["error"]({
          message: "Debe ingresar un Email Valido",
        });
      } else {
        suscribeNewsletterApi(email)
          .then((result) => {
            if (result.code === 200) {
              notification["success"]({
                message: result.mensaje,
              });
              setEmail("");
            } else {
              notification["warning"]({
                message: result.mensaje,
              });
              setEmail("");
            }
          })
          .catch((error) => {
            notification["error"]({
              message: error.mensaje ? error.mensaje : error.message,
            });
          });
      }
    }
  };
  return (
    <div className="newsletter">
      <h3>Newsletter</h3>
      <Form onFinish={onSubmit}>
        <Form.Item>
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
            placeholder="Correo electronico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="login-form-button"
          >
            Suscribirse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Newsletter;
