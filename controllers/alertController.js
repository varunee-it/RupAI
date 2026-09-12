const Alert = require('../models/Alert');

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.user.id }).limit(4);
    
    const formatted = alerts.map(a => ({
      type: a.type,
      title: a.title,
      severity: a.severity
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
