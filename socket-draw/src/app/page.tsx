"use client";
import React, { useState } from "react";
import { useSocket } from "./socketContext";
import { room_navigate } from "./navigator";

export default function Page() {
  const { getRooms, fetchRooms, channel } = useSocket();
  const roomLen = getRooms().length;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: "1.5em", padding: 10 }}>wsserve - Draw Rooms</div>
      {roomLen < 1 && <div style={{ textAlign: "center", padding: 10}}>No rooms found</div>}
      <div
        style={{
          padding: 10,
          width: "100%",
          maxWidth: 600,
          maxHeight: 200,
          overflowY: "auto",
          margin: "10px 0",
        }}
      >
        {getRooms().map((item: string) => {
          return (
            <div
              key={item}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
                background: "#131313",
                padding: "10px",
                alignItems: "center"
              }}
            >
              <div style={{ fontSize: 15, paddingLeft: 10 }}>{item}</div>
              <div style={{ flex: 1 }} />
              <button
                style={{ padding: "5px 10px" }}
                onClick={() => room_navigate(item)}
              >
                JOIN
              </button>
            </div>
          );
        })}
      </div>
      {channel && channel.state === "joined" && (
        <button
          style={{ padding: "5px 10px" }}
          onClick={fetchRooms}
        >
          Refetch Rooms
        </button>
      )}
      {channel && channel.state === "errored" && (
        <div> There is a problem connecting</div>
      )}
      <div style={{ flex: 1 }} />
    </div>
  );
}
