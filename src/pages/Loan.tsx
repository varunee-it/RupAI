import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressStepper from '../components/ProgressStepper';
import { useLanguage } from '../context/LanguageContext';

export default function Loan() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    t.loan.steps.personal,
    t.loan.steps.income,
    t.loan.steps.documents,
    t.loan.steps.review,
    t.loan.steps.approved
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-card rounded-3xl p-8 shadow-soft border border-gray-50">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.loan.title}</h2>
          <p className="text-sm text-gray-500">{t.loan.subtitle}</p>
          <ProgressStepper steps={steps} currentStep={currentStep} />
        </div>

        <div className="min-h-[300px] flex flex-col justify-center">
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-semibold mb-4">Tell us about yourself</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-primary focus:border-primary" placeholder="First Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-primary focus:border-primary" placeholder="Last Name" />
                </div>
              </div>
            </div>
          )}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-semibold mb-4">Your Employment</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income (₹)</label>
                <input type="number" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-primary focus:border-primary" placeholder="e.g. 50000" />
              </div>
            </div>
          )}
          {currentStep > 1 && currentStep < 4 && (
             <div className="flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                   <span className="text-gray-400">Step {currentStep + 1}</span>
                </div>
                <h3 className="text-lg font-semibold">{steps[currentStep]} Details</h3>
                <p className="text-gray-500 text-sm mt-2">Please fill in your {steps[currentStep].toLowerCase()} to proceed.</p>
             </div>
          )}
          {currentStep === 4 && (
            <div className="flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center text-success mb-4">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Loan Approved!</h3>
              <p className="text-gray-500 max-w-sm">Congratulations! Your loan application has been approved and funds will be disbursed shortly.</p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0 || currentStep === steps.length - 1}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Back
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Continue
            </button>
          ) : (
             <button
              onClick={() => setCurrentStep(0)}
              className="px-6 py-2.5 bg-success text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors shadow-sm"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
