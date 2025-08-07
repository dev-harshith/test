// Global variables
let creditScoreData = null;
let scoreChart = null;

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Form submission
    document.getElementById('creditForm').addEventListener('submit', handleFormSubmission);
    
    // ROI Calculator
    document.getElementById('avgLoanAmount').addEventListener('input', calculateROI);
    document.getElementById('interestRate').addEventListener('input', calculateROI);
    document.getElementById('numLoans').addEventListener('input', calculateROI);
    
    // Initialize ROI calculation
    calculateROI();
});

// Start assessment function
function startAssessment() {
    document.getElementById('assessment').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('a[href="#assessment"]').classList.add('active');
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
    submitButton.disabled = true;
    
    // Collect form data
    const formData = collectFormData();
    
    // Simulate processing time
    setTimeout(() => {
        // Calculate credit score
        creditScoreData = calculateCreditScore(formData);
        
        // Display results
        displayResults(creditScoreData);
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Scroll to results
        document.getElementById('results').style.display = 'block';
        document.getElementById('results').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelector('a[href="#results"]').classList.add('active');
        
    }, 2000);
}

// Collect form data
function collectFormData() {
    return {
        // Personal Information
        fullName: document.getElementById('fullName').value,
        age: parseInt(document.getElementById('age').value) || 0,
        income: parseInt(document.getElementById('income').value) || 0,
        employment: document.getElementById('employment').value,
        
        // Rent & Housing
        monthlyRent: parseInt(document.getElementById('monthlyRent').value) || 0,
        monthsAtAddress: parseInt(document.getElementById('monthsAtAddress').value) || 0,
        rentPaymentRate: parseInt(document.getElementById('rentPaymentRate').value) || 0,
        housingType: document.getElementById('housingType').value,
        
        // Utilities & Bills
        utilityBill: parseInt(document.getElementById('utilityBill').value) || 0,
        utilityReliability: parseInt(document.getElementById('utilityReliability').value) || 0,
        phonePayments: parseInt(document.getElementById('phonePayments').value) || 0,
        internetPayments: parseInt(document.getElementById('internetPayments').value) || 0,
        
        // Banking & Cash Flow
        bankBalance: parseInt(document.getElementById('bankBalance').value) || 0,
        bankRelationship: parseInt(document.getElementById('bankRelationship').value) || 0,
        savingsRate: parseInt(document.getElementById('savingsRate').value) || 0,
        overdrafts: parseInt(document.getElementById('overdrafts').value) || 0,
        
        // Education & Skills
        education: document.getElementById('education').value,
        certifications: parseInt(document.getElementById('certifications').value) || 0,
        workExperience: parseInt(document.getElementById('workExperience').value) || 0,
        jobTenure: parseInt(document.getElementById('jobTenure').value) || 0,
        
        // Social & Digital
        linkedinConnections: parseInt(document.getElementById('linkedinConnections').value) || 0,
        references: parseInt(document.getElementById('references').value) || 0,
        shoppingHistory: parseInt(document.getElementById('shoppingHistory').value) || 0,
        digitalPayments: document.getElementById('digitalPayments').value,
        
        // Transportation
        vehicleOwnership: document.getElementById('vehicleOwnership').value,
        insurancePayments: parseInt(document.getElementById('insurancePayments').value) || 0,
        publicTransit: document.getElementById('publicTransit').value,
        ridesharing: document.getElementById('ridesharing').value
    };
}

