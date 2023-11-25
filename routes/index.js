var express = require("express");
var router = express.Router();

const { generateOtp, sendOtp } = require("../helpers/otp-helper");
const connect = require("../config/connectWeb");

let storedOtpData = null;

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

// Route to generate QR code and connect to WhatsApp
router.post("/generate", (req, res) => {
  const { phone } = req.body;
  const otp = generateOtp(phone);
  storedOtpData = { otp };
  const otpData = sendOtp(otp);
  res.render("index", { generated: true });
});

router.post("/verify", (req, res) => {
  const { otp } = req.body;

  if (storedOtpData && otp === storedOtpData.otp) {
    res.render("index", { success: true });
  } else {
    res.render("index", { success: false });
  }
});

router.get("/login", async function (req, res, next) {
  try {
    await connect.connectWhatsApp();
    res.send(`Successfully logged into WhatsApp`);
  } catch (error) {
    console.error("Error connecting to WhatsApp:", error);
    res.status(500).send("Error connecting to WhatsApp");
  }
});

router.get("/status", async function (req, res, next) {
  try {
    const status = connect.getStatus();
    console.log(status);
    res.send(`WhatsApp Status: ${status}`);
  } catch (error) {
    console.error("Error getting WhatsApp status:", error);
    res.status(500).send("Error getting WhatsApp status");
  }
});
module.exports = router;
