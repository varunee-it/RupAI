import { useState, useEffect } from 'react';
import { Shield, FileText, CheckCircle2, AlertTriangle, Scale, Lock, UserCheck } from 'lucide-react';
import LegalLayout from '../components/LegalLayout';

export default function Terms() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clauses = [
    {
      title: '1. Eligibility & Acceptance',
      icon: UserCheck,
      body: 'By accessing or using the RupAI Smart Banking platform, you confirm that you are at least 18 years of age, a legal resident of India, and possess full legal capacity to enter into binding financial contracts under the Indian Contract Act, 1872.'
    },
    {
      title: '2. User Account Responsibilities',
      icon: Lock,
      body: 'You are responsible for maintaining the confidentiality of your login credentials, OTP authentication tokens, and device access. Any financial transaction or loan application initiated through your credentials will be deemed executed by you.'
    },
    {
      title: '3. Loan & EMI Disclaimer',
      icon: AlertTriangle,
      body: 'RupAI acts as a digital lending aggregator and credit evaluation platform operating in partnership with RBI-regulated Banks and Non-Banking Financial Companies (NBFCs). Pre-approved loan limits displayed in the app are preliminary estimates and subject to final partner bank underwriting.'
    },
    {
      title: '4. AI Financial Assistant Usage',
      icon: Shield,
      body: 'The RupAI AI Assistant and automated recommendations provide general financial advice and budgeting insights. They do not constitute formal investment underwriting or certified financial planning.'
    },
    {
      title: '5. Privacy Policy Reference',
      icon: FileText,
      body: 'Your use of RupAI is also governed by our Privacy Policy, which details how we handle data encryption, localized storage, and RBI data compliance. Please review the Privacy Policy at /privacy.'
    },
    {
      title: '6. Limitation of Liability',
      icon: Scale,
      body: 'RupAI Technologies Pvt Ltd shall not be liable for any indirect, incidental, or consequential financial losses arising out of market volatility, third-party banking downtime, or unauthorized credential sharing.'
    },
    {
      title: '7. Termination of Service',
      icon: CheckCircle2,
      body: 'We reserve the right to suspend or terminate account access if fraudulent activity, false identification, or breach of these Terms of Service is detected.'
    }
  ];

  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using RupAI Smart Banking services, AI financial assistants, or digital loan eligibility features."
      lastUpdated="Sept 2026"
      icon={Scale}
      scrollProgress={scrollProgress}
    >
      {/* Clauses Container */}
      <div className="bg-white rounded-[20px] p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6">
        {clauses.map((clause, idx) => {
          const Icon = clause.icon;
          return (
            <div key={idx} className="space-y-2.5 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">{clause.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-11 font-medium">
                {clause.body}
              </p>
            </div>
          );
        })}
      </div>
    </LegalLayout>
  );
}