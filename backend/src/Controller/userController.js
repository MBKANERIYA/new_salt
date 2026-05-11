const User = require('../Model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../middleware/firebaseAdmin');

// JWT Secret Key (store in .env in production)
const JWT_SECRET = process.env.JWT_SECRET || 'SALTANDGLITZ';

// User registration
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, gender, mobileNumber } = req.body;

  if (!firstName || !lastName || !email || !password || !gender || !mobileNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create new user
    user = new User({
      firstName,
      lastName,
      mobileNumber,
      email,
      password: hashedPassword,
      gender,
    });


    let token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log(token);

    user.token = token

    await user.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Return user data with token so frontend has _id
    const userData = user.toObject();
    delete userData.password;
    userData.token = token;

    res.status(200).json({ token, message: 'Login successful', user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile (protected route)
exports.getUserProfile = async (req, res) => {
  try {
    // Find user by ID from the decoded token
    const user = await User.findById(req.user).select('-password'); // Exclude password from the response
    // console.log('User ID:', req.user);
    // console.log('Fetched User:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Return the user data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User logout
exports.logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Google login implementation
exports.googleLoginUser = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { name, email } = decodedToken;

    // Split name into first and last name
    const nameParts = (name || "Google User").split(" ");
    const firstName = nameParts[0] || "Google";
    const lastName = nameParts.slice(1).join(" ") || "User";

    let user = await User.findOne({ email });

    // Register the user if they don't exist
    if (!user) {
      user = new User({
        firstName,
        lastName,
        email,
        password: 'google-oauth',  // Placeholder for Google sign-in users
        gender: 'Not specified',
        mobileNumber: 'Not provided',
      });
      await user.save();
    }

    // Generate JWT for the user
    const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token: jwtToken, message: 'Login successful', user });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
};

// Forgot password - sends OTP to email
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.email !== email) {
      return res.status(400).json({ message: 'Email does not match' });
    }

    // OTP is handled by the OTP controller, just verify the user exists
    return res.status(200).json({ message: 'User verified. OTP should be sent separately via OTP route.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP and reset password
exports.verifyOtpAndResetPassword = async (req, res) => {
  const { userId } = req.params;
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.email !== email) {
      return res.status(400).json({ message: 'Email does not match' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};