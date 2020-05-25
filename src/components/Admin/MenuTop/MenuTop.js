import React from "react";
import Logo from "../../../assets/img/logo-nuevo-admin.png";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { logout } from "../../../API/auth";

import "./MenuTop.scss";

const MenuTop = ({ menuCollapsed, setMenuCollapsed }) => {
  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" className="menu-top__left-logo" />
        </Link>

        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={() => logoutUser()}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
};

export default MenuTop;
