import React from "react";
import { Row, Col, Card } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

import "./HowMyItemsWork.scss";
const HowMyItemsWork = () => {
  return (
    <Row className="how-my-items-work">
      <Col lg={24} className="how-my-items-work__title">
        <h2>Como funcionan mis items?</h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas debitis
          perspiciatis laborum quisquam ipsum amet.
        </h3>
      </Col>

      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined />}
              title="Lorem Ipsum Dolor"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas debitis
              perspiciatis laborum quisquam ipsum amet. Quas debitis
              perspiciatis laborum quisquam ipsum amet."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined />}
              title="Lorem Ipsum Dolor"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas debitis
              perspiciatis laborum quisquam ipsum amet. Quas debitis
              perspiciatis laborum quisquam ipsum amet."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined />}
              title="Lorem Ipsum Dolor"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas debitis
              perspiciatis laborum quisquam ipsum amet. Quas debitis
              perspiciatis laborum quisquam ipsum amet."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined />}
              title="Lorem Ipsum Dolor"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas debitis
              perspiciatis laborum quisquam ipsum amet. Quas debitis
              perspiciatis laborum quisquam ipsum amet."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined />}
              title="Lorem Ipsum Dolor"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas debitis
              perspiciatis laborum quisquam ipsum amet. Quas debitis
              perspiciatis laborum quisquam ipsum amet."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined />}
              title="Lorem Ipsum Dolor"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas debitis
              perspiciatis laborum quisquam ipsum amet. Quas debitis
              perspiciatis laborum quisquam ipsum amet."
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
    </Row>
  );
};

const CardInfo = (props) => {
  const { icon, title, description } = props;
  const { Meta } = Card;

  return (
    <Card className="how-my-items-work__card">
      {icon}
      <Meta title={title} description={description} />
    </Card>
  );
};
export default HowMyItemsWork;
