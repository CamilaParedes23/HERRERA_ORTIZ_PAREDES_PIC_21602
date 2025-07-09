import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../api/api';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        const response = await getCourse(id);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h1>{course.nombre}</h1>
      <p>{course.descripcion}</p>
      <p>Status: {course.estado}</p>
    </div>
  );
};

export default CourseDetail;