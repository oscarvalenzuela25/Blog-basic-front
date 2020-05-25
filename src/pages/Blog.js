import React from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";

//Componentes
import PostListWeb from "../components/Web/Blog/PostListWeb";
import PostInfo from "../components/Web/Blog/PostInfo";

const Blog = (props) => {
  const { url } = useParams();
  const { location, history } = props;
  return (
    <>
      <Row>
        <Col md={4} />
        <Col md={16}>
          {url ? (
            <PostInfo url={url} />
          ) : (
            <PostListWeb location={location} history={history} />
          )}
        </Col>
        <Col md={4} />
      </Row>
    </>
  );
};

export default Blog;
