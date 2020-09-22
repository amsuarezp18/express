const WebSocket = require("ws");
const { string } = require("joi");
const persistence = require("./public/persistence/messagesSave");

const clients = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      message = JSON.parse(message);
      let x = persistence.postMessage(message);
      if (x["details"]) {
        msg = "ERROR " + x.details[0].message;
        message = JSON.stringify(msg);
        ws.send(message);
      }
      sendMessages();
    });
  });
};

const sendMessages = () => {
  clients.forEach((client) => {
    persistence.getMessages().then((result) => {
      var array = [];
      result.forEach((mensaje) => {
        array.push(mensaje.dataValues);
      });
      messages = JSON.stringify(array);
      client.send(messages);
    });
  });
};

exports.wsConnection = wsConnection;
exports.sendMessages = sendMessages;
