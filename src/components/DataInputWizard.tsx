import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, User, Home, Zap, DollarSign, GraduationCap, Briefcase } from 'lucide-react';
import { AlternativeData } from '../App';

interface DataInputWizardProps {
  onSubmit: (data: AlternativeData) => void;
  onBack: () => void;
}

const DataInputWizard: React.FC<DataInputWizardProps> = ({ onSubmit, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AlternativeData>({
    personalInfo: {
      name: '',
      age: 0,
      education: '',
      employmentStatus: '',
      annualIncome: 0
    },
    rentPayments: {
      monthlyRent: 0,
      onTimePayments: 0,
      totalMonths: 0,
      landlordVerified: false
    },
    utilities: {
      avgMonthlyBill: 0,
      onTimePayments: 0,
      totalBills: 0,
      providersReporting: []
    },
    cashFlow: {
      avgMonthlyIncome: 0,
      avgMonthlyExpenses: 0,
      savingsRate: 0,
      bankAccountAge: 0
    },
    education: {
      degreeLevel: '',
      graduationYear: 0,
      studentLoansOutstanding: 0,
      certifications: []
    },
    employment: {
      currentJobTenure: 0,
      employmentHistory: 0,
      skillsEndorsements: 0
    }
  });

  const steps = [
    { title: 'Personal Information', icon: User },
    { title: 'Rent History', icon: Home },
    { title: 'Utilities', icon: Zap },
    { title: 'Cash Flow', icon: DollarSign },
    { title: 'Education', icon: GraduationCap },
    { title: 'Employment', icon: Briefcase }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (section: keyof AlternativeData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.name}
                  onChange={(e) => updateFormData('personalInfo', { name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.personalInfo.age || ''}
                  onChange={(e) => updateFormData('personalInfo', { age: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                <select
                  value={formData.personalInfo.employmentStatus}
                  onChange={(e) => updateFormData('personalInfo', { employmentStatus: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select employment status</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Student">Student</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
                <input
                  type="number"
                  value={formData.personalInfo.annualIncome || ''}
                  onChange={(e) => updateFormData('personalInfo', { annualIncome: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Annual income in USD"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Rent Payment History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent</label>
                <input
                  type="number"
                  value={formData.rentPayments.monthlyRent || ''}
                  onChange={(e) => updateFormData('rentPayments', { monthlyRent: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Monthly rent amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Months Rented</label>
                <input
                  type="number"
                  value={formData.rentPayments.totalMonths || ''}
                  onChange={(e) => updateFormData('rentPayments', { totalMonths: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total months"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">On-Time Payments</label>
                <input
                  type="number"
                  value={formData.rentPayments.onTimePayments || ''}
                  onChange={(e) => updateFormData('rentPayments', { onTimePayments: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Number of on-time payments"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rentPayments.landlordVerified}
                  onChange={(e) => updateFormData('rentPayments', { landlordVerified: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Landlord verification available
                </label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Utility Payment History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Monthly Bill</label>
                <input
                  type="number"
                  value={formData.utilities.avgMonthlyBill || ''}
                  onChange={(e) => updateFormData('utilities', { avgMonthlyBill: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Average monthly utility bill"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Bills</label>
                <input
                  type="number"
                  value={formData.utilities.totalBills || ''}
                  onChange={(e) => updateFormData('utilities', { totalBills: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total number of bills"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">On-Time Payments</label>
                <input
                  type="number"
                  value={formData.utilities.onTimePayments || ''}
                  onChange={(e) => updateFormData('utilities', { onTimePayments: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="On-time utility payments"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Utility Providers</label>
                <div className="space-y-2">
                  {['Electric', 'Gas', 'Water', 'Internet', 'Phone'].map((provider) => (
                    <label key={provider} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.utilities.providersReporting.includes(provider)}
                        onChange={(e) => {
                          const providers = e.target.checked
                            ? [...formData.utilities.providersReporting, provider]
                            : formData.utilities.providersReporting.filter(p => p !== provider);
                          updateFormData('utilities', { providersReporting: providers });
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-900">{provider}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cash Flow Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Monthly Income</label>
                <input
                  type="number"
                  value={formData.cashFlow.avgMonthlyIncome || ''}
                  onChange={(e) => updateFormData('cashFlow', { avgMonthlyIncome: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Average monthly income"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Monthly Expenses</label>
                <input
                  type="number"
                  value={formData.cashFlow.avgMonthlyExpenses || ''}
                  onChange={(e) => updateFormData('cashFlow', { avgMonthlyExpenses: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Average monthly expenses"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Savings Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cashFlow.savingsRate || ''}
                  onChange={(e) => updateFormData('cashFlow', { savingsRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Savings rate (0.0 - 1.0)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Age (years)</label>
                <input
                  type="number"
                  value={formData.cashFlow.bankAccountAge || ''}
                  onChange={(e) => updateFormData('cashFlow', { bankAccountAge: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Years since opening account"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Education Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Highest Degree</label>
                <select
                  value={formData.education.degreeLevel}
                  onChange={(e) => updateFormData('education', { degreeLevel: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select degree level</option>
                  <option value="High School">High School</option>
                  <option value="Some College">Some College</option>
                  <option value="Associate Degree">Associate Degree</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="Doctoral Degree">Doctoral Degree</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                <input
                  type="number"
                  value={formData.education.graduationYear || ''}
                  onChange={(e) => updateFormData('education', { graduationYear: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Year of graduation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Outstanding Student Loans</label>
                <input
                  type="number"
                  value={formData.education.studentLoansOutstanding || ''}
                  onChange={(e) => updateFormData('education', { studentLoansOutstanding: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Outstanding loan amount"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Employment History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Job Tenure (years)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.employment.currentJobTenure || ''}
                  onChange={(e) => updateFormData('employment', { currentJobTenure: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Years at current job"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Employment History (years)</label>
                <input
                  type="number"
                  value={formData.employment.employmentHistory || ''}
                  onChange={(e) => updateFormData('employment', { employmentHistory: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total years of employment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills Endorsements</label>
                <input
                  type="number"
                  value={formData.employment.skillsEndorsements || ''}
                  onChange={(e) => updateFormData('employment', { skillsEndorsements: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Number of professional endorsements"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      index <= currentStep
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <span className={`text-sm mt-2 ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={currentStep === 0 ? onBack : handlePrev}
              className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 0 ? 'Back to Home' : 'Previous'}
            </button>

            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Calculate Score' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataInputWizard;