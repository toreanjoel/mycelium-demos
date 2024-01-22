"use client";
import { useEffect, useState, useRef } from "react";
import { useSocket } from "../../socketContext";
import { lobby_navigate } from "../../navigator";

export default function Room(input: any) {
  const { params } = input;
  const { currSocket } = useSocket();
  const [currChannel, setChannel] = useState<Channel>();
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [isConnected, setConnected] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");

  const startDrawing = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
    console.log("Start Drawing");
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setLastPoint({ x: offsetX, y: offsetY });
  };

  const draw = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
    if (!isDrawing || !canvasRef.current) return;

    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;

    if (lastPoint) {
      context.beginPath();
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(offsetX, offsetY);
      context.stroke();

      if (currChannel) {
        currChannel.push("push", {
          startX: lastPoint.x,
          startY: lastPoint.y,
          endX: offsetX,
          endY: offsetY,
          color,
        });
      }
    }

    setLastPoint({ x: offsetX, y: offsetY });
  };

  const endDrawing = () => {
    console.log("Stop Drawing");
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const context = canvas.getContext("2d");
    context.fillStyle = "#ececec";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef.current]);

  useEffect(() => {
    console.log("channel connection");
    if (!currSocket) return;
    const drawChannel = currSocket.channel(params?.room_id);
    drawChannel
      .join()
      .receive("ok", (resp: any) => {
        setConnected(true);
      })
      .receive("error", () => {
        console.log("Unable to join");
        setConnected(false);
      });

    drawChannel.on("msg", (resp: any) => {
      if (!canvasRef.current) return;
      const context = canvasRef.current.getContext("2d");

      const { startX, startY, endX, endY, color } = resp.data.state;
      console.log("resp.data")
      console.log(resp.data)
      context.beginPath();
      context.strokeStyle = color;
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
      context.closePath();
    });

    drawChannel.on("state", (resp: any) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        ...resp.data.state,
      }));
    });

    // set the channel to make it avail in the component
    setChannel(drawChannel);
  }, [currSocket, params?.room_id]);

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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          padding: "10px",
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#151515",
          width: "100%",
          textAlign: "center",
          fontSize: 15,
        }}
      >
        {params?.room_id ?? "Room"}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
          borderBottom: "1px solid #8c8c8c",
        }}
      >
        <canvas
          ref={canvasRef}
          width="800px"
          height="600px"
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          onMouseOut={endDrawing}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "10px" }}
      >
        <input
          style={{
            width: "75px",
            border: "none",
            background: "none",
            height: "75px",
          }}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
}
