import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Home, Zap, GraduationCap, Briefcase, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { AlternativeData, CreditScore } from '../App';

interface DashboardProps {
  userData: AlternativeData;
  creditScore: CreditScore;
  onBack: () => void;
  onCoaching: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, creditScore, onBack, onCoaching }) => {
  const getImpactIcon = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive': return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'negative': return <ArrowDown className="h-4 w-4 text-red-600" />;
      case 'neutral': return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Rent')) return <Home className="h-5 w-5" />;
    if (category.includes('Utility')) return <Zap className="h-5 w-5" />;
    if (category.includes('Cash') || category.includes('Income')) return <DollarSign className="h-5 w-5" />;
    if (category.includes('Education')) return <GraduationCap className="h-5 w-5" />;
    if (category.includes('Employment')) return <Briefcase className="h-5 w-5" />;
    return <BarChart3 className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Credit Dashboard</h1>
            <p className="text-gray-600 mt-1">Comprehensive view of your alternative credit profile</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Assessment
            </button>
            <button
              onClick={onCoaching}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Coaching
            </button>
          </div>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credit Score</p>
                <p className="text-3xl font-bold text-blue-600">{creditScore.score}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                creditScore.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                creditScore.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {creditScore.riskLevel} Risk
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approval Status</p>
                <p className={`text-lg font-bold ${creditScore.approval ? 'text-green-600' : 'text-red-600'}`}>
                  {creditScore.approval ? 'Approved' : 'Needs Review'}
                </p>
              </div>
              <div className={`p-3 rounded-full ${creditScore.approval ? 'bg-green-100' : 'bg-red-100'}`}>
                <TrendingUp className={`h-6 w-6 ${creditScore.approval ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Annual Income</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${userData.personalInfo.annualIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Payment Reliability</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((userData.rentPayments.onTimePayments / userData.rentPayments.totalMonths) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Factor Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Score Factors</h3>
            <div className="space-y-4">
              {creditScore.factors.map((factor, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(factor.category)}
                      <span className="font-medium text-gray-900">{factor.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getImpactIcon(factor.impact)}
                      <span className="text-sm font-semibold">
                        {Math.round(factor.score)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Weight: {(factor.weight * 100).toFixed(0)}%</span>
                    <span className={`font-medium ${
                      factor.impact === 'positive' ? 'text-green-600' :
                      factor.impact === 'negative' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {factor.impact}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        factor.impact === 'positive' ? 'bg-green-500' :
                        factor.impact === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min(factor.score, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Profile</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Housing
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Rent:</span>
                    <span className="font-medium">${userData.rentPayments.monthlyRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment History:</span>
                    <span className="font-medium">
                      {userData.rentPayments.onTimePayments}/{userData.rentPayments.totalMonths} payments
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Landlord Verified:</span>
                    <span className={`font-medium ${userData.rentPayments.landlordVerified ? 'text-green-600' : 'text-gray-600'}`}>
                      {userData.rentPayments.landlordVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Utilities
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Monthly Bill:</span>
                    <span className="font-medium">${userData.utilities.avgMonthlyBill}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">On-Time Rate:</span>
                    <span className="font-medium">
                      {((userData.utilities.onTimePayments / userData.utilities.totalBills) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Providers:</span>
                    <span className="font-medium">{userData.utilities.providersReporting.length} reporting</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Cash Flow
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Income:</span>
                    <span className="font-medium">${userData.cashFlow.avgMonthlyIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Expenses:</span>
                    <span className="font-medium">${userData.cashFlow.avgMonthlyExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Savings Rate:</span>
                    <span className="font-medium">{(userData.cashFlow.savingsRate * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Age:</span>
                    <span className="font-medium">{userData.cashFlow.bankAccountAge} years</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Employment
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">{userData.personalInfo.employmentStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Job:</span>
                    <span className="font-medium">{userData.employment.currentJobTenure} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Experience:</span>
                    <span className="font-medium">{userData.employment.employmentHistory} years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Improvement Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creditScore.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-blue-800">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;