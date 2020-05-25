import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Rate, notification } from "antd";
import { getCourseDataUdemyApi } from "../../../../API/courses";

import "./CoursesList.scss";

const CoursesList = (props) => {
  const { courses } = props;

  return (
    <div className="courses-list">
      <Row>
        {courses.length !== 0 ? (
          courses.map((course) => <Course key={course._id} course={course} />)
        ) : (
          <h2 className="courses-list__mensaje_de_error">
            Actualmente no tenemos cursos para mostrar
          </h2>
        )}
      </Row>
    </div>
  );
};

function Course(props) {
  const { course } = props;
  const [courseInfo, setCourseInfo] = useState({});
  const [urlCourse, setUrlCourse] = useState(null);

  useEffect(() => {
    getCourseDataUdemyApi(course.idCourse)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.mensaje
              ? response.mensaje
              : "No se pudo encontrar uno o mas Cursos",
          });
        } else {
          setCourseInfo(response.data);
          mountUrl(response.data.url);
        }
      })
      .catch((error) => {
        notification["error"]({
          message: "Error del servidor, intentelo mas tarde",
        });
      });
  }, [course]);

  const mountUrl = (url) => {
    if (!course.link) {
      const baseUrl = `https://www.udemy.com${url}`;
      const finalUrl =
        baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : "");
      setUrlCourse(finalUrl);
    } else {
      setUrlCourse(course.link);
    }
  };

  if (Object.keys(courseInfo).length === 0) {
    return null;
  }

  return (
    <Col md={8} className="courses-list__course">
      <a href={urlCourse} target="_blank" rel="noopener noreferrer">
        <Card
          cover={<img src={courseInfo.image_480x270} alt={courseInfo.title} />}
        >
          <Card.Meta
            title={courseInfo.title}
            description={courseInfo.headline}
          />
          <Button>Entrar al Curso</Button>
          <div className="courses-list__course-footer">
            <span className="price">
              {course.price ? `${course.price} USD` : courseInfo.price}
            </span>
            <div>
              <Rate disabled defaultValue={5} />
            </div>
          </div>
        </Card>
      </a>
    </Col>
  );
}

export default CoursesList;