// Calculate credit score using alternative data
function calculateCreditScore(data) {
    const factors = [];
    
    // Rent Payment History (25% weight)
    const rentScore = Math.min(data.rentPaymentRate, 100);
    factors.push({
        name: 'Rent Payment History',
        score: rentScore,
        weight: 0.25,
        color: '#10b981',
        impact: rentScore >= 90 ? 'positive' : rentScore >= 70 ? 'neutral' : 'negative'
    });
    
    // Utility Payment Reliability (15% weight)
    const utilityScore = (data.utilityReliability + data.phonePayments + data.internetPayments) / 3;
    factors.push({
        name: 'Utility Payments',
        score: utilityScore,
        weight: 0.15,
        color: '#3b82f6',
        impact: utilityScore >= 85 ? 'positive' : utilityScore >= 70 ? 'neutral' : 'negative'
    });
    
    // Cash Flow Stability (20% weight)
    const cashFlowScore = Math.min(
        (data.savingsRate * 2) + 
        (data.bankRelationship * 2) + 
        Math.max(0, 100 - (data.overdrafts * 10)), 
        100
    );
    factors.push({
        name: 'Cash Flow Stability',
        score: cashFlowScore,
        weight: 0.20,
        color: '#8b5cf6',
        impact: cashFlowScore >= 75 ? 'positive' : cashFlowScore >= 50 ? 'neutral' : 'negative'
    });
    
    // Income Stability (15% weight)
    const incomeScore = Math.min(
        (data.income / 1000) + 
        (data.workExperience * 3) + 
        (data.jobTenure * 2), 
        100
    );
    factors.push({
        name: 'Income Stability',
        score: incomeScore,
        weight: 0.15,
        color: '#f59e0b',
        impact: incomeScore >= 70 ? 'positive' : incomeScore >= 50 ? 'neutral' : 'negative'
    });
    
    // Education & Professional Development (10% weight)
    const educationScore = getEducationScore(data.education) + (data.certifications * 5);
    factors.push({
        name: 'Education & Skills',
        score: Math.min(educationScore, 100),
        weight: 0.10,
        color: '#ef4444',
        impact: educationScore >= 60 ? 'positive' : educationScore >= 40 ? 'neutral' : 'negative'
    });
    
    // Digital & Social Presence (10% weight)
    const digitalScore = Math.min(
        (data.linkedinConnections / 10) + 
        (data.references * 10) + 
        (data.shoppingHistory * 5) + 
        getDigitalPaymentScore(data.digitalPayments), 
        100
    );
    factors.push({
        name: 'Digital Presence',
        score: digitalScore,
        weight: 0.10,
        color: '#06b6d4',
        impact: digitalScore >= 50 ? 'positive' : digitalScore >= 30 ? 'neutral' : 'negative'
    });
    
    // Transportation Stability (5% weight)
    const transportScore = getTransportationScore(data);
    factors.push({
        name: 'Transportation',
        score: transportScore,
        weight: 0.05,
        color: '#84cc16',
        impact: transportScore >= 60 ? 'positive' : transportScore >= 40 ? 'neutral' : 'negative'
    });
    
    // Calculate weighted score
    const weightedScore = factors.reduce((total, factor) => {
        return total + (factor.score * factor.weight);
    }, 0);
    
    // Convert to credit score range (300-850)
    const creditScore = Math.round(Math.max(300, Math.min(850, (weightedScore * 5.5) + 300)));
    
    // Determine approval status
    const approved = creditScore >= 580;
    const riskLevel = creditScore >= 700 ? 'Low' : creditScore >= 600 ? 'Medium' : 'High';
    
    // Generate recommendations
    const recommendations = generateRecommendations(factors, data);
    
    return {
        score: creditScore,
        approved: approved,
        riskLevel: riskLevel,
        factors: factors,
        recommendations: recommendations,
        rawData: data
    };
}

// Helper functions for scoring
function getEducationScore(education) {
    const scores = {
        'high-school': 20,
        'some-college': 35,
        'associate': 50,
        'bachelor': 70,
        'master': 85,
        'doctorate': 95
    };
    return scores[education] || 20;
}

function getDigitalPaymentScore(usage) {
    const scores = {
        'never': 0,
        'rarely': 20,
        'sometimes': 40,
        'frequently': 70,
        'always': 90
    };
    return scores[usage] || 0;
}

function getTransportationScore(data) {
    let score = 0;
    
    // Vehicle ownership
    const vehicleScores = {
        'own-outright': 80,
        'financing': 70,
        'lease': 60,
        'none': 30
    };
    score += vehicleScores[data.vehicleOwnership] || 30;
    
    // Insurance payments
    if (data.insurancePayments >= 90) score += 20;
    else if (data.insurancePayments >= 70) score += 10;
    
    return Math.min(score, 100);
}

