import React, { useState, useEffect } from "react";
import { Menu, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { getMenus } from "../../../API/menu";
import logoNuevo from "../../../assets/img/logo-nuevo.png";
import SocialLinks from "../SocialLinks";

import "./MenuTop.scss";

const MenuTop = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenus().then((response) => {
      const arrayMenu = [];
      response.map((menu) => {
        if (menu.active) {
          arrayMenu.push(menu);
        }
      });
      setMenuData(arrayMenu);
    });
  }, []);

  return (
    <Row>
      <Col lg={4}></Col>
      <Col lg={16}>
        <Menu className="menu-top-web" mode="horizontal">
          <Menu.Item className="menu-top-web__logo">
            <Link to={"/"}>
              <img src={logoNuevo} alt="Logo-Nuevo" />
            </Link>
          </Menu.Item>

          {menuData.map((menu) => {
            const external = menu.url.indexOf("http") > -1 ? true : false;
            if (external) {
              return (
                <Menu.Item key={menu._id} className="menu-top-web__item">
                  <a href={menu.url} target="_blank" rel="noopener noreferrer">
                    {menu.title}
                  </a>
                </Menu.Item>
              );
            }

            return (
              <Menu.Item key={menu._id} className="menu-top-web__item">
                <Link to={menu.url}>{menu.title}</Link>
              </Menu.Item>
            );
          })}
          <SocialLinks />
        </Menu>
      </Col>
      <Col lg={4}></Col>
    </Row>
  );
};

export default MenuTop;
