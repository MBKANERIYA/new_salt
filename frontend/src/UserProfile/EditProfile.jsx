import API_BASE_URL from '../Utils/apiConfig.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Uprofile from './Uprofile';
import axios from 'axios';
import Helmet from '../Components/Helmet';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        pincode: '',
        birthday: '',
        anniversary: '',
        occupation: '',
        spouseBirthday: '',
        gender: '',
    });
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                mobileNumber: user.mobileNumber || '',
                pincode: user.pincode || '',
                birthday: user.birthday || '',
                anniversary: user.anniversary || '',
                occupation: user.occupation || '',
                spouseBirthday: user.spouseBirthday || '',
                gender: user.gender || '',
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName.trim()) {
            toast.error('First name is required');
            return;
        }

        if (!formData.mobileNumber.trim()) {
            toast.error('Mobile number is required');
            return;
        }

        setSaving(true);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?._id;

            if (userId) {
                // Save to backend
                const response = await axios.put(`${API_BASE_URL}/api/users/updateProfile/${userId}`, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    mobileNumber: formData.mobileNumber,
                    pincode: formData.pincode,
                    birthday: formData.birthday,
                    anniversary: formData.anniversary,
                    occupation: formData.occupation,
                    spouseBirthday: formData.spouseBirthday,
                    gender: formData.gender,
                });

                if (response.data.status) {
                    // Update localStorage with server response
                    const updatedUser = { ...user, ...response.data.user };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    toast.success('Profile updated successfully!');
                    navigate('/Userprofile');
                }
            } else {
                // Guest user - save to localStorage only
                const updatedUser = { ...user, ...formData };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                toast.success('Profile updated locally');
                navigate('/Userprofile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/Userprofile');
    };

    const fields = [
        { name: 'firstName', label: 'First Name', type: 'text', required: true, icon: 'ri-user-line' },
        { name: 'lastName', label: 'Last Name', type: 'text', required: false, icon: 'ri-user-line' },
        { name: 'email', label: 'Email', type: 'email', required: true, icon: 'ri-mail-line', disabled: true },
        { name: 'mobileNumber', label: 'Mobile Number', type: 'tel', required: true, icon: 'ri-phone-line' },
        { name: 'gender', label: 'Gender', type: 'select', required: false, icon: 'ri-men-line', options: ['Male', 'Female', 'Other'] },
        { name: 'pincode', label: 'Pincode', type: 'text', required: false, icon: 'ri-map-pin-line' },
        { name: 'birthday', label: 'Birthday', type: 'date', required: false, icon: 'ri-cake-2-line' },
        { name: 'anniversary', label: 'Anniversary', type: 'date', required: false, icon: 'ri-heart-2-line' },
        { name: 'occupation', label: 'Occupation', type: 'text', required: false, icon: 'ri-briefcase-line' },
        { name: 'spouseBirthday', label: 'Spouse Birthday', type: 'date', required: false, icon: 'ri-gift-line' },
    ];

    return (
        <Helmet title="Edit Profile">
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 m-0 p-0'>
                        <Uprofile />
                    </div>
                    <div className='col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 m-0 p-0 bg_up'>
                        <div className='profile-details-card'>
                            {/* Header */}
                            <div className='edit-profile-header'>
                                <div>
                                    <h4 className='edit-profile-title'>
                                        <i className='ri-edit-line me-2'></i>
                                        Edit Profile
                                    </h4>
                                    <p className='edit-profile-subtitle'>Update your personal information</p>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <div className='edit-profile-grid'>
                                    {fields.map((field, idx) => (
                                        <div key={idx} className={`edit-field-wrapper ${field.disabled ? 'disabled' : ''}`}>
                                            <label className='edit-field-label'>
                                                <i className={`${field.icon} me-1`}></i>
                                                {field.label}
                                                {field.required && <span className='text-danger ms-1'>*</span>}
                                            </label>
                                            {field.type === 'select' ? (
                                                <select
                                                    name={field.name}
                                                    value={formData[field.name] || ''}
                                                    onChange={handleInputChange}
                                                    className='edit-field-input'
                                                >
                                                    <option value=''>Select {field.label}</option>
                                                    {field.options.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={formData[field.name] || ''}
                                                    onChange={handleInputChange}
                                                    className='edit-field-input'
                                                    placeholder={field.type === 'date' ? '' : `Enter ${field.label.toLowerCase()}`}
                                                    required={field.required}
                                                    disabled={field.disabled}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className='edit-profile-actions'>
                                    <button type='button' className='edit-cancel-btn' onClick={handleCancel}>
                                        <i className='ri-close-line me-1'></i>
                                        Cancel
                                    </button>
                                    <button type='submit' className='edit-save-btn' disabled={saving}>
                                        {saving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-1"></span>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <i className='ri-check-line me-1'></i>
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default EditProfile;