// Generate personalized recommendations
function generateRecommendations(factors, data) {
    const recommendations = [];
    
    factors.forEach(factor => {
        if (factor.impact === 'negative') {
            switch (factor.name) {
                case 'Rent Payment History':
                    recommendations.push({
                        title: 'Improve Rent Payment Consistency',
                        description: 'Set up automatic rent payments to ensure 100% on-time payment rate. This is the most impactful factor for your credit score.',
                        impact: 'High',
                        timeframe: '1-3 months'
                    });
                    break;
                case 'Utility Payments':
                    recommendations.push({
                        title: 'Automate Utility Bills',
                        description: 'Set up automatic payments for all utility bills to improve payment reliability and boost your score.',
                        impact: 'Medium',
                        timeframe: '1-2 months'
                    });
                    break;
                case 'Cash Flow Stability':
                    recommendations.push({
                        title: 'Build Emergency Savings',
                        description: 'Increase your savings rate and maintain higher account balances to demonstrate financial stability.',
                        impact: 'High',
                        timeframe: '3-6 months'
                    });
                    break;
                case 'Income Stability':
                    recommendations.push({
                        title: 'Enhance Income Documentation',
                        description: 'Maintain consistent employment and consider additional income streams to improve stability metrics.',
                        impact: 'Medium',
                        timeframe: '6-12 months'
                    });
                    break;
            }
        }
    });
    
    // Add general recommendations
    if (data.certifications < 2) {
        recommendations.push({
            title: 'Gain Professional Certifications',
            description: 'Obtain industry-relevant certifications to boost your professional profile and creditworthiness.',
            impact: 'Low',
            timeframe: '3-6 months'
        });
    }
    
    if (data.linkedinConnections < 100) {
        recommendations.push({
            title: 'Expand Professional Network',
            description: 'Build your LinkedIn network and professional references to strengthen your digital presence.',
            impact: 'Low',
            timeframe: '2-4 months'
        });
    }
    
    return recommendations.slice(0, 6); // Limit to top 6 recommendations
}

// Display results
function displayResults(scoreData) {
    // Update score display
    document.getElementById('scoreValue').textContent = scoreData.score;
    document.getElementById('scoreBadge').textContent = scoreData.riskLevel + ' Risk';
    
    const statusElement = document.getElementById('scoreStatus');
    if (scoreData.approved) {
        statusElement.innerHTML = '<i class="fas fa-check-circle"></i> Loan Approved';
        statusElement.className = 'score-status approved';
    } else {
        statusElement.innerHTML = '<i class="fas fa-times-circle"></i> Needs Review';
        statusElement.className = 'score-status rejected';
    }
    
    // Create interactive pie chart
    createScoreChart(scoreData.factors);
    
    // Display recommendations
    displayRecommendations(scoreData.recommendations);
    
    // Display loan eligibility
    displayLoanEligibility(scoreData);
}

// Create interactive pie chart
function createScoreChart(factors) {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (scoreChart) {
        scoreChart.destroy();
    }
    
    const data = {
        labels: factors.map(f => f.name),
        datasets: [{
            data: factors.map(f => f.score * f.weight),
            backgroundColor: factors.map(f => f.color),
            borderWidth: 3,
            borderColor: '#ffffff',
            hoverBorderWidth: 5,
            hoverBorderColor: '#ffffff'
        }]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const factor = factors[context.dataIndex];
                        return [
                            `${factor.name}: ${factor.score.toFixed(1)}%`,
                            `Weight: ${(factor.weight * 100).toFixed(0)}%`,
                            `Impact: ${factor.impact}`
                        ];
                    }
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#4f46e5',
                borderWidth: 2
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        onHover: (event, activeElements) => {
            event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
        },
        onClick: (event, activeElements) => {
            if (activeElements.length > 0) {
                const index = activeElements[0].index;
                const factor = factors[index];
                showFactorDetails(factor);
            }
        }
    };
    
    scoreChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });
    
    // Create custom legend
    createChartLegend(factors);
}

