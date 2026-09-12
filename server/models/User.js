const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  language: { type: String, default: 'en' },
  isDemo: { type: Boolean, default: false },
  balance: { type: Number, default: 0 },
  income: { type: Number, default: 0 },
  expenses: { type: Number, default: 0 },
  savings: { type: Number, default: 0 },
  creditScore: { type: Number, default: 742 },
  preferences: {
    notifications: { type: Boolean, default: true },
    emailAlerts: { type: Boolean, default: true },
    smsAlerts: { type: Boolean, default: false }
  }
}, { timestamps: true });

UserSchema.pre('save', function() {
  if (this.firstName || this.lastName) {
    this.name = `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
});

module.exports = mongoose.model('User', UserSchema);
