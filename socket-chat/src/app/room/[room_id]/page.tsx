"use client";
import styles from "../../page.module.css";
import { Socket, Channel } from "phoenix";
import { useEffect, useState } from "react";
import { useSocket } from "../../socketContext";
import { lobby_navigate } from "../../navigator";

export default function Room(input) {
  const { params, searchParams } = input;
  const { currSocket } = useSocket();
  const [currChannel, setChannel] = useState<Channel>();
  const [message, setMessage] = useState(""); // State to hold the message
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    if (!currSocket) return;
    const chatChannel = currSocket.channel(params?.room_id);
    chatChannel
      .join()
      .receive("ok", (resp) => {
        setConnected(true);
        console.log(resp);
      })
      .receive("error", () => {
        console.log("Unable to join");
        setConnected(false);
      });

    chatChannel.on("msg", (resp) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        ...resp.data.state,
      }));
    });

    chatChannel.on("state", (resp) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        ...resp.data.state,
      }));
    });

    setChannel(chatChannel);
  }, [currSocket]);

  // // Function to handle message change
  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  // // Function to handle message send
  const sendMessage = (e) => {
    e.preventDefault();
    if (currChannel) {
      currChannel.push("push", { data: message });
      setMessage(""); // Clear the input after sending
    }
  };

  if (!isConnected) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        Room Does not exist
        <button
          style={{ margin: "10px 0", padding: "5px 10px" }}
          onClick={() => lobby_navigate()}
        >
          Back to Lobby
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          position: "fixed",
          padding: "10px",
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: "#151515",
          width: "100%",
          textAlign: "center",
          fontSize: 15,
        }}
      >
        {params?.room_id ?? "Room"}
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div style={{ flex: 1 }}></div>
        <div
          style={{ padding: "0 10px", paddingBottom: 10, marginTop: 50, overflowY: "auto" }}
        >
          {Object.keys(messages).map((item) => {
            const { payload, user } = messages[item];
            return (
              <p id={item} key={item}>
                {user.id}: {payload.data}
              </p>
            );
          })}
        </div>
        <form id="form" onSubmit={sendMessage} style={{ display: "flex" }}>
          <input
            id="input"
            style={{
              padding: "15px",
              border: "none",
              flex: 1,
              background: "#151515",
              fontSize: "15px",
              outline: 0,
            }}
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder="Type your message here"
          />
          <button
            style={{
              padding: "15px",
              border: "none",
              fontSize: "15px",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
