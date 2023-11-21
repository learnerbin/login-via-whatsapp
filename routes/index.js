var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

router.post("/generate", (req, res) => {
  const { phone } = req.body;
  res.send(`Signup successful!  Phone: ${phone}`);
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
