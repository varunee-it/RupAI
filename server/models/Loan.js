const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalDetails: {
    fullName: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' }
  },
  employment: {
    employmentType: { type: String, default: '' },
    companyName: { type: String, default: '' },
    designation: { type: String, default: '' },
    experienceYears: { type: Number, default: 0 }
  },
  income: {
    monthlyIncome: { type: Number, default: 0 },
    monthlyExpenses: { type: Number, default: 0 },
    existingEMI: { type: Number, default: 0 }
  },
  documents: {
    panNumber: { type: String, default: '' },
    aadhaarLast4: { type: String, default: '' },
    documentStatus: { type: String, default: 'Pending' }
  },
  loanAmount: { type: Number, default: 0 },
  tenure: { type: Number, default: 12 },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected'],
    default: 'Draft'
  }
}, { timestamps: true });

module.exports = mongoose.model('Loan', LoanSchema);
