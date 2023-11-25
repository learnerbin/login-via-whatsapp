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
  //const data = sendOtp(otp);
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
    await connect();
    res.send(`successfully logged to whatsapp`);
  } catch (error) {
    console.error("Error connecting to WhatsApp:", error);
    res.status(500).send("Error connecting to WhatsApp");
  }
});

module.exports = router;
