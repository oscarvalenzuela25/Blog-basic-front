import React from "react";
import { Row, Col, Button, Card } from "antd";
import { Link } from "react-router-dom";
import Item from "../../../assets/img/item.jpg";

import "./HomeItems.scss";
const HomeItems = () => {
  return (
    <Row className="home-items">
      <Col lg={24} className="home-items__title">
        <h2>Lorem ipsum texto de prueba</h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-items">
          <Col md={6}>
            <CardItem
              image={Item}
              title="Prueba de React"
              subtitle="Intermedio - React/JavaScript"
              link="https://www.youtube.com/"
            />
          </Col>
          <Col md={6}>
            <CardItem
              image={Item}
              title="Prueba de React"
              subtitle="Intermedio - React/JavaScript"
              link="https://www.youtube.com/"
            />
          </Col>
          <Col md={6}>
            <CardItem
              image={Item}
              title="Prueba de React"
              subtitle="Intermedio - React/JavaScript"
              link="https://www.youtube.com/"
            />
          </Col>
          <Col md={6}>
            <CardItem
              image={Item}
              title="Prueba de React"
              subtitle="Intermedio - React/JavaScript"
              link="https://www.youtube.com/"
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
      <Col lg={24} className="home-items__more">
        <Link to="/items">
          <Button>Ver Mas</Button>
        </Link>
      </Col>
    </Row>
  );
};

const CardItem = (props) => {
  const { image, title, subtitle, link } = props;
  const { Meta } = Card;

  return (
    <a href={link} target="_blank">
      <Card
        className="home-items__card"
        cover={<img src={image} alt={title} />}
        actions={[<Button>Ingresar</Button>]}
      >
        <Meta title={title} description={subtitle} />
      </Card>
    </a>
  );
};

export default HomeItems;
