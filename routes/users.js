var express = require("express");
var router = express.Router();
const connectWhatsApp = require("../config/connectWeb");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login", async function (req, res, next) {
  try {
    await connectWhatsApp();
    res.send(`successfully logged to whatsapp`);
  } catch (error) {
    console.error("Error connecting to WhatsApp:", error);
    res.status(500).send("Error connecting to WhatsApp");
  }
});
module.exports = router;
