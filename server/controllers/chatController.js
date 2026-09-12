const Chat = require('../models/Chat');
const User = require('../models/User');
const Loan = require('../models/Loan');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const detectLanguage = (text, langInput) => {
  if (langInput && ['en', 'hi', 'gu', 'english', 'hindi', 'gujarati'].includes(langInput.toLowerCase())) {
    const l = langInput.toLowerCase();
    if (l === 'hindi' || l === 'hi') return 'hi';
    if (l === 'gujarati' || l === 'gu') return 'gu';
    return 'en';
  }
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
  return 'en';
};

const getFallbackReply = (lang, userContext, userMsg) => {
  const msgLower = (userMsg || '').toLowerCase();

  if (lang === 'hi') {
    if (msgLower.includes('ऋण') || msgLower.includes('लोन') || msgLower.includes('loan')) {
      return `आप रूपएआई ऐप के माध्यम से आसानी से ऋण के लिए आवेदन कर सकते हैं। आपका वर्तमान क्रेडिट स्कोर ${userContext.creditScore || 742} है।`;
    }
    if (msgLower.includes('बचत') || msgLower.includes('पैसे')) {
      return `अपनी मासिक आय (₹${userContext.income || 45000}) और खर्च (₹${userContext.expenses || 22000}) के आधार पर, आप हर महीने एसआईपी (SIP) के माध्यम से बचत बढ़ा सकते हैं।`;
    }
    return `मैं रूपएआई बैंकिंग और वित्तीय सहायक हूँ। मैं बचत, बजट, ईएमआई और ऋण के बारे में मार्गदर्शन दे सकता हूँ।`;
  }

  if (lang === 'gu') {
    if (msgLower.includes('લોન') || msgLower.includes('loan')) {
      return `તમે રૂપએઆઈ એપ દ્વારા સરળતાથી લોન માટે અરજી કરી શકો છો. તમારો વર્તમાન ક્રેડિટ સ્કોર ${userContext.creditScore || 742} છે.`;
    }
    if (msgLower.includes('બચત') || msgLower.includes('પૈસા')) {
      return `તમારી માસિક આવક (₹${userContext.income || 45000}) અને ખર્ચ (₹${userContext.expenses || 22000}) ના આધારે, તમે દર મહિને SIP દ્વારા બચત વધારી શકો છો.`;
    }
    return `હું રૂપએઆઈ બેંકિંગ અને નાણાકીય સહાયક છું. હું બચત, બજેટ, ઇએમઆઇ અને લોન અંગે માર્ગદર્શન આપી શકું છું.`;
  }

  // English
  if (msgLower.includes('save') || msgLower.includes('savings')) {
    return `Based on your financial profile (Monthly Income: ₹${userContext.income || 45000}, Expenses: ₹${userContext.expenses || 22000}), you can save up to ₹${(userContext.income || 45000) - (userContext.expenses || 22000)} monthly by setting up an automated mutual fund SIP.`;
  }
  if (msgLower.includes('loan') || msgLower.includes('emi')) {
    return `Your credit score is ${userContext.creditScore || 742}. You can apply for personal or home loans directly in the RupAI portal.`;
  }
  return "I'm your RupAI assistant. I can help answer questions about your balance, savings, monthly expenses, EMIs, and loan applications.";
};

// POST /api/chat
exports.chat = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { message, language } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const lang = detectLanguage(message, language);

    // Fetch user context from MongoDB safely
    const user = await User.findById(userId).select('-password');
    const latestLoan = await Loan.findOne({ userId }).sort({ createdAt: -1 });

    const userContext = {
      name: user?.name || user?.firstName || 'User',
      balance: user?.balance ?? 125000,
      income: user?.income ?? 45000,
      expenses: user?.expenses ?? 22000,
      savings: user?.savings ?? 23000,
      creditScore: user?.creditScore ?? 742,
      loanStatus: latestLoan?.status || 'No Active Application'
    };

    let reply = '';

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'demo_key_placeholder' && apiKey.trim() !== '') {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const targetLangName = lang === 'hi' ? 'Hindi' : lang === 'gu' ? 'Gujarati' : 'English';
        const prompt = `You are RupAI, a helpful Indian banking and personal financial assistant.
User context:
- Name: ${userContext.name}
- Account Balance: ₹${userContext.balance}
- Monthly Income: ₹${userContext.income}
- Monthly Expenses: ₹${userContext.expenses}
- Monthly Savings: ₹${userContext.savings}
- Credit Score: ${userContext.creditScore}
- Current Loan Status: ${userContext.loanStatus}

User Query: "${message}"
Target Language: ${targetLangName}

Guidelines:
- Answer in ${targetLangName} language only.
- Keep response concise, helpful, and polite.
- Do not promise guaranteed returns or loan approvals.
- Do not expose any API keys or credentials.`;

        const result = await model.generateContent(prompt);
        if (result && result.response) {
          reply = result.response.text();
        }
      } catch (geminiErr) {
        console.error('Gemini API execution error (falling back to demo mode):', geminiErr.message);
      }
    }

    if (!reply) {
      reply = getFallbackReply(lang, userContext, message);
    }

    const chatDoc = await Chat.create({
      userId,
      message,
      response: reply,
      language: lang,
      timestamp: new Date()
    });

    return res.json({
      success: true,
      data: {
        reply
      },
      reply
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/chat/history
exports.getHistory = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const messages = await Chat.find({ userId })
      .sort({ timestamp: -1, createdAt: -1 })
      .limit(50);

    const formattedMessages = messages.map(m => ({
      id: m._id,
      message: m.message,
      response: m.response,
      language: m.language,
      timestamp: m.timestamp || m.createdAt
    }));

    return res.json({
      success: true,
      data: {
        messages: formattedMessages
      }
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/chat/history
exports.deleteHistory = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    await Chat.deleteMany({ userId });

    return res.json({
      success: true,
      data: {
        message: 'Chat history deleted successfully'
      }
    });
  } catch (err) {
    next(err);
  }
};
