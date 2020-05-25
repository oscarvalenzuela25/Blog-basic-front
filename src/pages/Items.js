import React, { useState, useEffect } from "react";
import { Row, Col, notification } from "antd";
import { getCoursesApi } from "../API/courses";
import PresentationCourses from "../components/Web/Courses/PresentationCourses";
import CoursesList from "../components/Web/Courses/CoursesList";
import { Helmet } from "react-helmet";
import SpinLoading from "../components/SpinLoading";

const Items = () => {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    getCoursesApi()
      .then((response) => {
        if (response.code !== 200) {
          notification["warning"]({
            message: response.mensaje,
          });
        } else {
          setCourses(response.cursos);
        }
      })
      .catch((error) => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
  }, []);

  if (!courses) {
    return <SpinLoading />;
  }

  return (
    <>
      <Helmet>
        <title>Cursos | Oscar Valenzuela Dev</title>
        <meta
          name="description"
          content="Cursos | Web sobre programacion"
          data-react-helmet="true"
        />
      </Helmet>
      <Row>
        <Col md={4} />
        <Col md={16}>
          <PresentationCourses />
          <CoursesList courses={courses} />
        </Col>
        <Col md={4} />
      </Row>
    </>
  );
};

export default Items;
