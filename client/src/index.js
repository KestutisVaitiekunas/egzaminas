import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Login from './pages/login';
import Register from './pages/register';
import Admin from './pages/admin_dash';
import Error from './pages/error';
import UserProfilePage from './pages/user_profile_page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/error" element={<Error />} />
      <Route path="/profile/:id" element={<UserProfilePage />} />
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

