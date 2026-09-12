const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, default: 'High' },
  icon: { type: String, default: 'trending-up' },
  score: { type: Number, default: 90 },
  category: { type: String, default: 'General' }
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', RecommendationSchema);
