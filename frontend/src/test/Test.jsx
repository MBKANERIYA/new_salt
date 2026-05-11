import API_BASE_URL from '../Utils/apiConfig.js';
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loginMethod, setLoginMethod] = useState("otp"); // Default login method

    // Send OTP
    const sendOtp = async () => {
        try {
            await axios.post(`${API_BASE_URL}/v1/otp/send-otp`, { email });
            toast.success("OTP sent successfully!");
            setOtpSent(true);
        } catch (error) {
            toast.error(error.response?.data?.error || "Error sending OTP");
        }
    };

    // Verify OTP & Login
    const verifyOtp = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/v1/otp/get-otp`, { email, otp });
            toast.success("Login successful!");
            localStorage.setItem("token", res.data.token);
        } catch (error) {
            toast.error(error.response?.data?.error || "Invalid OTP");
        }
    };

    // Login with Password
    const loginWithPassword = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/users/login`, { email, password });
            toast.success("Login successful!");
            localStorage.setItem("token", res.data.token);
        } catch (error) {
            toast.error(error.response?.data?.error || "Invalid credentials");
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            
            {/* Login Method Toggle */}
            <div>
                <button onClick={() => setLoginMethod("otp")}>Login with OTP</button>
                <button onClick={() => setLoginMethod("password")}>Login with Password</button>
            </div>

            {/* OTP Login */}
            {loginMethod === "otp" && (
                <>
                    {!otpSent ? (
                        <button onClick={sendOtp}>Send OTP</button>
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
                </>
            )}

            {/* Password Login */}
            {loginMethod === "password" && (
                <>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button onClick={loginWithPassword}>Login</button>
                </>
            )}
        </div>
    );
};

export default Test;
