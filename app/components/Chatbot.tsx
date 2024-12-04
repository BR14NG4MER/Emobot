"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import rules from "@/app/emobot/rules.json";

// Normalizar texto (eliminar tildes, pasar a minúsculas)
const normalizeText = (text: string): string =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Elegir una respuesta aleatoria si hay varias
const getResponse = (response: string | string[]): string => {
  return Array.isArray(response)
    ? response[Math.floor(Math.random() * response.length)]
    : response;
};

// Encontrar una regla basada en la entrada del usuario
const findResponse = (input: string, rules: any): any => {
  for (const rule of rules) {
    if (rule.keywords.some((keyword: string) => normalizeText(input).includes(normalizeText(keyword)))) {
      return rule;
    }
  }
  return null;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "Chatbot", text: "¡Hola! Soy Emobot, ¿cómo puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [currentRules, setCurrentRules] = useState(rules);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Manejar envío de mensajes
  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Agregar el mensaje del usuario
    setMessages((prev) => [...prev, { sender: "Usuario", text: input }]);

    // Buscar una respuesta
    const matchedRule = findResponse(input, currentRules);

    setInput(""); // Limpiar el campo

    // Respuesta con retraso
    setTimeout(() => {
      if (matchedRule) {
        setMessages((prev) => [
          ...prev,
          { sender: "Chatbot", text: getResponse(matchedRule.response) },
        ]);

        if (matchedRule.nextStep) {
          setCurrentRules(matchedRule.nextStep); // Actualizar las reglas si hay pasos siguientes
        } else {
          setCurrentRules(rules); // Reiniciar las reglas si no hay más pasos
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "Chatbot",
            text: "No estoy seguro de cómo responder a eso. ¿Puedes intentarlo de otra manera?",
          },
        ]);
      }
    }, 1000); // Retraso de 1 segundo
  };

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  // Scroll automático al último mensaje
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
        bgcolor: "#f9f9f9", // Fondo de la caja
      }}
    >
      <Typography variant="h5" align="center" gutterBottom sx={{ color: "#3f51b5" }}>
        Chatbot Emobot
      </Typography>

      {/* Contenedor de mensajes */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mb: 2,
          p: 1,
          border: "1px solid #eee",
          borderRadius: 2,
          bgcolor: "#fff",
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
                  bgcolor: message.sender === "Usuario" ? "#d1f7c4" : "#e0e0e0",
                  p: 1.5,
                  borderRadius: 1.5,
                  maxWidth: "70%",
                  boxShadow: message.sender === "Chatbot" ? "0 0 10px rgba(0, 0, 0, 0.1)" : "none",
                }}
              />
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef} />
      </Box>

      {/* Input de usuario */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          sx={{
            bgcolor: "#fff",
            borderRadius: 1,
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{
            bgcolor: "#3f51b5",
            color: "#fff",
            "&:hover": {
              bgcolor: "#303f9f",
            },
            borderRadius: 1,
            paddingX: 2,
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
