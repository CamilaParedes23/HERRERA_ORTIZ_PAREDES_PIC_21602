// src/components/Subscriptions/Subscribe.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { subscribe } from '../../api/api';

const SubscribeSchema = Yup.object().shape({
  userId: Yup.number().required('Required'),
  courseId: Yup.number().required('Required'),
});

const Subscribe = () => {
  const handleSubmit = async (values: { userId: number; courseId: number }) => {
    await subscribe(values.userId, values.courseId);
  };

  return (
    <Formik
      initialValues={{ userId: 0, courseId: 0 }}
      validationSchema={SubscribeSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field name="userId" type="number" placeholder="User ID" />
        <ErrorMessage name="userId" />
        <Field name="courseId" type="number" placeholder="Course ID" />
        <ErrorMessage name="courseId" />
        <button type="submit">Suscribirse</button>
      </Form>
    </Formik>
  );
};

export default Subscribe;