import React, { useState, useEffect } from "react";
import { updateMenuApi } from "../../../../API/menu";
import { Form, Input, Button, notification } from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import { getAccessToken } from "../../../../API/auth";

import "./EditMenuWebForm.scss";

const EditMenuWebForm = (props) => {
  const { setIsVisibleModal, menu, setReloadMenuWeb } = props;
  const [menuWebData, setMenuWebData] = useState(menu);

  useEffect(() => {
    setMenuWebData(menu);
  }, [menu]);

  const editMenu = () => {
    if (!menuWebData.title || !menuWebData.url) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const accessToken = getAccessToken();
      updateMenuApi(accessToken, menuWebData._id, menuWebData)
        .then((response) => {
          notification["success"]({
            message: response,
          });
        })
        .catch((error) => {
          notification["error"]({
            message: "Error del servidor",
          });
          console.log(error);
        });
      setIsVisibleModal(false);
      setReloadMenuWeb(true);
    }
  };

  return (
    <div className="edit-menu-web-form">
      <EditForm
        editMenu={editMenu}
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
      />
    </div>
  );
};

const EditForm = (props) => {
  const { menuWebData, setMenuWebData, editMenu } = props;

  return (
    <Form className="form-edit" onFinish={editMenu}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder="Titulo"
          value={menuWebData.title}
          onChange={(e) =>
            setMenuWebData({ ...menuWebData, title: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="URL"
          value={menuWebData.url}
          onChange={(e) =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Menu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditMenuWebForm;
