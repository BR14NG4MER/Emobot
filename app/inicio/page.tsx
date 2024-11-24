import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import Sidebar from "../components/Sidebar";

const teamMembers = [
  {
    name: "Brian U. Nava Villagran",
    role: "Desarrollador Frontend",
    avatar: "",
  },
  {
    name: "Jorge I. Noriega Hernandez",
    role: "",
    avatar: "",
  },
  {
    name: "Fidel Montesino González",
    role: "",
    avatar: "",
  },
  {
    name: "Alejandra Ortega Hernandez",
    role: "",
    avatar: "",
  },
  {
    name: "Aldo A. Montaño De La Paz",
    role: "",
    avatar: "",
  }
];

export default function Inicio() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4, bgcolor: "skyblue" }}>
        {/* Descripción de la Aplicación */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            Bienvenido a Emobot
          </Typography>
          <Typography variant="body1">
            Emobot es una plataforma diseñada para ofrecer soporte emocional y soluciones personalizadas
            a través de un chatbot interactivo. Nuestra misión es mejorar la experiencia del usuario y
            brindar ayuda en momentos de necesidad.
          </Typography>
        </Box>

        {/* Información del Equipo */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Nuestro Equipo
          </Typography>
          <Grid container spacing={3}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{ width: 80, height: 80, margin: "0 auto", mb: 2 }}
                    />
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Información Adicional */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Información Adicional
          </Typography>
          <Typography variant="body1">
            Estamos comprometidos con la innovación y el desarrollo de herramientas tecnológicas que
            hagan la vida más fácil. Si deseas saber más sobre nosotros, no dudes en explorar nuestras
            funciones.
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
