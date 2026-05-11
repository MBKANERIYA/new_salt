import API_BASE_URL from '../Utils/apiConfig.js';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const requiredEmail = 'admin@example.com';
    const requiredPassword = 'Admin@1234';

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (email !== requiredEmail || password !== requiredPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password.',
            });
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/v1/admin/create-admin`, formData);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'You have successfully logged in.',
            });

            navigate('/adashbord');
        } catch (error) {
            console.error('Failed to log in:', error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'An error occurred during login.',
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <section className='container'>
                <div className='row justify-content-center align-items-center d-flex' style={{ height: '100vh' }}>
                    <div className='col-xl-4 col-lg-6 col-md-8 col-sm-12 col-12'>
                        <form className='main_admin p-4 mx-1' onSubmit={handleSubmit}>
                            <h2 className='text-center fs-4 fw-bold py-3'>ADMIN LOGIN</h2>

                            <div className='input-group mb-2'>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    className='form-control'
                                    required
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <button
                                    type='button'
                                    className='btn btn-outline-dark visible_icon'
                                >
                                    <i className="ri-mail-line"></i>
                                </button>
                            </div>
                            <div className='input-group mb-2'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    className='form-control visible_icon_input'
                                    required
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type='button'
                                    className='btn btn-outline-dark visible_icon'
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <i className="ri-eye-line"></i> : <i className="ri-eye-off-line"></i>}
                                </button>
                            </div>
                            <button type='submit' className='btn w-100 text-light mt-5 admin_btn'>LOG IN</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Admin;
