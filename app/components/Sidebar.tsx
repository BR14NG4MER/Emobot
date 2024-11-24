import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icono para cerrar sesión

const drawerWidth = 255;

const Sidebar = () => {
  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, href: "/inicio" },
    { text: "Emobot", icon: <SupportAgentIcon />, href: "/emobot" },
    { text: "Configuración", icon: <SettingsIcon />, href: "/settings" },
  ];

  const handleLogout = () => {
    // Lógica para cerrar sesión (por ejemplo, borrar cookies, tokens, etc.)
    console.log("Cerrar sesión");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Logo y Nombre */}
        <Box sx={{ p: 2, display: "flex", alignItems: "center", flexDirection: "column" }}>
          {/* Aquí puedes poner tu logo */}
          <img src="path_to_logo.png" alt="Logo" style={{ width: "50px", height: "50px", marginBottom: "8px" }} />
          <Typography variant="h6">EMOBOT</Typography>
        </Box>

        {/* Menú de navegación */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component="a" href={item.href}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Botón de Cerrar sesión al final */}
        <Box sx={{ marginTop: "auto", p: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<AccountCircleIcon />}
            //onClick={handleLogout}
            href="/login"
          >
            Cerrar sesión
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
