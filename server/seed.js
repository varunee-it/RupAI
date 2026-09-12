require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');

// Models
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Recommendation = require('./models/Recommendation');
const Alert = require('./models/Alert');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Transaction.deleteMany();
    await Recommendation.deleteMany();
    await Alert.deleteMany();

    // 1. Create Demo User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    const user = await User.create({
      name: 'Demo User',
      email: 'demo@rupai.com',
      password: hashedPassword,
      language: 'en',
      balance: 125000,
      income: 45000,
      expenses: 22000,
      savings: 23000
    });

    console.log('User created:', user.email);

    // 2. Create 8 realistic transactions
    const transactions = [
      { userId: user._id, title: 'Salary', category: 'Income', amount: 45000, type: 'income', date: new Date('2026-09-01') },
      { userId: user._id, title: 'Rent', category: 'Housing', amount: 15000, type: 'expense', date: new Date('2026-09-02') },
      { userId: user._id, title: 'Swiggy', category: 'Food', amount: 500, type: 'expense', date: new Date('2026-09-05') },
      { userId: user._id, title: 'Grocery', category: 'Food', amount: 2000, type: 'expense', date: new Date('2026-09-07') },
      { userId: user._id, title: 'SIP', category: 'Investment', amount: 8000, type: 'expense', date: new Date('2026-09-08') },
      { userId: user._id, title: 'Electricity', category: 'Utilities', amount: 1200, type: 'expense', date: new Date('2026-09-10') },
      { userId: user._id, title: 'Fuel', category: 'Transport', amount: 2000, type: 'expense', date: new Date('2026-09-11') },
      { userId: user._id, title: 'EMI', category: 'Debt', amount: 5000, type: 'expense', date: new Date('2026-09-12') }
    ];
    await Transaction.insertMany(transactions);
    console.log('8 Transactions created');

    // 3. Create 3 Recommendations
    const recommendations = [
      { userId: user._id, title: 'Start SIP', description: 'You save ₹8,000 every month. Start a SIP.', score: 95, category: 'Investment' },
      { userId: user._id, title: 'Travel Credit Card', description: 'Get a travel credit card to save on your upcoming trips.', score: 85, category: 'Credit' },
      { userId: user._id, title: 'Health Insurance', description: 'Protect your savings with a comprehensive health insurance plan.', score: 90, category: 'Insurance' }
    ];
    await Recommendation.insertMany(recommendations);
    console.log('3 Recommendations created');

    // 4. Create 4 Alerts
    const alerts = [
      { userId: user._id, type: 'Fraud', title: 'Large transaction detected', description: 'A transaction of ₹50,000 was attempted.', severity: 'High' },
      { userId: user._id, type: 'Reminder', title: 'EMI Due Tomorrow', description: 'Your Home Loan EMI of ₹5,000 is due.', severity: 'Medium' },
      { userId: user._id, type: 'Insight', title: 'Spending Increased', description: 'Your food spending increased by 20% this month.', severity: 'Low' },
      { userId: user._id, type: 'Alert', title: 'Salary Not Credited', description: 'Your expected salary of ₹45,000 has not been credited yet.', severity: 'High' }
    ];
    await Alert.insertMany(alerts);
    console.log('4 Alerts created');

    console.log('Data Import Success');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

seedData();
