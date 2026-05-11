const express = require('express');
const { registerUser, loginUser, googleLoginUser, logoutUser, getUserProfile, forgotPassword, verifyOtpAndResetPassword } = require('../../Controller/userController');
const { authenticateJWT } = require('../../middleware/auth');
const { User } = require('../../Model');
const router = express.Router();

// Google Sign-in route
router.post('/google-login', googleLoginUser);

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User logout route (requires authentication)
router.post('/logout', authenticateJWT, logoutUser);

// Get user profile route (requires authentication)
router.get('/profile', authenticateJWT, getUserProfile);

router.get('/user', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Assuming req.user.id contains the user ID
        console.log(user);
        
        if (user) {
            res.json({ id: user._id, name: user.name }); // Send user ID and other details
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Password reset routes
router.post('/forgotPassword/:userId', forgotPassword);
router.post('/verifyOtpAndResetPassword/:userId', verifyOtpAndResetPassword);

// Update user profile
router.put('/updateProfile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, mobileNumber, pincode, birthday, anniversary, occupation, spouseBirthday, gender } = req.body;

        const updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;
        if (pincode !== undefined) updateData.pincode = pincode;
        if (birthday !== undefined) updateData.birthday = birthday;
        if (anniversary !== undefined) updateData.anniversary = anniversary;
        if (occupation !== undefined) updateData.occupation = occupation;
        if (spouseBirthday !== undefined) updateData.spouseBirthday = spouseBirthday;
        if (gender !== undefined) updateData.gender = gender;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password -token');

        if (!updatedUser) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        return res.status(200).json({
            status: true,
            message: 'Profile updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ status: false, message: error.message });
    }
});

module.exports = router;
