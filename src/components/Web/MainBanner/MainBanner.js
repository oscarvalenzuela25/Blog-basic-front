import React from "react";
import { Row, Col } from "antd";

import "./MainBanner.scss";
const MainBanner = () => {
  return (
    <div className="main-banner">
      <div className="main-banner__dark" />
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <h2>
            Aprende nuevas <br /> tecnologias web y moviles
          </h2>
          <h3>
            A traves de una disciplina estricta y avanzada con <br />{" "}
            profesionales con años de experiencia
          </h3>
        </Col>
      </Row>
    </div>
  );
};

export default MainBanner;
