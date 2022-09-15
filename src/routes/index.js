import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import BlankLayout from '../layouts/BlankLayout';
import HomePage from '../pages/HomePage';
import LogInPage from '../pages/LogInPage';
import RegisterPage from '../pages/RegisterPage';
import AccountPage from '../pages/AccountPage';
import NotFoundPage from '../pages/NotFoundPage';
import UserProfilePage from '../pages/UserProfilePage';
import Authrequire from './Authrequire';
import PostForm from '../features/post/PostForm';
import PostUpdateForm from '../features/post/PostUpdateForm';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Authrequire><MainLayout /></Authrequire>}>
        <Route index element={<HomePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="user/:userId" element={<UserProfilePage />} /> 
        <Route path="postform" element={<PostForm />} /> 
        <Route path="postupdate/:postId" element={<PostUpdateForm />} /> 
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Route>

    </Routes>
  )
}

export default Router