import API_BASE_URL from './Utils/apiConfig.js';
import React, { useState } from "react";
import axios from "axios";

const OtpComponent = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP

    const sendOtp = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/v1/otp/send-otp`, { email });
            setMessage(response.data.message);
            setStep(2);
        } catch (error) {
            setMessage(error.response?.data?.error || "Error sending OTP");
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/v1/otp/get-otp`, { email, otp });
            setMessage(response.data.message);
            console.log("Token:", response.data.token);
        } catch (error) {
            setMessage(error.response?.data?.error || "Invalid OTP");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>OTP Authentication</h2>
            {step === 1 ? (
                <>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button onClick={sendOtp}>Send OTP</button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </>
            )}
            <p>{message}</p>
        </div>
    );
};

export default OtpComponent;
