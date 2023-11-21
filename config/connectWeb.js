const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({ authStrategy: new LocalAuth() });

function connectWhatsApp() {
  return new Promise((resolve, reject) => {
    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("Client is ready!");
      resolve();
    });

    client.on("authenticated", (session) => {
      console.log("WHATSAPP WEB => Authenticated");
    });

    client.initialize();
  });
}

module.exports = connectWhatsApp;
