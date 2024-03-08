const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  
let depositData = []

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  
  socket.on("submitDeposit", (data) => {
    console.log("Received deposit data:", data);
    depositData.push(data); // Memorizza i dati del deposito nell'array depositData
    io.emit("notification", `New deposit received from wallet ${data.wallet}. Agent : ${data.agent}, Amount: ${data.amount}, Beneficiary : ${data.beneficiary} and Contract Address: ${data.contractAddress}, Approved : ${data.approved}`);
  }); 

  socket.on("agentAddress", (data) => {
    console.log("Received agent address:", data.agent);
    const agentAddress = data.agent;
    const agentDeposits = depositData.filter(deposit => deposit.agent === agentAddress);
    console.log("Agent deposits:", agentDeposits);
    socket.emit("agentDeposits", agentDeposits);
  });


  socket.on("submitResult", (data) => {
    console.log("Received result:", data);
    const result = data.approved;

    // Emetti il risultato al client "Homepage"
    io.emit("result", result);
});

  

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
