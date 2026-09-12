const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 });
    
    // Format response to match requirement (excluding unnecessary fields if desired, but returning as is for now)
    const formatted = transactions.map(t => ({
      title: t.title,
      category: t.category,
      amount: t.amount,
      type: t.type,
      date: t.date.toISOString().split('T')[0] // formatting date as YYYY-MM-DD
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
