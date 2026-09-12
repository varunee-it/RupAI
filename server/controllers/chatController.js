const Chat = require('../models/Chat');

exports.chat = async (req, res) => {
  try {
    const { message, language } = req.body;
    let reply = "I'm sorry, I didn't quite catch that. How can I help you with your banking needs?";
    
    const msgLower = message.toLowerCase();

    if (msgLower.includes('education loan')) {
      reply = "Sure! I can help you apply for an education loan. Let's begin with your college details.";
    } else if (msgLower.includes('home loan')) {
      reply = "Great! I can assist you with a home loan application. What is the property value?";
    } else if (msgLower.includes('emi')) {
      reply = "Your upcoming EMI is ₹5,000 due on the 5th of next month.";
    } else if (msgLower.includes('balance')) {
      reply = "Your current account balance is ₹1,25,000.";
    } else if (msgLower.includes('kyc')) {
      reply = "To complete your KYC, please upload your Aadhar and PAN card documents in the profile section.";
    }

    const newChat = new Chat({
      userId: req.user.id,
      message,
      response: reply,
      language: language || 'en'
    });

    await newChat.save();

    res.json({ reply });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
