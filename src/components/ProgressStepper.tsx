import { Check } from 'lucide-react';

interface ProgressStepperProps {
  steps: string[];
  currentStep: number;
}

export default function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary z-0 transition-all duration-500 ease-in-out rounded-full"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  isCompleted 
                    ? 'bg-primary text-white border-4 border-white shadow-sm' 
                    : isActive 
                      ? 'bg-white text-primary border-4 border-primary' 
                      : 'bg-white text-gray-400 border-4 border-gray-200'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : (index + 1)}
              </div>
              <span className={`absolute top-12 text-xs font-medium w-24 text-center ${
                isActive ? 'text-primary' : isCompleted ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
