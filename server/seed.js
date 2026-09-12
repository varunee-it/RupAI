require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');

// Models
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Recommendation = require('./models/Recommendation');
const Alert = require('./models/Alert');
const Loan = require('./models/Loan');
const Chat = require('./models/Chat');

const seedData = async () => {
  try {
    await connectDB();

    const DEMO_EMAIL = 'demo@rupai.com';

    // 1. Remove existing demo user records only (preserve unrelated non-demo user data)
    const existingDemoUser = await User.findOne({ email: DEMO_EMAIL });
    if (existingDemoUser) {
      await Transaction.deleteMany({ userId: existingDemoUser._id });
      await Recommendation.deleteMany({ userId: existingDemoUser._id });
      await Alert.deleteMany({ userId: existingDemoUser._id });
      await Loan.deleteMany({ userId: existingDemoUser._id });
      await Chat.deleteMany({ userId: existingDemoUser._id });
      await User.deleteOne({ _id: existingDemoUser._id });
      console.log('Cleared previous demo user data.');
    }

    // 2. Create Demo User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    const user = await User.create({
      firstName: 'Demo',
      lastName: 'User',
      name: 'Demo User',
      email: DEMO_EMAIL,
      phone: '9876543210',
      password: hashedPassword,
      language: 'en',
      isDemo: true,
      balance: 125000,
      income: 45000,
      expenses: 22000,
      savings: 23000,
      creditScore: 742,
      preferences: {
        notifications: true,
        emailAlerts: true,
        smsAlerts: false
      }
    });

    console.log('Demo User created:', user.email);

    // 3. Create 20 realistic transactions
    const transactions = [
      { userId: user._id, title: 'Salary Credited', merchant: 'Employer Inc', category: 'Income', amount: 45000, type: 'income', date: new Date('2026-09-01'), status: 'completed' },
      { userId: user._id, title: 'Apartment Rent', merchant: 'Landlord', category: 'Housing', amount: 15000, type: 'expense', date: new Date('2026-09-02'), status: 'completed' },
      { userId: user._id, title: 'Swiggy Food Order', merchant: 'Swiggy', category: 'Food', amount: 500, type: 'expense', date: new Date('2026-09-03'), status: 'completed' },
      { userId: user._id, title: 'Supermarket Grocery', merchant: 'Blinkit', category: 'Food', amount: 2000, type: 'expense', date: new Date('2026-09-04'), status: 'completed' },
      { userId: user._id, title: 'Mutual Fund SIP', merchant: 'Groww', category: 'Investment', amount: 8000, type: 'expense', date: new Date('2026-09-05'), status: 'completed' },
      { userId: user._id, title: 'Electricity Bill', merchant: 'MSEB', category: 'Utilities', amount: 1200, type: 'expense', date: new Date('2026-09-06'), status: 'completed' },
      { userId: user._id, title: 'Petrol Station', merchant: 'HPCL', category: 'Transport', amount: 2000, type: 'expense', date: new Date('2026-09-07'), status: 'completed' },
      { userId: user._id, title: 'Home Loan EMI', merchant: 'HDFC Bank', category: 'Debt', amount: 5000, type: 'expense', date: new Date('2026-09-08'), status: 'completed' },
      { userId: user._id, title: 'Zomato Dining', merchant: 'Zomato', category: 'Food', amount: 850, type: 'expense', date: new Date('2026-09-08T14:00:00Z'), status: 'completed' },
      { userId: user._id, title: 'Amazon Shopping', merchant: 'Amazon', category: 'Shopping', amount: 3200, type: 'expense', date: new Date('2026-09-09'), status: 'completed' },
      { userId: user._id, title: 'Wi-Fi Broadband Bill', merchant: 'JioFiber', category: 'Bills', amount: 999, type: 'expense', date: new Date('2026-09-09T18:00:00Z'), status: 'completed' },
      { userId: user._id, title: 'Movie Tickets', merchant: 'BookMyShow', category: 'Entertainment', amount: 700, type: 'expense', date: new Date('2026-09-10'), status: 'completed' },
      { userId: user._id, title: 'Uber Rides', merchant: 'Uber', category: 'Transport', amount: 450, type: 'expense', date: new Date('2026-09-10T15:00:00Z'), status: 'completed' },
      { userId: user._id, title: 'Pharmacy Medical', merchant: 'Apollo Pharmacy', category: 'Shopping', amount: 650, type: 'expense', date: new Date('2026-09-11'), status: 'completed' },
      { userId: user._id, title: 'Freelance Bonus', merchant: 'Upwork Client', category: 'Income', amount: 12000, type: 'income', date: new Date('2026-09-11T12:00:00Z'), status: 'completed' },
      { userId: user._id, title: 'Coffee & Snacks', merchant: 'Starbucks', category: 'Food', amount: 420, type: 'expense', date: new Date('2026-09-11T16:30:00Z'), status: 'completed' },
      { userId: user._id, title: 'Mobile Recharge', merchant: 'Airtel', category: 'Bills', amount: 666, type: 'expense', date: new Date('2026-09-12'), status: 'completed' },
      { userId: user._id, title: 'Organic Vegetables', merchant: 'Zepto', category: 'Food', amount: 480, type: 'expense', date: new Date('2026-09-12T09:00:00Z'), status: 'completed' },
      { userId: user._id, title: 'Netflix Subscription', merchant: 'Netflix', category: 'Entertainment', amount: 649, type: 'expense', date: new Date('2026-09-12T11:00:00Z'), status: 'completed' },
      { userId: user._id, title: 'Stock Dividend', merchant: 'Zerodha', category: 'Income', amount: 1500, type: 'income', date: new Date('2026-09-12T13:00:00Z'), status: 'completed' }
    ];
    await Transaction.insertMany(transactions);
    console.log('20 Demo Transactions created.');

    // 4. Create 3 Recommendations
    const recommendations = [
      { userId: user._id, title: 'Start SIP', description: 'You save ₹8,000 every month. Start an automated SIP for long term wealth.', priority: 'High', icon: 'trending-up', score: 95, category: 'Investment' },
      { userId: user._id, title: 'Travel Credit Card', description: 'Get a travel credit card to save up to 10% on your upcoming trips and flight bookings.', priority: 'Medium', icon: 'credit-card', score: 85, category: 'Credit' },
      { userId: user._id, title: 'Health Insurance', description: 'Protect your savings with a comprehensive ₹10 Lakh health insurance coverage.', priority: 'High', icon: 'shield', score: 90, category: 'Insurance' }
    ];
    await Recommendation.insertMany(recommendations);
    console.log('3 Demo Recommendations created.');

    // 5. Create 8 Alerts
    const alerts = [
      { userId: user._id, type: 'Fraud', title: 'Large transaction detected', message: 'A transaction of ₹50,000 was attempted.', description: 'A transaction of ₹50,000 was attempted.', severity: 'High', createdAt: new Date('2026-09-12T12:00:00Z'), isRead: false },
      { userId: user._id, type: 'Reminder', title: 'EMI Due Tomorrow', message: 'Your Home Loan EMI of ₹5,000 is due tomorrow.', description: 'Your Home Loan EMI of ₹5,000 is due tomorrow.', severity: 'Medium', createdAt: new Date('2026-09-12T11:00:00Z'), isRead: false },
      { userId: user._id, type: 'Insight', title: 'Spending Increased', message: 'Your food spending increased by 20% this month.', description: 'Your food spending increased by 20% this month.', severity: 'Low', createdAt: new Date('2026-09-11T14:00:00Z'), isRead: true },
      { userId: user._id, type: 'Alert', title: 'Salary Credited', message: 'Your salary of ₹45,000 has been credited to your account.', description: 'Your salary of ₹45,000 has been credited to your account.', severity: 'Low', createdAt: new Date('2026-09-01T09:00:00Z'), isRead: true },
      { userId: user._id, type: 'Security', title: 'Unusual spending detected', message: 'An online shopping transaction of ₹3,200 was verified.', description: 'An online shopping transaction of ₹3,200 was verified.', severity: 'Medium', createdAt: new Date('2026-09-09T18:00:00Z'), isRead: false },
      { userId: user._id, type: 'Milestone', title: 'Savings milestone achieved', message: 'Congratulations! You reached your quarterly savings target of ₹23,000.', description: 'Congratulations! You reached your quarterly savings target of ₹23,000.', severity: 'Low', createdAt: new Date('2026-09-05T10:00:00Z'), isRead: true },
      { userId: user._id, type: 'Bill', title: 'Electricity Bill due', message: 'Your utility bill of ₹1,200 is due in 3 days.', description: 'Your utility bill of ₹1,200 is due in 3 days.', severity: 'Medium', createdAt: new Date('2026-09-06T08:00:00Z'), isRead: false },
      { userId: user._id, type: 'Investment', title: 'Investment reminder', message: 'Your monthly SIP of ₹8,000 will be executed on the 15th.', description: 'Your monthly SIP of ₹8,000 will be executed on the 15th.', severity: 'Low', createdAt: new Date('2026-09-08T07:00:00Z'), isRead: false }
    ];
    await Alert.insertMany(alerts);
    console.log('8 Demo Alerts created.');

    // 6. Create 1 Loan Application
    await Loan.create({
      userId: user._id,
      personalDetails: {
        fullName: 'Demo User',
        phone: '9876543210',
        email: 'demo@rupai.com',
        dateOfBirth: '2000-01-01',
        address: 'Ahmedabad',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380001'
      },
      employment: {
        employmentType: 'Salaried',
        companyName: 'Demo Company',
        designation: 'Software Engineer',
        experienceYears: 3
      },
      income: {
        monthlyIncome: 45000,
        monthlyExpenses: 22000,
        existingEMI: 5000
      },
      documents: {
        panNumber: 'ABCDE1234F',
        aadhaarLast4: '1234',
        documentStatus: 'Pending'
      },
      loanAmount: 500000,
      tenure: 36,
      status: 'Submitted'
    });
    console.log('1 Demo Loan created.');

    // 7. Create 3 Demo Chat Messages
    const chats = [
      {
        userId: user._id,
        message: 'How can I save more money?',
        response: 'Based on your financial profile (Monthly Income: ₹45,000, Expenses: ₹22,000), you can save up to ₹23,000 monthly by setting up an automated mutual fund SIP.',
        language: 'en',
        timestamp: new Date('2026-09-12T10:00:00Z')
      },
      {
        userId: user._id,
        message: 'मैं ज्यादा पैसे कैसे बचा सकता हूँ?',
        response: 'अपनी मासिक आय (₹45000) और खर्च (₹22000) के आधार पर, आप हर महीने एसआईपी (SIP) के माध्यम से बचत बढ़ा सकते हैं।',
        language: 'hi',
        timestamp: new Date('2026-09-12T10:05:00Z')
      },
      {
        userId: user._id,
        message: 'હું વધુ પૈસા કેવી રીતે બચાવી શકું?',
        response: 'તમારી માસિક આવક (₹45000) અને ખર્ચ (₹22000) ના આધારે, તમે દર મહિને SIP દ્વારા બચત વધારી શકો છો.',
        language: 'gu',
        timestamp: new Date('2026-09-12T10:10:00Z')
      }
    ];
    await Chat.insertMany(chats);
    console.log('3 Demo Chat messages created.');

    console.log('RupAI Demo Dataset Import Success.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
