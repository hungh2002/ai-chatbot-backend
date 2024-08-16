import { Server } from "socket.io";
import "dotenv/config";
import geminiAPI from "./services/geminiAPI.js";
import voicevoxAPI from "./services/voicevoxAPI.js";
import listSpeakers from "./services/listSpeakers.js";

const io = new Server(parseInt(process.env.PORT), {
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  console.info("New client connected");

  socket.emit("listSpeakers", await listSpeakers());

  let speaker = 2; // Default to VoiceVox speaker 1
  socket.on("speaker", (message) => {
    speaker = message;
    console.trace("Speaker changed to", speaker);
  });

  let chatHistory = [];

  socket.on("message", async (message) => {
    chatHistory.push({ role: "user", parts: [{ text: message }] });
    const reply = await geminiAPI([...chatHistory]);
    io.emit("reply", reply);
    io.emit("audio", await voicevoxAPI(reply, speaker));
    chatHistory.push({ role: "model", parts: [{ text: reply }] });
    console.trace(chatHistory);
  });
});
