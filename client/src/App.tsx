import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/counter_ws");

    ws.onmessage = (event) => {
      setCount(parseInt(event.data));
      ws.send("message to websocket from client: " + event.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <h1>Data from websocket: {count}</h1>
    </>
  );
}

export default App;
