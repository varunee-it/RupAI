const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  score: { type: Number, required: true },
  category: { type: String, required: true }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
