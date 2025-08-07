import React, { useState } from 'react';
import { TrendingUp, Target, Calendar, DollarSign, PiggyBank, CreditCard, ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { CreditScore } from '../App';

interface FinancialCoachingProps {
  creditScore: CreditScore;
  onBack: () => void;
}

const FinancialCoaching: React.FC<FinancialCoachingProps> = ({ creditScore, onBack }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const toggleAction = (actionId: string) => {
    setCompletedActions(prev => 
      prev.includes(actionId) 
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  const improvementActions = [
    {
      id: 'auto-pay',
      title: 'Set Up Automatic Payments',
      description: 'Automate your rent and utility payments to ensure 100% on-time payment rate',
      impact: '+15-25 points',
      timeframe: '1-3 months',
      category: 'Payment History',
      steps: [
        'Contact your bank to set up automatic transfers',
        'Schedule payments 3-5 days before due dates',
        'Set up account notifications for low balances',
        'Review and confirm all automatic payments monthly'
      ]
    },
    {
      id: 'emergency-fund',
      title: 'Build Emergency Fund',
      description: 'Create a 3-6 month emergency fund to improve cash flow stability',
      impact: '+10-20 points',
      timeframe: '6-12 months',
      category: 'Cash Flow',
      steps: [
        'Calculate 3-6 months of essential expenses',
        'Open a separate high-yield savings account',
        'Set up automatic transfers of 10-20% of income',
        'Avoid touching the fund except for true emergencies'
      ]
    },
    {
      id: 'side-income',
      title: 'Develop Additional Income Streams',
      description: 'Increase your income stability with additional revenue sources',
      impact: '+5-15 points',
      timeframe: '3-6 months',
      category: 'Income Stability',
      steps: [
        'Identify skills you can monetize (tutoring, freelancing, etc.)',
        'Set up profiles on relevant platforms (Upwork, Fiverr, etc.)',
        'Start with 5-10 hours per week of additional work',
        'Track and document all additional income sources'
      ]
    },
    {
      id: 'debt-reduction',
      title: 'Optimize Debt Management',
      description: 'Reduce outstanding debts to improve your debt-to-income ratio',
      impact: '+20-30 points',
      timeframe: '6-18 months',
      category: 'Financial Health',
      steps: [
        'List all debts with balances and interest rates',
        'Choose debt avalanche or snowball method',
        'Allocate any extra income toward debt payments',
        'Consider debt consolidation if beneficial'
      ]
    },
    {
      id: 'credit-builder',
      title: 'Add Traditional Credit Elements',
      description: 'Complement your alternative profile with traditional credit accounts',
      impact: '+25-40 points',
      timeframe: '3-12 months',
      category: 'Credit Mix',
      steps: [
        'Consider a secured credit card if needed',
        'Keep credit utilization below 30%',
        'Make small purchases and pay off monthly',
        'Monitor your traditional credit score regularly'
      ]
    },
    {
      id: 'skill-development',
      title: 'Enhance Professional Skills',
      description: 'Gain certifications and endorsements to boost employment stability',
      impact: '+5-10 points',
      timeframe: '3-9 months',
      category: 'Professional Growth',
      steps: [
        'Identify in-demand skills in your industry',
        'Complete online courses or certifications',
        'Update LinkedIn profile with new skills',
        'Seek endorsements from colleagues and supervisors'
      ]
    }
  ];

  const financialGoals = [
    {
      id: 'home-purchase',
      title: 'Buy a Home',
      description: 'Prepare for homeownership with improved creditworthiness',
      targetScore: 720,
      timeline: '12-18 months'
    },
    {
      id: 'business-loan',
      title: 'Start a Business',
      description: 'Qualify for business loans and credit lines',
      targetScore: 680,
      timeline: '6-12 months'
    },
    {
      id: 'debt-consolidation',
      title: 'Consolidate Debt',
      description: 'Get better rates on debt consolidation loans',
      targetScore: 650,
      timeline: '3-6 months'
    },
    {
      id: 'premium-credit',
      title: 'Premium Credit Cards',
      description: 'Access to premium credit cards with rewards',
      targetScore: 750,
      timeline: '9-15 months'
    }
  ];

  const getScoreImprovement = () => {
    const currentScore = creditScore.score;
    if (currentScore < 600) return 50;
    if (currentScore < 700) return 40;
    return 30;
  };

  const potentialScore = Math.min(850, creditScore.score + getScoreImprovement());

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Coaching</h1>
            <p className="text-gray-600 mt-1">Personalized guidance to improve your creditworthiness</p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
        </div>

        {/* Score Projection */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{creditScore.score}</div>
              <div className="text-blue-200">Current Score</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-300" />
              <div className="text-2xl font-bold mb-2">+{getScoreImprovement()}</div>
              <div className="text-blue-200">Potential Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-green-300">{potentialScore}</div>
              <div className="text-blue-200">Projected Score</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-blue-100">
              Follow our personalized action plan to potentially improve your score by {getScoreImprovement()} points
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Goals Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Your Goals
              </h3>
              <div className="space-y-3">
                {financialGoals.map((goal) => (
                  <div
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedGoal === goal.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Target: {goal.targetScore}+
                      </span>
                      <span className="text-gray-500">{goal.timeline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Tracker</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Actions Completed</span>
                  <span className="font-semibold">{completedActions.length}/6</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedActions.length / 6) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  Complete more actions to maximize your score improvement
                </p>
              </div>
            </div>
          </div>

          {/* Action Plan */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Personalized Action Plan</h3>
              <div className="space-y-6">
                {improvementActions.map((action, index) => (
                  <div
                    key={action.id}
                    className={`border rounded-lg p-6 transition-all ${
                      completedActions.includes(action.id)
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleAction(action.id)}
                          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            completedActions.includes(action.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-blue-500'
                          }`}
                        >
                          {completedActions.includes(action.id) && (
                            <CheckCircle className="h-3 w-3" />
                          )}
                        </button>
                        <div>
                          <h4 className={`font-semibold ${
                            completedActions.includes(action.id) ? 'text-green-800' : 'text-gray-900'
                          }`}>
                            {action.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {action.impact}
                        </span>
                        <span className="text-xs text-gray-500">{action.timeframe}</span>
                      </div>
                    </div>

                    <div className="ml-8">
                      <div className="mb-3">
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {action.category}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-900">Action Steps:</h5>
                        <ol className="text-sm text-gray-600 space-y-1 ml-4">
                          {action.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start">
                              <span className="text-blue-500 mr-2">{stepIndex + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Stories */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Success Stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="font-semibold text-green-800">Sarah M.</span>
                  </div>
                  <p className="text-sm text-green-700 mb-2">
                    "Improved my score from 580 to 720 in 8 months by following the action plan!"
                  </p>
                  <span className="text-xs text-green-600 font-medium">Score increase: +140 points</span>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="font-semibold text-blue-800">Marcus D.</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">
                    "Got approved for my first home loan after using alternative credit scoring!"
                  </p>
                  <span className="text-xs text-blue-600 font-medium">Score increase: +95 points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCoaching;