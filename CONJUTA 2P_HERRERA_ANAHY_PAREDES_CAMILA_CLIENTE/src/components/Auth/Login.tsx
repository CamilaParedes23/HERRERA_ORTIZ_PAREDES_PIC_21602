// src/components/Auth/Login.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext'; // Importa useAuth de manera predeterminada


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const { login } = useAuth(); // Usa useAuth para obtener la función login

  const handleSubmit = async (values: { email: string; password: string }) => {
    await login(values);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" />
        <Field name="password" type="password" placeholder="Contraseña" />
        <ErrorMessage name="password" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default Login;