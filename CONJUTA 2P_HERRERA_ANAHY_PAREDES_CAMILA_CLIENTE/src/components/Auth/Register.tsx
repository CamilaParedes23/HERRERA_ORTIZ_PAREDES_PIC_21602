// src/components/Auth/Register.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext'; // Importa useAuth de manera predeterminada

const RegisterSchema = Yup.object().shape({
  nombres: Yup.string().required('Required'),
  apellidos: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  tipo_usuario: Yup.string().required('Required'),
});

const Register = () => {
  const { register } = useAuth(); // Usa useAuth para obtener la función register

  const handleSubmit = async (values: {
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    tipo_usuario: string;
  }) => {
    await register(values);
  };

  return (
    <Formik
      initialValues={{ nombres: '', apellidos: '', email: '', password: '', tipo_usuario: '' }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field name="nombres" placeholder="Nombres" />
        <ErrorMessage name="nombres" />
        <Field name="apellidos" placeholder="Apellidos" />
        <ErrorMessage name="apellidos" />
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" />
        <Field name="password" type="password" placeholder="Contraseña" />
        <ErrorMessage name="password" />
        <Field name="tipo_usuario" placeholder="Tipo de Usuario" />
        <ErrorMessage name="tipo_usuario" />
        <button type="submit">Registrarse</button>
      </Form>
    </Formik>
  );
};

export default Register;