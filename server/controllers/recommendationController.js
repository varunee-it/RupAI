const Recommendation = require('../models/Recommendation');

exports.getRecommendations = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const recommendations = await Recommendation.find({ userId });

    const formattedRecommendations = recommendations.map(r => ({
      title: r.title,
      description: r.description,
      priority: r.priority || (r.score >= 90 ? 'High' : 'Medium'),
      icon: r.icon || 'trending-up'
    }));

    return res.json({
      success: true,
      data: {
        recommendations: formattedRecommendations
      }
    });
  } catch (err) {
    return res.json({
      success: true,
      data: {
        recommendations: []
      }
    });
  }
};