// Create custom chart legend
function createChartLegend(factors) {
    const legendContainer = document.getElementById('chartLegend');
    legendContainer.innerHTML = '';
    
    factors.forEach((factor, index) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.style.cursor = 'pointer';
        
        legendItem.innerHTML = `
            <div class="legend-color" style="background-color: ${factor.color}"></div>
            <span>${factor.name} (${factor.score.toFixed(0)}%)</span>
        `;
        
        legendItem.addEventListener('click', () => showFactorDetails(factor));
        legendContainer.appendChild(legendItem);
    });
}

// Show factor details (could be expanded to show modal)
function showFactorDetails(factor) {
    alert(`${factor.name}\n\nScore: ${factor.score.toFixed(1)}%\nWeight: ${(factor.weight * 100).toFixed(0)}%\nImpact: ${factor.impact}\n\nClick on different chart segments to see details for each factor.`);
}

// Display recommendations
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations');
    container.innerHTML = '';
    
    recommendations.forEach(rec => {
        const recElement = document.createElement('div');
        recElement.className = 'recommendation-item';
        
        const impactColor = rec.impact === 'High' ? '#ef4444' : rec.impact === 'Medium' ? '#f59e0b' : '#10b981';
        
        recElement.innerHTML = `
            <h4>${rec.title} <span style="color: ${impactColor}; font-size: 0.8em;">(${rec.impact} Impact)</span></h4>
            <p>${rec.description}</p>
            <div style="margin-top: 8px; font-size: 0.8em; color: #6b7280;">
                <i class="fas fa-clock"></i> ${rec.timeframe}
            </div>
        `;
        
        container.appendChild(recElement);
    });
}

// Display loan eligibility
function displayLoanEligibility(scoreData) {
    const container = document.getElementById('loanEligibility');
    
    if (scoreData.approved) {
        const maxLoanAmount = Math.min(scoreData.rawData.income * 0.3, 50000);
        const interestRate = scoreData.score >= 700 ? 8.5 : scoreData.score >= 650 ? 12.0 : 15.5;
        
        container.innerHTML = `
            <div class="eligibility-status approved">
                <i class="fas fa-check-circle"></i>
                Loan Approved
            </div>
            <div class="loan-details">
                <div class="loan-detail">
                    <span>Maximum Loan Amount:</span>
                    <span>$${maxLoanAmount.toLocaleString()}</span>
                </div>
                <div class="loan-detail">
                    <span>Estimated Interest Rate:</span>
                    <span>${interestRate}% APR</span>
                </div>
                <div class="loan-detail">
                    <span>Loan Term:</span>
                    <span>Up to 60 months</span>
                </div>
                <div class="loan-detail">
                    <span>Monthly Payment (Est.):</span>
                    <span>$${((maxLoanAmount * (interestRate/100/12)) / (1 - Math.pow(1 + (interestRate/100/12), -60))).toFixed(0)}</span>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="eligibility-status rejected">
                <i class="fas fa-times-circle"></i>
                Loan Needs Review
            </div>
            <div class="loan-details">
                <p style="text-align: center; color: #6b7280; margin-bottom: 15px;">
                    Your application requires additional review. Consider improving the factors highlighted in your recommendations.
                </p>
                <div class="loan-detail">
                    <span>Minimum Score Needed:</span>
                    <span>580</span>
                </div>
                <div class="loan-detail">
                    <span>Your Current Score:</span>
                    <span>${scoreData.score}</span>
                </div>
                <div class="loan-detail">
                    <span>Points to Improve:</span>
                    <span>${Math.max(0, 580 - scoreData.score)}</span>
                </div>
            </div>
        `;
    }
}

// ROI Calculator
function calculateROI() {
    const avgLoanAmount = parseFloat(document.getElementById('avgLoanAmount').value) || 15000;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 12;
    const numLoans = parseInt(document.getElementById('numLoans').value) || 10000;
    
    const annualRevenue = (avgLoanAmount * numLoans * (interestRate / 100));
    
    document.getElementById('annualRevenue').textContent = `$${annualRevenue.toLocaleString()}`;
}

// Smooth scrolling and navigation updates
window.addEventListener('scroll', function() {
    const sections = ['home', 'assessment', 'results', 'impact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animations
function addLoadingAnimation(element) {
    element.classList.add('loading');
    setTimeout(() => {
        element.classList.remove('loading');
        element.classList.add('fade-in-up');
    }, 100);
}