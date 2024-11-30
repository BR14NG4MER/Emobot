"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import rules from "@/app/emobot/rules.json";

// Función para encontrar una respuesta en las reglas
const findResponse = (input: string, rules: any): any => {
  for (const rule of rules) {
    if (rule.keywords.some((keyword: string) => input.toLowerCase().includes(keyword))) {
      return rule;
    }
  }
  return null;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "Chatbot", text: "¡Hola! Soy Emobot, ¿cómo puedo ayudarte hoy?" }, // Mensaje inicial
  ]);
  const [input, setInput] = useState("");
  const [currentRules, setCurrentRules] = useState(rules); // Reglas actuales para la conversación
  const messagesEndRef = useRef<HTMLDivElement>(null); // Referencia al contenedor del último mensaje

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Agregar el mensaje del usuario
    setMessages((prev) => [...prev, { sender: "Usuario", text: input }]);

    // Buscar una respuesta en las reglas actuales
    const matchedRule = findResponse(input, currentRules);

    if (matchedRule) {
      // Agregar la respuesta del chatbot
      setMessages((prev) => [...prev, { sender: "Chatbot", text: matchedRule.response }]);

      // Actualizar las reglas actuales si hay pasos siguientes
      if (matchedRule.nextStep) {
        setCurrentRules(matchedRule.nextStep);
      } else {
        setCurrentRules(rules); // Reiniciar las reglas si no hay más pasos
      }
    } else {
      // Respuesta predeterminada si no se encuentra una coincidencia
      setMessages((prev) => [
        ...prev,
        { sender: "Chatbot", text: "No estoy seguro de cómo responder a eso. ¿Puedes intentarlo de otra manera?" },
      ]);
    }

    setInput(""); // Limpiar el campo de entrada
  };

  // Desplazar al último mensaje cuando los mensajes cambien
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      <Typography variant="h6" align="center" gutterBottom>
        Chatbot
      </Typography>

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
        {/* Elemento para desplazar al último mensaje */}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
