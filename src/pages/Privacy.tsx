import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, Lock, Eye, FileText, CheckCircle2, AlertTriangle, PhoneCall } from 'lucide-react';
import LegalLayout from '../components/LegalLayout';

export default function Privacy() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (idx: number) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  const sections = [
    {
      title: '1. Information We Collect',
      icon: Eye,
      content: `At RupAI Technologies Private Limited ("RupAI", "we", "our"), we collect minimal, relevant information required to provide intelligent banking insights and loan eligibility processing.

• Personal Identity: Name, mobile number, email address, and demographic information during signup.
• Financial Information: Monthly income range, bank account transaction summaries (via user permission or account aggregator integrations), and EMI obligations.
• Technical Data: Device IP, operating system type, app version, and anonymous interaction analytics.`
    },
    {
      title: '2. How We Use Your Data',
      icon: FileText,
      content: `Your data is strictly processed to deliver personalized financial recommendations for users across Bharat.

• AI Recommendation Engines: Computing your Financial Health Score and pre-approved personal / education loan limits.
• Security & Anti-Fraud: Detecting suspicious login attempts and unverified transactions.
• Communication: Sending transactional alerts, monthly budget summaries, and EMI payment reminders.`
    },
    {
      title: '3. AI Recommendation Disclaimer',
      icon: AlertTriangle,
      content: `RupAI utilizes artificial intelligence models to estimate loan eligibility, credit health scores, and savings advice.

• Non-Binding Estimates: AI recommendations do not guarantee formal loan issuance from partner banks or NBFCs.
• Human Oversight: All final loan disbursements undergo regulatory verification and partner bank approval.`
    },
    {
      title: '4. Data Security & RBI Compliance',
      icon: Lock,
      content: `We prioritize bank-grade security to ensure your private financial information remains protected.

• 256-Bit AES Encryption: All data transmitted between your device and backend servers is encrypted in transit and at rest.
• RBI Guidelines: Designed in accordance with Reserve Bank of India (RBI) digital lending circulars and data localization norms.`
    },
    {
      title: '5. User Rights & Data Privacy Control',
      icon: CheckCircle2,
      content: `You maintain complete control over your personal data shared with RupAI.

• Data Access & Export: Request a copy of all stored profile and financial preferences anytime.
• Account & Data Deletion: Delete your account and request complete purge of stored records via App Settings or Contact Support.`
    },
    {
      title: '6. Cookies & Local Storage',
      icon: Shield,
      content: `We use client-side local storage (localStorage) to persist application state, selected language preferences (English, Hindi, Gujarati), and session tokens securely on your device.`
    },
    {
      title: '7. Contact & Grievance Officer',
      icon: PhoneCall,
      content: `For privacy inquiries or grievance redressal, please contact our Data Protection Officer:

Email: privacy@rupai.com | grievance@rupai.com
Address: RupAI Financial Technologies Pvt Ltd, BKC Financial District, Mumbai, Maharashtra 400051.`
    }
  ];

  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Your trust is our highest priority. Learn how RupAI protects your financial information, processes data responsibly, and strictly adheres to RBI digital lending compliance."
      lastUpdated="Sept 12, 2026"
      icon={Shield}
    >
      {/* Collapsible Accordion Sections */}
      <div className="space-y-3.5">
        {sections.map((section, idx) => {
          const isOpen = openSection === idx;
          const Icon = section.icon;
          return (
            <div 
              key={idx}
              className="bg-white rounded-[20px] border border-slate-200 shadow-soft overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleSection(idx)}
                className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-50/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-2xs">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">{section.title}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 pt-1 text-xs text-slate-600 leading-relaxed whitespace-pre-line border-t border-slate-100 font-medium">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </LegalLayout>
  );
}