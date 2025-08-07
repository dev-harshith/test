import React, { useState } from 'react';
import { CreditCard, BarChart3, User, TrendingUp, Shield, Home } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import DataInputWizard from './components/DataInputWizard';
import CreditAssessment from './components/CreditAssessment';
import Dashboard from './components/Dashboard';
import FinancialCoaching from './components/FinancialCoaching';

export interface AlternativeData {
  personalInfo: {
    name: string;
    age: number;
    education: string;
    employmentStatus: string;
    annualIncome: number;
  };
  rentPayments: {
    monthlyRent: number;
    onTimePayments: number;
    totalMonths: number;
    landlordVerified: boolean;
  };
  utilities: {
    avgMonthlyBill: number;
    onTimePayments: number;
    totalBills: number;
    providersReporting: string[];
  };
  cashFlow: {
    avgMonthlyIncome: number;
    avgMonthlyExpenses: number;
    savingsRate: number;
    bankAccountAge: number;
  };
  education: {
    degreeLevel: string;
    graduationYear: number;
    studentLoansOutstanding: number;
    certifications: string[];
  };
  employment: {
    currentJobTenure: number;
    employmentHistory: number;
    skillsEndorsements: number;
  };
}

export interface CreditScore {
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  approval: boolean;
  factors: {
    category: string;
    score: number;
    weight: number;
    impact: 'positive' | 'negative' | 'neutral';
  }[];
  recommendations: string[];
}

function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'input' | 'assessment' | 'dashboard' | 'coaching'>('welcome');
  const [userData, setUserData] = useState<AlternativeData | null>(null);
  const [creditScore, setCreditScore] = useState<CreditScore | null>(null);

  const handleDataSubmit = (data: AlternativeData) => {
    setUserData(data);
    
    // Calculate credit score based on alternative data
    const score = calculateCreditScore(data);
    setCreditScore(score);
    setCurrentView('assessment');
  };

  const calculateCreditScore = (data: AlternativeData): CreditScore => {
    const factors = [
      {
        category: 'Rent Payment History',
        score: (data.rentPayments.onTimePayments / data.rentPayments.totalMonths) * 100,
        weight: 0.25,
        impact: data.rentPayments.onTimePayments / data.rentPayments.totalMonths > 0.95 ? 'positive' : 
               data.rentPayments.onTimePayments / data.rentPayments.totalMonths > 0.8 ? 'neutral' : 'negative'
      },
      {
        category: 'Utility Payment Reliability',
        score: (data.utilities.onTimePayments / data.utilities.totalBills) * 100,
        weight: 0.15,
        impact: data.utilities.onTimePayments / data.utilities.totalBills > 0.9 ? 'positive' : 'neutral'
      },
      {
        category: 'Cash Flow Stability',
        score: Math.min(data.cashFlow.savingsRate * 10, 100),
        weight: 0.20,
        impact: data.cashFlow.savingsRate > 0.2 ? 'positive' : data.cashFlow.savingsRate > 0.1 ? 'neutral' : 'negative'
      },
      {
        category: 'Income Stability',
        score: Math.min((data.personalInfo.annualIncome / 30000) * 50, 100),
        weight: 0.15,
        impact: data.personalInfo.annualIncome > 50000 ? 'positive' : 'neutral'
      },
      {
        category: 'Education & Skills',
        score: getEducationScore(data.education.degreeLevel) + (data.employment.skillsEndorsements * 2),
        weight: 0.10,
        impact: data.education.degreeLevel !== 'High School' ? 'positive' : 'neutral'
      },
      {
        category: 'Employment Stability',
        score: Math.min(data.employment.currentJobTenure * 10 + data.employment.employmentHistory * 5, 100),
        weight: 0.15,
        impact: data.employment.currentJobTenure > 2 ? 'positive' : 'neutral'
      }
    ] as const;

    const weightedScore = factors.reduce((total, factor) => {
      return total + (factor.score * factor.weight);
    }, 0);

    const finalScore = Math.round(Math.max(300, Math.min(850, weightedScore * 5.5 + 300)));

    return {
      score: finalScore,
      riskLevel: finalScore > 700 ? 'Low' : finalScore > 600 ? 'Medium' : 'High',
      approval: finalScore > 580,
      factors,
      recommendations: generateRecommendations(factors)
    };
  };

  const getEducationScore = (level: string): number => {
    const scores: { [key: string]: number } = {
      'High School': 20,
      'Some College': 35,
      'Associate Degree': 45,
      'Bachelor\'s Degree': 60,
      'Master\'s Degree': 75,
      'Doctoral Degree': 85
    };
    return scores[level] || 20;
  };

  const generateRecommendations = (factors: any[]): string[] => {
    const recommendations = [];
    
    factors.forEach(factor => {
      if (factor.impact === 'negative') {
        switch (factor.category) {
          case 'Rent Payment History':
            recommendations.push('Set up automatic rent payments to improve payment reliability');
            break;
          case 'Cash Flow Stability':
            recommendations.push('Consider creating an emergency fund to improve financial stability');
            break;
          case 'Income Stability':
            recommendations.push('Explore opportunities for additional income streams');
            break;
        }
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('Continue maintaining your excellent financial habits');
      recommendations.push('Consider diversifying your income sources for even better stability');
    }

    return recommendations;
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentView('input')} />;
      case 'input':
        return <DataInputWizard onSubmit={handleDataSubmit} onBack={() => setCurrentView('welcome')} />;
      case 'assessment':
        return (
          <CreditAssessment
            userData={userData!}
            creditScore={creditScore!}
            onViewDashboard={() => setCurrentView('dashboard')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            userData={userData!}
            creditScore={creditScore!}
            onBack={() => setCurrentView('assessment')}
            onCoaching={() => setCurrentView('coaching')}
          />
        );
      case 'coaching':
        return (
          <FinancialCoaching
            creditScore={creditScore!}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return <WelcomeScreen onGetStarted={() => setCurrentView('input')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">CreditFlow</h1>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('welcome')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'welcome' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              {userData && (
                <>
                  <button
                    onClick={() => setCurrentView('assessment')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'assessment' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Assessment</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('coaching')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'coaching' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>Coaching</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {renderCurrentView()}
    </div>
  );
}

export default App;