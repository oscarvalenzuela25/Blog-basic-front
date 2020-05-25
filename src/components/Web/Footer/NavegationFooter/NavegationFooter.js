import React from "react";
import { Row, Col } from "antd";
import {
  BookOutlined,
  CodepenOutlined,
  DatabaseOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./NavegationFooter.scss";

const NavegationFooter = () => {
  return (
    <Row className="navegation-footer">
      <Col md={24}>
        <h3>Navegación</h3>
      </Col>

      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
};

function RenderListLeft() {
  return (
    <ul>
      <li>
        <Link to="#">
          <BookOutlined /> Lorem Ipsum
        </Link>
      </li>
      <li>
        <Link to="#">
          <CodepenOutlined /> Desarrollo Web
        </Link>
      </li>
      <li>
        <Link to="#">
          <DatabaseOutlined />
          Data Base
        </Link>
      </li>
      <li>
        <Link to="#">
          <RightSquareOutlined /> Politicas
        </Link>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <Link to="#">
          <BookOutlined /> Lorem Ipsum
        </Link>
      </li>
      <li>
        <Link to="#">
          <CodepenOutlined /> Desarrollo Web
        </Link>
      </li>
      <li>
        <Link to="#">
          <DatabaseOutlined />
          Data Base
        </Link>
      </li>
      <li>
        <Link to="#">
          <RightSquareOutlined /> Politicas
        </Link>
      </li>
    </ul>
  );
}
export default NavegationFooter;
