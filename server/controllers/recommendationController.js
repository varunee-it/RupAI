const Recommendation = require('../models/Recommendation');

exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ userId: req.user.id }).limit(3);
    
    const formatted = recommendations.map(r => ({
      title: r.title,
      description: r.description,
      score: r.score,
      category: r.category
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
