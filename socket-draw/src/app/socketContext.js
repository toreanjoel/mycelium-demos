"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Socket } from "phoenix";

const SERVER_ID = "951e6049-6828-4dbe-8dd3-0ede9ec0476a"

// Create the context
// TODO: Types need to be updated
const SocketContext = createContext({
  currSocket: null,
  channel: null,
  getRooms: () => unknown,
  fetchRooms: () => unknown,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [currSocket, setSocket] = useState(null);
  const [channel, setChannel] = useState(null);
  const [rooms, setRooms] = useState([]);

  // get the available rooms
  function getRooms() {
    // we remove the lobby from here
    return rooms.filter((item) => item !== "lobby");
  }
  
  // fetch server rooms
  function fetchRooms() {
    return channel.push("get_rooms");
  }

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window === "undefined") {
      return;
    }

    // The server socket join
    const socket = new Socket(`ws://localhost:4000/socket/${SERVER_ID}`, {
      params: { userId: Math.floor(Math.random() * 2000000000) },
      heartbeatIntervalMs: 360000,
      timeout: 10000,
    });
    // Connecting to the server
    socket.connect();

    // The main room to join, lobby which all servers have
    const lobby = socket.channel("lobby");
    lobby
      .join()
      .receive("ok", (data) => {
        // Get available rooms
        setChannel(lobby)
        lobby.on("rooms", ({ data: rooms }) => {
          setRooms(rooms)
        })
        console.log("Successfully joined lobby channel");
      })
      .receive("error", () => console.log("Unable to join"));

    // Set the lobby and socket so we can access later through context
    setSocket(socket);
    setChannel(lobby);

    return () => {
      lobby.leave();
      // socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ currSocket, channel, getRooms, fetchRooms }}>
      {children}
    </SocketContext.Provider>
  );
};
