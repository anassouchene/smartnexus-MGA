import { Box, CssBaseline, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const drawerWidth = isCollapsed ? 65 : 240;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar onSidebarOpen={handleDrawerToggle} onSidebarCollapse={handleCollapseToggle} />
      <Sidebar 
        open={mobileOpen} 
        onClose={handleDrawerToggle} 
        collapsed={isCollapsed}
      />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          transition: 'width 0.2s'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
