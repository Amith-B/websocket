const express = require("express");
const app = express();

require("express-ws")(app);

let counter = 0;

app.ws("/counter_ws", function (ws, req) {
  console.log("Client Connected");

  const interval = setInterval(() => {
    counter++;
    ws.send(counter.toString());
  }, 1000);

  ws.on("message", function (msg) {
    console.log("Message from client", msg);
  });

  ws.on("close", () => {
    console.log("Client Disconnected");

    if (interval) {
      clearInterval(interval);
    }
  });
});

app.get("/ping", (req, res) => {
  res.send({
    message: `Websocket current counter: ${counter}`,
  });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
