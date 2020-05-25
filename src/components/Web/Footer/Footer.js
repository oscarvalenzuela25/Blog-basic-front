import React from "react";
import { Layout, Row, Col } from "antd";
import MyInfo from "./MyInfo";
import NavegationFooter from "./NavegationFooter";
import Newsletter from "../../Newsletter";

import "./Footer.scss";

const Footer = (props) => {
  const { Footer } = Layout;
  const { admin } = props;

  return (
    <Footer className={!admin ? "footer" : "footer footer-admin"}>
      <Row>
        <Col md={4} />
        <Col md={16}>
          {!admin && (
            <Row>
              <Col md={8}>
                <MyInfo />
              </Col>
              <Col md={8}>
                <NavegationFooter />
              </Col>
              <Col md={8}>
                <Newsletter />
              </Col>
            </Row>
          )}
          <Row className="footer__copyright">
            <Col md={12}>&copy; 2020 Todos los Derechos Reservados</Col>
            <Col md={12}>&reg; Oscar Valenzuela Web Developer</Col>
          </Row>
        </Col>
        <Col md={4} />
      </Row>
    </Footer>
  );
};

export default Footer;
