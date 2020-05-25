import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

//Componentes
import {
  minLengthValidation,
  emailValidation
} from "../../utils/formValidation";

//Funciones
import { signUpApi } from "../../API/user";
import "./RegisterForm.scss";

const RegisterForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false
  });
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false
  });

  const changeForm = e => {
    if (e.target.name !== "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value
      });
    } else {
      inputs.privacyPolicy = !inputs.privacyPolicy;
    }
  };

  const inputValidation = e => {
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target)
      });
    }

    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 6)
      });
    }

    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked
      });
    }
  };

  const register = async () => {
    //const { email, password, repeatPassword, privacyPolicy } = formValid;
    const emailVal = inputs.email.toLowerCase();
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;

    if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios"
      });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales"
        });
      } else {
        const result = await signUpApi(inputs);

        if (!result.ok) {
          notification["error"]({
            message: result.mensaje
          });
        } else {
          notification["success"]({
            message: result.mensaje
          });
          resetForm();
        }
      }
    }
  };

  const resetForm = () => {
    const input = document.getElementsByClassName("register-form__input");
    for (let x of input) {
      x.classList.remove("success");
      x.classList.remove("error");
    }

    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false
    });
  };

  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item
        rules={[
          { required: true, message: "Porfavor ingrese un email valido" }
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="register-form__input"
          value={inputs.email}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          value={inputs.password}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir Contraseña"
          className="register-form__input"
          value={inputs.repeatPassword}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
        >
          He leido y acepto las politicas de privacidad
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
