// src/api/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const login = (credentials: { email: string; password: string }) =>
  api.post('/login', credentials);

export const register = (userData: {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  tipo_usuario: string;
}) => api.post('/usuarios', userData);

export const getCourses = () => api.get('/cursos');
export const getCourse = (id: string) => api.get(`/cursos/${id}`);
export const createCourse = (courseData: {
  nombre: string;
  descripcion: string;
  estado: string;
  creador_id: number;
}) => api.post('/cursos', courseData);

export const subscribe = (userId: number, courseId: number) =>
  api.post('/suscripciones', { userId, courseId });

export const getSubscriptions = () => api.get('/suscripciones');