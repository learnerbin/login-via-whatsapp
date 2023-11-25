const qrcode = require("qrcode-terminal");


module.exports = {
  connectWeb: (client) => {
    return new Promise((resolve, reject) => {
        client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
      });

      client.on("authenticated", (session) => {
        console.log("WHATSAPP WEB => Authenticated");
        resolve("authenticated");
      });

      client.initialize();
    });
  },
  getStatus: (client) => {
    return new Promise((resolve, reject) => {
      client.on("authenticated", (session) => {
        console.log("WHATSAPP WEB => Authenticated");
        resolve("authenticated");
      });

      client.on("auth_failure", () => {
        console.log("Authentication failed");
        reject("unauthorized");
      });

      client.initialize();
    });
  },
};
