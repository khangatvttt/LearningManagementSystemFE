import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box component="main" sx={{ padding: '16px', marginTop: '64px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
