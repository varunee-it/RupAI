import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MessageSquare, 
  Mail, 
  Bug, 
  ChevronDown, 
  HelpCircle, 
  Check
} from 'lucide-react';
import LegalLayout from '../components/LegalLayout';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bugReported, setBugReported] = useState(false);

  const faqs = [
    {
      q: 'How do I apply for a pre-approved personal or education loan?',
      a: 'Navigate to the Loan Journey tab in the sidebar. Follow the 5 simple 100% digital steps: Personal Details -> Employment & Income -> Document Verification -> Instant Offer Review -> Digital Disbursement Approval.',
      cat: 'loan'
    },
    {
      q: 'How is my monthly EMI and loan interest calculated?',
      a: 'RupAI estimates loan EMIs using standard reducing-balance calculations based on your requested principal amount, tenure (up to 60 months), and partner bank interest rates (starting at 10.5% p.a.).',
      cat: 'loan'
    },
    {
      q: 'How do I reset my password if I forget it?',
      a: 'On the Sign In page, click "Forgot Password?". Enter your registered email address to receive a 6-digit OTP code, verify the code, and set a new password instantly.',
      cat: 'account'
    },
    {
      q: 'How do I change the app language across the entire application?',
      a: 'Go to Settings -> Global Language System. Select English, Hindi (हिंदी), or Gujarati (ગુજરાતી). Every page, sidebar, and navbar label will update immediately without reloading.',
      cat: 'settings'
    },
    {
      q: 'How do I enable or disable push notifications and EMI reminders?',
      a: 'Navigate to Settings -> Security & Privacy. Toggle the "Push Notifications" and "Email Statements" switches ON or OFF as desired.',
      cat: 'settings'
    },
    {
      q: 'Can I use Biometric / Touch ID / Face ID login?',
      a: 'Yes! Toggle "Biometric / FaceID Login" in Settings -> Security. You can use your mobile or hardware biometric scanner for secure access.',
      cat: 'security'
    },
    {
      q: 'Is my personal and financial data stored securely?',
      a: 'Absolutly. RupAI employs bank-grade 256-bit AES encryption in transit and at rest. Your financial data is handled according to RBI digital lending guidelines and data localization mandates.',
      cat: 'security'
    },
    {
      q: 'How can I contact customer support directly?',
      a: 'You can tap the WhatsApp Support or Email Support buttons at the top of this Help Center, or email us directly at support@rupai.com available 24/7.',
      cat: 'support'
    }
  ];

  const filteredFaqs = faqs.filter(
    faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LegalLayout
      title="Help & Support Center"
      subtitle="Search topics or connect with our support team instantly available 24/7 for users across Bharat."
      lastUpdated="Sept 2026"
      icon={HelpCircle}
      headerContent={
        <div className="relative max-w-xl">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. loan, password, language, biometric)..."
            className="w-full bg-white text-slate-900 placeholder-slate-400 pl-11 pr-4 py-3 rounded-2xl text-xs font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400/80 transition-all"
          />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Quick Action Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <a
            href="https://wa.me/919876543210?text=Hi%20RupAI%20Support%2C%20I%20need%20assistance"
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-50/70 border border-emerald-200/80 hover:border-emerald-300 rounded-[24px] p-4.5 flex items-center space-x-3.5 transition-all duration-200 hover:shadow-md cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">WhatsApp Support</h4>
              <p className="text-[11px] text-emerald-700 font-medium">Instant Chat • <span className="font-bold">Online</span></p>
            </div>
          </a>

          <a
            href="mailto:support@rupai.com?subject=RupAI%20Support%20Inquiry"
            className="bg-blue-50/70 border border-blue-200/80 hover:border-blue-300 rounded-[24px] p-4.5 flex items-center space-x-3.5 transition-all duration-200 hover:shadow-md cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Email Support</h4>
              <p className="text-[11px] text-blue-700 font-medium">support@rupai.com</p>
            </div>
          </a>

          <button
            type="button"
            onClick={() => { setBugReported(true); setTimeout(() => setBugReported(false), 3000); }}
            className="bg-amber-50/70 border border-amber-200/80 hover:border-amber-300 rounded-[24px] p-4.5 flex items-center space-x-3.5 transition-all duration-200 hover:shadow-md cursor-pointer group text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              {bugReported ? <Check className="w-5 h-5" /> : <Bug className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">
                {bugReported ? 'Report Submitted!' : 'Report a Bug'}
              </h4>
              <p className="text-[11px] text-amber-700 font-medium">
                {bugReported ? 'Thanks for letting us know' : 'Send app feedback'}
              </p>
            </div>
          </button>
        </div>

        {/* Expandable FAQs Section */}
        <div className="bg-white rounded-[20px] p-6 shadow-soft border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900">Frequently Asked Questions</h3>
            <span className="text-xs text-slate-400 font-medium">Showing {filteredFaqs.length} questions</span>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-bold text-slate-700">No matching questions found</p>
              <p className="text-xs text-slate-400">Try searching for keywords like "loan", "password", or "language".</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <span className="font-extrabold text-slate-800 text-xs pr-4">{faq.q}</span>
                      <ChevronDown className={`w-4.5 h-4.5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4 pb-4 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-50 pt-2 bg-slate-50/30">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </LegalLayout>
  );
}