const Alert = require('../models/Alert');

exports.getAlerts = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const alerts = await Alert.find({ userId }).sort({ createdAt: -1 });

    const formattedAlerts = alerts.map(a => ({
      title: a.title,
      message: a.message || a.description || 'Notification message',
      severity: a.severity || 'Medium',
      createdAt: a.createdAt || new Date(),
      isRead: typeof a.isRead === 'boolean' ? a.isRead : false
    }));

    return res.json({
      success: true,
      data: {
        alerts: formattedAlerts
      }
    });
  } catch (err) {
    return res.json({
      success: true,
      data: {
        alerts: []
      }
    });
  }
};
