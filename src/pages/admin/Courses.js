import React, { useEffect, useState } from "react";
import { getCoursesApi } from "../../API/courses";
import CoursesList from "../../components/Admin/Courses/CoursesList";
import SpinLoading from "../../components/SpinLoading";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [reloadCourses, setReloadCourses] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCoursesApi().then((result) => {
      setCourses(result.cursos);
      setLoading(false);
    });
    if (reloadCourses) {
      setReloadCourses(false);
      setLoading(true);
    }
  }, [reloadCourses, loading]);

  if (loading) {
    return <SpinLoading />;
  }

  return (
    <>
      <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
    </>
  );
};

export default Courses;
