import React from 'react';
import { Stack, Box } from '@mui/material';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import {Outlet } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';

function MainLayout() {
  return (
    <Stack sx={{minHeight: '100vh'}}>
      <MainHeader />
      <AlertMessage/>
      <Outlet />
      <Box sx={{flexGrow: 1}}/>
      <MainFooter/>
    </Stack>
  )
}

export default MainLayout