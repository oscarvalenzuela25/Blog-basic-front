import React, { useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";
import { addMenuApi } from "../../../../API/menu";
import { getAccessToken } from "../../../../API/auth";

import "./AddMenuWebForm.scss";

const AddMenuWebForm = (props) => {
  const { setIsVisibleModal, setReloadMenuWeb } = props;
  const [menuWebData, setMenuWebData] = useState({});

  const addMenu = () => {
    let finalData = {
      title: menuWebData.title,
      url: menuWebData.http
        ? menuWebData.http + menuWebData.url
        : menuWebData.url,
    };

    if (!finalData.title || !finalData.url || !menuWebData.url) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const accessToken = getAccessToken();
      finalData.active = false;
      finalData.order = 1000;

      addMenuApi(accessToken, finalData)
        .then((result) => {
          notification["success"]({
            message: result,
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
          setMenuWebData({});
          finalData = {};
        })
        .catch((error) => {
          notification["error"]({
            message: error.message,
          });
        });
    }
  };

  return (
    <div className="add-menu-web-form">
      <AddForm
        addMenu={addMenu}
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
      />
    </div>
  );
};

const AddForm = (props) => {
  const { addMenu, menuWebData, setMenuWebData } = props;
  const { Option } = Select;
  const selectBefore = (
    <Select
      defaultValue="http://"
      style={{ width: 90 }}
      onChange={(e) => {
        setMenuWebData({ ...menuWebData, http: e });
      }}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
      <Option value="">Interno</Option>
    </Select>
  );
  return (
    <Form className="form-add" onFinish={addMenu}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder="Titulo"
          value={menuWebData.title}
          onChange={(e) => {
            setMenuWebData({ ...menuWebData, title: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          addonBefore={selectBefore}
          placeholder="URL"
          value={menuWebData.url}
          onChange={(e) => {
            setMenuWebData({ ...menuWebData, url: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Menu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddMenuWebForm;
