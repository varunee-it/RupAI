const User = require('../models/User');
const Otp = require('../models/Otp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const formatUser = (user) => ({
  id: user._id || user.id,
  firstName: user.firstName || '',
  lastName: user.lastName || '',
  name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
  email: user.email,
  phone: user.phone || '',
  language: user.language || 'en',
  isDemo: user.isDemo || false,
  createdAt: user.createdAt
});

const generateToken = (userId) => {
  return jwt.sign({ id: userId, user: { id: userId } }, JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password, language, isDemo } = req.body;

    if (!email || !password || (!firstName && !req.body.name)) {
      return res.status(400).json({ success: false, message: 'Please provide firstName, email, and password' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const fName = firstName || (req.body.name ? req.body.name.split(' ')[0] : 'User');
    const lName = lastName || (req.body.name ? req.body.name.split(' ').slice(1).join(' ') : '');

    const user = await User.create({
      firstName: fName,
      lastName: lName,
      name: `${fName} ${lName}`.trim(),
      email,
      phone: phone || '',
      password: hashedPassword,
      language: language || 'en',
      isDemo: isDemo || false
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: formatUser(user)
      }
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    return res.json({
      success: true,
      data: {
        token,
        user: formatUser(user)
      }
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide email' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User with this email does not exist' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp: otpCode, expiresAt });

    return res.json({
      success: true,
      data: {
        message: 'OTP generated and sent successfully',
        otp: otpCode
      }
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/verify-otp
exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Please provide email and OTP' });
    }

    const record = await Otp.findOne({ email, otp });
    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    return res.json({
      success: true,
      data: {
        message: 'OTP verified successfully'
      }
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/reset-password
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword, password } = req.body;
    const finalPassword = newPassword || password;

    if (!email || !otp || !finalPassword) {
      return res.status(400).json({ success: false, message: 'Please provide email, OTP, and new password' });
    }

    const record = await Otp.findOne({ email, otp });
    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(finalPassword, salt);
    await user.save();

    await Otp.deleteMany({ email });

    return res.json({
      success: true,
      data: {
        message: 'Password reset successfully'
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({
      success: true,
      data: {
        user: formatUser(user)
      }
    });
  } catch (err) {
    next(err);
  }
};
