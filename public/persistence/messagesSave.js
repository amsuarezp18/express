var messageLogic = require("../logic/message_logic");
const Message = require("../../models/messages");

function postMessage(message) {
  let valido = messageLogic.validate(message);
  if (valido != "OK") {
    return valido;
  }
  return Message.create({
    message: message.message,
    author: message.author,
    ts: new Date().getTime(),
    
  }).then((response) => {
    return response;
  });
}

function getMessages() {
  return Message.findAll().then((result) => {
    return result;
  });
}

exports.postMessage = postMessage;
exports.getMessages = getMessages;
