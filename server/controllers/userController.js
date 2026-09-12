const User = require('../models/User');
const bcrypt = require('bcrypt');

const formatUser = (user) => ({
  id: user._id || user.id,
  firstName: user.firstName || '',
  lastName: user.lastName || '',
  name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
  email: user.email,
  phone: user.phone || '',
  language: user.language || 'en',
  isDemo: user.isDemo || false,
  createdAt: user.createdAt,
  preferences: {
    notifications: user.preferences?.notifications ?? true,
    emailAlerts: user.preferences?.emailAlerts ?? true,
    smsAlerts: user.preferences?.smsAlerts ?? false
  }
});

// GET /api/user/profile
exports.getProfile = async (req, res, next) => {
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

// PUT /api/user/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { firstName, lastName, name, phone, email, language } = req.body;

    if (email && email.toLowerCase() !== user.email.toLowerCase()) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
      }

      const existingUser = await User.findOne({ email: email.toLowerCase(), _id: { $ne: userId } });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email is already used by another account' });
      }

      user.email = email.toLowerCase();
    }

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (language !== undefined) {
      if (['en', 'hi', 'gu', 'english', 'hindi', 'gujarati'].includes(language.toLowerCase())) {
        user.language = language;
      }
    }

    await user.save();

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

// PUT /api/user/password
exports.changePassword = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'currentPassword and newPassword are required' });
    }

    if (typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ success: false, message: 'New password should not be identical to current password' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.json({
      success: true,
      data: {
        message: 'Password updated successfully'
      }
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/user/preferences
exports.updatePreferences = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { language, notifications, emailAlerts, smsAlerts } = req.body;

    if (language !== undefined) {
      const validLangs = ['en', 'hi', 'gu'];
      if (!validLangs.includes(language)) {
        return res.status(400).json({ success: false, message: 'Invalid language preference. Allowed: en, hi, gu' });
      }
      user.language = language;
    }

    if (!user.preferences) {
      user.preferences = {};
    }

    if (notifications !== undefined) {
      user.preferences.notifications = Boolean(notifications);
    }
    if (emailAlerts !== undefined) {
      user.preferences.emailAlerts = Boolean(emailAlerts);
    }
    if (smsAlerts !== undefined) {
      user.preferences.smsAlerts = Boolean(smsAlerts);
    }

    await user.save();

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
