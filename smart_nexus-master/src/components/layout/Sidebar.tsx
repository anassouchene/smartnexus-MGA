import AccountTreeIcon from '@mui/icons-material/AccountTree'; // Workflow
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'; // Claims
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GavelIcon from '@mui/icons-material/Gavel'; // Contracts
import InventoryIcon from '@mui/icons-material/Inventory'; // Products
import PolicyIcon from '@mui/icons-material/Policy';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const collapsedDrawerWidth = 65;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
}

interface NavigationItem {
  text: string;
  icon: React.ReactNode;
  path?: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
  { text: 'Produits', icon: <InventoryIcon />, path: '/products' },
  {
    text: 'Police & Flux de travail',
    icon: <PolicyIcon />,
    children: [
      { text: 'Police', icon: <PolicyIcon />, path: '/policy' },
      { text: 'Flux de travail', icon: <AccountTreeIcon />, path: '/workflow' },
    ],
  },
  { text: 'Contracts', icon: <GavelIcon />, path: '/contracts' },
  { text: 'Sinistres', icon: <AssignmentLateIcon />, path: '/claims' },
];

const bottomItems: NavigationItem[] = [
  { text: 'Paramètres', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    'Police & Flux de travail': true, // Default open for visibility
  });

  const handleSubmenuClick = (text: string) => {
    if (collapsed) return; // Don't toggle submenus when collapsed
    setOpenSubmenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    // Only close on mobile
    if (window.innerWidth < 600) {
      onClose();
    }
  };

  const renderNavItem = (item: NavigationItem, depth = 0) => {
    const isSelected = item.path ? location.pathname === item.path : false;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openSubmenus[item.text];

    return (
      <React.Fragment key={item.text}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            selected={isSelected}
            onClick={() => {
              if (hasChildren) {
                handleSubmenuClick(item.text);
              } else if (item.path) {
                handleNavigation(item.path);
              }
            }}
            sx={{
              minHeight: 48,
              justifyContent: collapsed ? 'center' : 'initial',
              px: 2.5,
              pl: collapsed ? 2.5 : 2.5 + depth * 2, // Remove indent when collapsed
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? 0 : 3,
                justifyContent: 'center',
                color: isSelected ? 'primary.main' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            {!collapsed && (
              <>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isSelected ? 'bold' : 'medium',
                    color: isSelected ? 'primary.main' : 'inherit'
                  }} 
                />
                {hasChildren ? (isOpen ? <ExpandLess /> : <ExpandMore />) : null}
              </>
            )}
          </ListItemButton>
        </ListItem>
        {!collapsed && hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderNavItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowX: 'hidden' }}>
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <List>
          {navigationItems.map((item) => renderNavItem(item))}
        </List>
      </Box>
      <Divider />
      <List>
        {bottomItems.map((item) => renderNavItem(item))}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: collapsed ? collapsedDrawerWidth : drawerWidth }, flexShrink: { sm: 0 }, transition: 'width 0.2s' }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: collapsed ? collapsedDrawerWidth : drawerWidth,
            transition: 'width 0.2s',
            overflowX: 'hidden'
          },
        }}
        open
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
