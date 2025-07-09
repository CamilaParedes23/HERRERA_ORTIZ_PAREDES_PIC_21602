// src/components/Courses/CourseList.tsx
import React, { useEffect, useState } from 'react';
import { getCourses } from '../../api/api';

const CourseList = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getCourses();
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Cursos</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;