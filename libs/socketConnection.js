import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id, io.engine.clientsCount);

    // Join auction room event
    socket.on("join-auction", ({auctionId}) => {
      if (!auctionId) {
        socket.emit("error", { message: "Auction ID is required" });
        return;
      }

      const roomName = `auction-${auctionId}`;
      socket.join(roomName);
      console.log(`Socket ${socket.id} joined auction room: ${roomName}`);

      // Notify the client that they successfully joined the auction
      socket.emit("joined-auction", {
        auctionId,
        message: `Successfully joined auction ${auctionId}`,
      });
    });

    // Optionally handle leaving an auction room
    socket.on("leave-auction", (auctionId) => {
      if (!auctionId) {
        socket.emit("error", { message: "Auction ID is required" });
        return;
      }
      const roomName = `auction-${auctionId}`;
      socket.leave(roomName);
      console.log(`Socket ${socket.id} left auction room: ${roomName}`);

      socket.emit("left-auction", {
        auctionId,
        message: `Successfully left auction ${auctionId}`,
      });
    });

    

  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
