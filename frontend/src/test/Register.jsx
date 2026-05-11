import API_BASE_URL from '../Utils/apiConfig.js';
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name , setname] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
                name,
                email,
                password,
                gender,
            });

            const data = res.data;
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert('Registration successful');
            } else {
                alert('Error: ' + data.msg);
            }
        } catch (error) {
            console.error(error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Gender:</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
