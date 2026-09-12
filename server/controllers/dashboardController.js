const User = require('../models/User');

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Simple health score logic
    const total = user.income + user.savings;
    const healthScore = total > 0 ? Math.round(((total - user.expenses) / total) * 100) : 0;
    
    // Ensure health score is between 0 and 100
    const finalScore = Math.max(0, Math.min(100, healthScore));

    res.json({
      balance: user.balance,
      income: user.income,
      expenses: user.expenses,
      savings: user.savings,
      healthScore: finalScore
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
