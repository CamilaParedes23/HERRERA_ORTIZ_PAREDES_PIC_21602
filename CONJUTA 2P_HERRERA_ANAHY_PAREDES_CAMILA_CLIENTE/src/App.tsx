// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CourseList from './components/Courses/CourseList';
import CourseDetail from './components/Courses/CourseDetail';
import CreateCourse from './components/Courses/CreateCourse';
import SubscriptionList from './components/Subscriptions/SubscriptionList';
import Subscribe from './components/Subscriptions/Subscribe';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import './App.css'; // Importa el archivo de estilos

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/subscriptions" element={<SubscriptionList />} />
          <Route path="/subscribe" element={<Subscribe />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;