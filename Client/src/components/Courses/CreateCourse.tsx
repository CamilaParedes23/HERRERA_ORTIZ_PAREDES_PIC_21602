// src/components/Courses/CreateCourse.tsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createCourse } from '../../api/api';

const CreateCourseSchema = Yup.object().shape({
  nombre: Yup.string().required('Required'),
  descripcion: Yup.string().required('Required'),
  estado: Yup.string().required('Required'),
  creador_id: Yup.number().required('Required'),
});

const CreateCourse = () => {
  const handleSubmit = async (values: {
    nombre: string;
    descripcion: string;
    estado: string;
    creador_id: number;
  }) => {
    await createCourse(values);
  };

  return (
    <Formik
      initialValues={{ nombre: '', descripcion: '', estado: '', creador_id: 0 }}
      validationSchema={CreateCourseSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field name="nombre" placeholder="Nombre" />
        <ErrorMessage name="nombre" />
        <Field name="descripcion" placeholder="Descripción" />
        <ErrorMessage name="descripcion" />
        <Field name="estado" placeholder="Estado" />
        <ErrorMessage name="estado" />
        <Field name="creador_id" type="number" placeholder="Creador ID" />
        <ErrorMessage name="creador_id" />
        <button type="submit">Crear curso</button>
      </Form>
    </Formik>
  );
};

export default CreateCourse;