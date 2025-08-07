import React from 'react';
import { CheckCircle, XCircle, TrendingUp, BarChart3, Eye, ArrowRight } from 'lucide-react';
import { AlternativeData, CreditScore } from '../App';

interface CreditAssessmentProps {
  userData: AlternativeData;
  creditScore: CreditScore;
  onViewDashboard: () => void;
}

const CreditAssessment: React.FC<CreditAssessmentProps> = ({ userData, creditScore, onViewDashboard }) => {
  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 750) return 'from-green-500 to-green-600';
    if (score >= 650) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Credit Assessment</h1>
          <p className="text-lg text-gray-600">
            Based on your alternative financial data, here's your comprehensive credit evaluation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Credit Score Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getScoreGradient(creditScore.score)} mb-4`}>
                  <span className="text-4xl font-bold text-white">{creditScore.score}</span>
                </div>
                <h2 className={`text-3xl font-bold ${getScoreColor(creditScore.score)} mb-2`}>
                  {creditScore.score >= 750 ? 'Excellent' : creditScore.score >= 650 ? 'Good' : 'Fair'}
                </h2>
                <div className="flex items-center justify-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskBadgeColor(creditScore.riskLevel)}`}>
                    {creditScore.riskLevel} Risk
                  </span>
                  <span className={`flex items-center text-sm font-medium ${creditScore.approval ? 'text-green-600' : 'text-red-600'}`}>
                    {creditScore.approval ? <CheckCircle className="h-4 w-4 mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
                    {creditScore.approval ? 'Approved' : 'Needs Review'}
                  </span>
                </div>
              </div>

              {/* Score Range Indicator */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
                <div className="relative h-4 bg-gradient-to-r from-red-500 via-yellow-500 via-blue-500 to-green-500 rounded-full">
                  <div
                    className="absolute top-0 w-4 h-4 bg-white border-2 border-gray-700 rounded-full transform -translate-x-2"
                    style={{ left: `${((creditScore.score - 300) / 550) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>300</span>
                  <span>850</span>
                </div>
              </div>

              {/* Loan Recommendation */}
              <div className={`p-6 rounded-lg ${creditScore.approval ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Loan Recommendation</h3>
                <p className={`text-sm ${creditScore.approval ? 'text-green-700' : 'text-red-700'}`}>
                  {creditScore.approval
                    ? `Based on your alternative credit profile, you are likely to qualify for loans with competitive interest rates. Your strong payment history and financial stability make you a reliable borrower.`
                    : `While your current profile shows some areas for improvement, there are still lending options available. Consider working on the recommendations below to improve your creditworthiness.`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Factors</h3>
              <div className="space-y-4">
                {creditScore.factors.slice(0, 3).map((factor, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{factor.category}</span>
                      <span className={`text-sm font-semibold ${
                        factor.impact === 'positive' ? 'text-green-600' :
                        factor.impact === 'negative' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {Math.round(factor.score)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          factor.impact === 'positive' ? 'bg-green-500' :
                          factor.impact === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{userData.personalInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Income:</span>
                  <span className="font-medium">${userData.personalInfo.annualIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employment:</span>
                  <span className="font-medium">{userData.personalInfo.employmentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rent Payment Rate:</span>
                  <span className="font-medium">
                    {((userData.rentPayments.onTimePayments / userData.rentPayments.totalMonths) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onViewDashboard}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              View Detailed Dashboard
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Transparency Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Eye className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">How Your Score Was Calculated</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {creditScore.factors.map((factor, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900">{factor.category}</h4>
                    <span className={`px-2 py-1 text-xs rounded ${
                      factor.impact === 'positive' ? 'bg-green-100 text-green-800' :
                      factor.impact === 'negative' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {factor.impact}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Weight: {(factor.weight * 100).toFixed(0)}% • Score: {Math.round(factor.score)}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        factor.impact === 'positive' ? 'bg-green-500' :
                        factor.impact === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${factor.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Our Fair & Transparent Approach</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>No bias based on race, gender, or zip code</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Focus on actual payment behavior</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete transparency in scoring methodology</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Alternative data sources for broader inclusion</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Personalized Recommendations</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creditScore.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-800">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditAssessment;