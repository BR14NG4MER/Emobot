"use client"
import React, { useState } from "react";
import { Box, TextField, Button, Typography, List, ListItem, ListItemText } from "@mui/material";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Agregar el mensaje del usuario
    setMessages((prev) => [...prev, { sender: "Usuario", text: input }]);

    // Simular una respuesta del chatbot
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "Chatbot", text: "¡Hola! ¿Cómo puedo ayudarte?" }]);
    }, 1000);

    setInput(""); // Limpiar el campo de entrada
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        height: "95vh",
        border: "1px solid #ccc",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        boxShadow: 3,
      }}
    >
      {/* Título del Chatbot */}
      <Typography variant="h6" align="center" gutterBottom>
        Chatbot
      </Typography>

      {/* Mensajes */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mb: 2,
          p: 1,
          border: "1px solid #eee",
          borderRadius: 2,
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent: message.sender === "Usuario" ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                primary={message.text}
                sx={{
                  bgcolor: message.sender === "Usuario" ? "#d1f7c4" : "#f1f1f1",
                  p: 1,
                  borderRadius: 1,
                  maxWidth: "70%",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Campo de entrada */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
