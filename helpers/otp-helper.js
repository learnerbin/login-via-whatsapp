module.exports = {
    generateOtp: () => {
        const otp = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit OTP
        console.log("Generated OTP:", otp);
        return otp.toString(); // Convert to string for consistency
    },
    sendOtp: () => {
        console.log("sending otp");
    }
};