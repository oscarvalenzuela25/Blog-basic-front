import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import {} from "@ant-design/icons";
import { getAccessToken } from "../../../../API/auth";
import { addCourseApi, updateCourseApi } from "../../../../API/courses";

import "./AddEditCourseForm.scss";

const AddEditCourseForm = (props) => {
  const { setIsVisibleModal, setReloadCourses, course } = props;
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (course) {
      setCourseData(course);
    } else {
      setCourseData({});
    }
  }, [course]);

  const addCourse = () => {
    if (!courseData.idCourse) {
      notification["warning"]({
        message: "El id del curso es obligatorio",
      });
    } else {
      const accessToken = getAccessToken();
      addCourseApi(accessToken, courseData)
        .then((response) => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.mensaje,
          });
          setIsVisibleModal(false);
          setReloadCourses(true);
          setCourseData({});
        })
        .catch((error) => {
          notification["error"]({
            message: "Error del servidor, intentelo mas tarde",
          });
        });
    }
  };

  const updateCourse = () => {
    const accessToken = getAccessToken();
    updateCourseApi(accessToken, course._id, courseData)
      .then((response) => {
        const typeNotificacion = response.code === 200 ? "success" : "warning";
        notification[typeNotificacion]({
          message: response.mensaje,
        });
        setIsVisibleModal(false);
        setReloadCourses(true);
        setCourseData({});
      })
      .catch((error) => {
        notification["error"]({
          message: "Error del servidor, intentelo mas tarde",
        });
      });
  };

  return (
    <div className="add-edit-course-form">
      <AddEditForm
        course={course}
        addCourse={addCourse}
        updateCourse={updateCourse}
        setCourseData={setCourseData}
        courseData={courseData}
      />
    </div>
  );
};

const AddEditForm = (props) => {
  const { course, addCourse, updateCourse, setCourseData, courseData } = props;

  return (
    <Form
      className="form-add-edit"
      onFinish={() => (course ? updateCourse() : addCourse())}
    >
      <Form.Item>
        <Input
          //prefix={key}
          placeholder="ID del curso"
          value={courseData.idCourse}
          onChange={(e) =>
            setCourseData({ ...courseData, idCourse: e.target.value })
          }
          disabled={course ? true : false}
        />
      </Form.Item>
      <Form.Item>
        <Input
          //prefix={link}
          placeholder="Url del curso"
          value={courseData.link}
          onChange={(e) =>
            setCourseData({ ...courseData, link: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          //prefix={gift}
          placeholder="Cupon de descuento"
          value={courseData.coupon}
          onChange={(e) =>
            setCourseData({ ...courseData, coupon: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          //prefix={dollar}
          placeholder="Precio del curso"
          value={courseData.price}
          onChange={(e) =>
            setCourseData({ ...courseData, price: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" className="btn-submit">
          {course ? "Actualizar Curso" : "Crear Curso"}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddEditCourseForm;
