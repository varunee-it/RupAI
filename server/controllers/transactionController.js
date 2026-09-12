const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const transactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .limit(10);

    const formattedTransactions = transactions.map(t => ({
      merchant: t.merchant || t.title || 'Merchant',
      category: t.category,
      amount: t.amount,
      type: t.type,
      date: t.date,
      status: t.status || 'completed'
    }));

    return res.json({
      success: true,
      data: {
        transactions: formattedTransactions
      }
    });
  } catch (err) {
    return res.json({
      success: true,
      data: {
        transactions: []
      }
    });
  }
};
