var express = require("express");
const connectWhatsApp = require("../config/connectWeb");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});


// Route to generate QR code and connect to WhatsApp
router.post('/generate', async (req, res) => {
  const { phone } = req.body;

  try {
   // await connectWhatsApp();
    res.send(`Signup successful! Phone: ${phone}`);
  } catch (error) {
    console.error('Error connecting to WhatsApp:', error);
    res.status(500).send('Error connecting to WhatsApp');
  }
});


router.post("/verify", (req, res) => {
  const { otp } = req.body;
  const storedOTP = "1234"; // Replace with your stored OTP

  if (otp === storedOTP) {
    res.render("index", { success: true });
  } else {
    res.render("index", { success: false });
  }
});
module.exports = router;
