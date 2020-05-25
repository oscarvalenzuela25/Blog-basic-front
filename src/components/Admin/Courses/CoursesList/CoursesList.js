import React, { useState, useEffect } from "react";
import { Popconfirm, List, Button, notification, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import {
  getCourseDataUdemyApi,
  deleteCourseApi,
  updateCourseApi,
} from "../../../../API/courses";
import { getAccessToken } from "../../../../API/auth";
import AddEditCourseForm from "../AddEditCourseForm";

import "./CoursesList.scss";

const CoursesList = (props) => {
  const { courses, setReloadCourses } = props;
  const [listCourses, setListCourses] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    let listCourseArray = [];
    courses.map((course) => {
      listCourseArray.push({
        content: (
          <Course
            course={course}
            deleteCourse={deleteCourse}
            editCourseModal={editCourseModal}
          />
        ),
      });
    });
    setListCourses(listCourseArray);
  }, [courses]);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessToken();
    sortedList.map((course) => {
      const { _id } = course.content.props.course;
      const order = course.rank;
      updateCourseApi(accessToken, _id, { order });
      console.log("updateado");
    });
  };

  const deleteCourse = (idCourse) => {
    const accessToken = getAccessToken();
    deleteCourseApi(accessToken, idCourse)
      .then((response) => {
        if (response.code !== 200) {
          notification["error"]({
            message: response.mensaje,
          });
        } else {
          notification["success"]({
            message: response.mensaje,
          });
          setReloadCourses(true);
        }
      })
      .catch((error) => {
        notification["error"]({
          message: error.mensaje ? error.mensaje : error.message,
        });
      });
  };

  const addCourseModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
      />
    );
  };

  const editCourseModal = (course) => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
        course={course}
      />
    );
  };

  return (
    <>
      <div className="courses-list">
        <div className="courses-list__header">
          <Button type="primary" onClick={() => addCourseModal()}>
            Nuevo Curso
          </Button>
        </div>

        <div className="courses-list__items">
          {listCourses.length === 0 && (
            <h2 style={{ textAlign: "center", margin: 0 }}>
              No tienes cursos creados
            </h2>
          )}
          <DragSortableList
            items={listCourses}
            onSort={onSort}
            type="vertical"
          />
        </div>
        <Modal
          setIsVisible={setIsVisibleModal}
          isVisible={isVisibleModal}
          title={modalTitle}
        >
          {modalContent}
        </Modal>
      </div>
    </>
  );
};

function Course(props) {
  const { course, deleteCourse, editCourseModal } = props;
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCourseDataUdemyApi(course.idCourse).then((result) => {
      if (result.code !== 200) {
        notification["warning"]({
          message: `El curso con el id ${course.idCourse} no se ha encontrado`,
        });
        setCourseData("curso");
      } else {
        setCourseData(result.data);
      }
    });
  }, [course]);

  if (!courseData) {
    return (
      <Spin
        size="large"
        style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
      />
    );
  }

  return (
    <List.Item
      actions={[
        <Popconfirm
          placement="left"
          title={`Estas seguro de querer eliminar el curso ID: ${course.idCourse}?`}
          onConfirm={() => deleteCourse(course._id)}
          okText="Eliminar"
          cancelText="Cancelar"
        >
          <Button type="danger">
            <DeleteOutlined />
          </Button>
        </Popconfirm>,
        <Button type="primary" onClick={() => editCourseModal(course)}>
          <EditOutlined />
        </Button>,
      ]}
    >
      {courseData !== "curso" && (
        <img
          src={courseData.image_480x270}
          alt={courseData.title}
          style={{ width: "100px", marginRight: "20px" }}
        />
      )}
      {courseData !== "curso" ? (
        <List.Item.Meta
          title={`${courseData.title} - ID: ${course.idCourse}`}
          description={courseData.headline}
        />
      ) : (
        <List.Item.Meta
          title={`ID: ${course.idCourse}  -  Coupon: ${course.coupon}  -  Price: ${course.price}`}
          description={course.link}
        />
      )}
    </List.Item>
  );
}

export default CoursesList;
