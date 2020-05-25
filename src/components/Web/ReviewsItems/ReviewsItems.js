import React from "react";
import { Row, Col, Card, Avatar } from "antd";
import UserAvatar from "../../../assets/img/user-avatar.jpg";

import "./ReviewsItems.scss";

const ReviewsItems = () => {
  return (
    <Row className="reviews-items">
      <Row style={{ width: "100%" }}>
        <Col span={4} />
        <Col span={16} className="reviews-items__title">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. maxime
            ducimus a distinctio!
          </h2>
        </Col>
        <Col span={4} />
      </Row>

      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Oscar Valenzuela"
                subtitle="Lorem Ipsum"
                avatar={UserAvatar}
                review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita quod consectetur et consequatur, quaerat unde, aspernatur ea harum molestias ullam quasi porro atque, amet reiciendis. Amet ullam doloremque cumque."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Oscar Valenzuela"
                subtitle="Lorem Ipsum"
                avatar={UserAvatar}
                review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita quod consectetur et consequatur, quaerat unde, aspernatur ea harum molestias ullam quasi porro atque, amet reiciendis. Amet ullam doloremque cumque."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Oscar Valenzuela"
                subtitle="Lorem Ipsum"
                avatar={UserAvatar}
                review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita quod consectetur et consequatur, quaerat unde, aspernatur ea harum molestias ullam quasi porro atque, amet reiciendis. Amet ullam doloremque cumque."
              />
            </Col>
          </Row>
          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Oscar Valenzuela"
                subtitle="Lorem Ipsum"
                avatar={UserAvatar}
                review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita quod consectetur et consequatur, quaerat unde, aspernatur ea harum molestias ullam quasi porro atque, amet reiciendis. Amet ullam doloremque cumque."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Oscar Valenzuela"
                subtitle="Lorem Ipsum"
                avatar={UserAvatar}
                review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita quod consectetur et consequatur, quaerat unde, aspernatur ea harum molestias ullam quasi porro atque, amet reiciendis. Amet ullam doloremque cumque."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Oscar Valenzuela"
                subtitle="Lorem Ipsum"
                avatar={UserAvatar}
                review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita quod consectetur et consequatur, quaerat unde, aspernatur ea harum molestias ullam quasi porro atque, amet reiciendis. Amet ullam doloremque cumque."
              />
            </Col>
          </Row>
        </Col>
        <Col lg={4} />
      </Row>
    </Row>
  );
};

function CardReview(props) {
  const { name, subtitle, avatar, review } = props;
  const { Meta } = Card;

  return (
    <Card className="reviews-items__card">
      <p>{review}</p>
      <Meta
        avatar={<Avatar src={avatar} />}
        title={name}
        description={subtitle}
      />
    </Card>
  );
}

export default ReviewsItems;
