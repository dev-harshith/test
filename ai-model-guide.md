# AI Model Training Guide for Alternative Credit Scoring

## Overview
This guide provides comprehensive instructions for training an AI model for alternative credit scoring using non-traditional financial data.

## Data Sources and Collection

### 1. Primary Data Sources
- **Rent Payment History**: Monthly rent amounts, payment dates, late payments
- **Utility Bills**: Electric, gas, water, internet, phone payment histories
- **Banking Data**: Account balances, transaction patterns, overdrafts
- **Employment Data**: Job tenure, income stability, employment gaps
- **Education Records**: Degrees, certifications, professional development
- **Digital Footprint**: Social media presence, online shopping behavior
- **Transportation**: Vehicle ownership, insurance payments, public transit usage

### 2. Data Collection Methods
```python
# Example data structure
alternative_credit_data = {
    'user_id': 'unique_identifier',
    'rent_payments': {
        'monthly_amount': 1200,
        'payment_history': [1, 1, 1, 0, 1],  # 1=on-time, 0=late
        'months_at_address': 24,
        'landlord_verified': True
    },
    'utilities': {
        'avg_monthly_bill': 150,
        'payment_reliability': 0.95,
        'providers': ['electric', 'gas', 'internet']
    },
    'banking': {
        'avg_balance': 2500,
        'account_age_months': 36,
        'overdrafts_12m': 2,
        'savings_rate': 0.15
    },
    'employment': {
        'current_job_tenure_months': 18,
        'annual_income': 45000,
        'employment_type': 'full_time',
        'income_stability': 0.9
    }
}
```

## Model Architecture Options

### 1. Gradient Boosting Models (Recommended)
```python
import xgboost as xgb
from lightgbm import LGBMRegressor
from sklearn.ensemble import GradientBoostingRegressor

# XGBoost Implementation
def train_xgboost_model(X_train, y_train, X_val, y_val):
    model = xgb.XGBRegressor(
        n_estimators=1000,
        max_depth=6,
        learning_rate=0.1,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42
    )
    
    model.fit(
        X_train, y_train,
        eval_set=[(X_val, y_val)],
        early_stopping_rounds=50,
        verbose=False
    )
    
    return model

# Feature importance analysis
def analyze_feature_importance(model, feature_names):
    importance = model.feature_importances_
    feature_importance = list(zip(feature_names, importance))
    feature_importance.sort(key=lambda x: x[1], reverse=True)
    return feature_importance
```

### 2. Neural Network Approach
```python
import tensorflow as tf
from tensorflow.keras import layers, models

def create_neural_network(input_dim):
    model = models.Sequential([
        layers.Dense(128, activation='relu', input_shape=(input_dim,)),
        layers.Dropout(0.3),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(32, activation='relu'),
        layers.Dense(1, activation='sigmoid')  # Output: probability of default
    ])
    
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy', 'precision', 'recall']
    )
    
    return model
```

### 3. Ensemble Method
```python
from sklearn.ensemble import VotingRegressor
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

def create_ensemble_model():
    # Individual models
    xgb_model = xgb.XGBClassifier(n_estimators=100)
    rf_model = RandomForestClassifier(n_estimators=100)
    lr_model = LogisticRegression()
    
    # Ensemble
    ensemble = VotingRegressor([
        ('xgb', xgb_model),
        ('rf', rf_model),
        ('lr', lr_model)
    ], voting='soft')
    
    return ensemble
```

## Feature Engineering

### 1. Payment Behavior Features
```python
def create_payment_features(data):
    features = {}
    
    # Rent payment consistency
    rent_payments = data['rent_payments']['payment_history']
    features['rent_consistency'] = sum(rent_payments) / len(rent_payments)
    features['recent_rent_performance'] = sum(rent_payments[-6:]) / 6
    
    # Utility payment reliability
    features['utility_reliability'] = data['utilities']['payment_reliability']
    
    # Payment trend analysis
    features['payment_trend'] = calculate_payment_trend(rent_payments)
    
    return features

def calculate_payment_trend(payments):
    # Calculate if payment behavior is improving, stable, or declining
    recent = sum(payments[-6:]) / 6
    older = sum(payments[:-6]) / len(payments[:-6]) if len(payments) > 6 else recent
    return recent - older
```

### 2. Financial Stability Features
```python
def create_stability_features(data):
    features = {}
    
    # Income-to-rent ratio
    monthly_income = data['employment']['annual_income'] / 12
    features['income_rent_ratio'] = monthly_income / data['rent_payments']['monthly_amount']
    
    # Savings capacity
    features['savings_rate'] = data['banking']['savings_rate']
    features['emergency_fund_months'] = data['banking']['avg_balance'] / data['rent_payments']['monthly_amount']
    
    # Employment stability
    features['job_tenure_years'] = data['employment']['current_job_tenure_months'] / 12
    features['income_stability'] = data['employment']['income_stability']
    
    return features
```

### 3. Risk Indicators
```python
def create_risk_features(data):
    features = {}
    
    # Overdraft frequency
    features['overdraft_risk'] = data['banking']['overdrafts_12m'] / 12
    
    # Housing stability
    features['housing_stability'] = data['rent_payments']['months_at_address'] / 12
    
    # Debt-to-income estimation
    estimated_monthly_expenses = (
        data['rent_payments']['monthly_amount'] + 
        data['utilities']['avg_monthly_bill']
    )
    monthly_income = data['employment']['annual_income'] / 12
    features['expense_income_ratio'] = estimated_monthly_expenses / monthly_income
    
    return features
```

## Model Training Pipeline

### 1. Data Preprocessing
```python
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split

def preprocess_data(raw_data):
    # Convert to DataFrame
    df = pd.DataFrame(raw_data)
    
    # Handle missing values
    df = df.fillna(df.median())
    
    # Encode categorical variables
    le = LabelEncoder()
    categorical_columns = ['employment_type', 'housing_type', 'education_level']
    for col in categorical_columns:
        if col in df.columns:
            df[col] = le.fit_transform(df[col])
    
    # Feature scaling
    scaler = StandardScaler()
    numerical_columns = df.select_dtypes(include=['float64', 'int64']).columns
    df[numerical_columns] = scaler.fit_transform(df[numerical_columns])
    
    return df, scaler, le
```

### 2. Model Training and Validation
```python
def train_and_validate_model(X, y, test_size=0.2):
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=42, stratify=y
    )
    
    # Train model
    model = train_xgboost_model(X_train, y_train, X_test, y_test)
    
    # Evaluate model
    from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
    
    y_pred = model.predict(X_test)
    y_pred_binary = (y_pred > 0.5).astype(int)
    
    metrics = {
        'accuracy': accuracy_score(y_test, y_pred_binary),
        'precision': precision_score(y_test, y_pred_binary),
        'recall': recall_score(y_test, y_pred_binary),
        'f1': f1_score(y_test, y_pred_binary)
    }
    
    return model, metrics
```

## Fairness and Bias Mitigation

### 1. Bias Detection
```python
def detect_bias(model, X_test, y_test, protected_attributes):
    """
    Detect bias across protected attributes (race, gender, age, etc.)
    """
    from sklearn.metrics import confusion_matrix
    
    bias_metrics = {}
    
    for attr in protected_attributes:
        if attr in X_test.columns:
            unique_values = X_test[attr].unique()
            
            for value in unique_values:
                mask = X_test[attr] == value
                subset_X = X_test[mask]
                subset_y = y_test[mask]
                
                if len(subset_y) > 0:
                    predictions = model.predict(subset_X)
                    accuracy = accuracy_score(subset_y, (predictions > 0.5).astype(int))
                    
                    bias_metrics[f'{attr}_{value}'] = {
                        'accuracy': accuracy,
                        'sample_size': len(subset_y)
                    }
    
    return bias_metrics
```

### 2. Fairness Constraints
```python
def train_fair_model(X_train, y_train, sensitive_features):
    """
    Train model with fairness constraints
    """
    from fairlearn.reductions import ExponentiatedGradient
    from fairlearn.reductions import DemographicParity
    
    # Base model
    base_model = xgb.XGBClassifier()
    
    # Fairness constraint
    constraint = DemographicParity()
    
    # Fair model
    fair_model = ExponentiatedGradient(
        base_model, 
        constraint
    )
    
    fair_model.fit(X_train, y_train, sensitive_features=sensitive_features)
    
    return fair_model
```

## Model Deployment and Monitoring

### 1. Model Serving
```python
import joblib
import numpy as np

class CreditScoringModel:
    def __init__(self, model_path, scaler_path):
        self.model = joblib.load(model_path)
        self.scaler = joblib.load(scaler_path)
    
    def predict_credit_score(self, features):
        # Preprocess features
        features_scaled = self.scaler.transform([features])
        
        # Get prediction
        probability = self.model.predict_proba(features_scaled)[0][1]
        
        # Convert to credit score (300-850 range)
        credit_score = int(300 + (probability * 550))
        
        return {
            'credit_score': credit_score,
            'approval_probability': probability,
            'risk_level': self.get_risk_level(credit_score)
        }
    
    def get_risk_level(self, score):
        if score >= 700:
            return 'Low'
        elif score >= 600:
            return 'Medium'
        else:
            return 'High'
```

### 2. Model Monitoring
```python
def monitor_model_performance(model, new_data, threshold=0.05):
    """
    Monitor model performance and detect drift
    """
    from scipy import stats
    
    # Get predictions on new data
    predictions = model.predict_proba(new_data)[:, 1]
    
    # Compare with historical distribution
    historical_mean = 0.6  # Example historical mean
    current_mean = np.mean(predictions)
    
    # Statistical test for drift
    _, p_value = stats.ttest_1samp(predictions, historical_mean)
    
    drift_detected = p_value < threshold
    
    return {
        'drift_detected': drift_detected,
        'p_value': p_value,
        'current_mean': current_mean,
        'historical_mean': historical_mean
    }
```

## Regulatory Compliance

### 1. Explainable AI
```python
import shap

def explain_prediction(model, X_sample, feature_names):
    """
    Generate SHAP explanations for model predictions
    """
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_sample)
    
    # Create explanation
    explanation = {
        'prediction': model.predict_proba(X_sample)[0][1],
        'feature_contributions': dict(zip(feature_names, shap_values[0])),
        'base_value': explainer.expected_value
    }
    
    return explanation
```

### 2. Audit Trail
```python
import logging
from datetime import datetime

def log_prediction(user_id, features, prediction, explanation):
    """
    Log prediction for audit purposes
    """
    audit_log = {
        'timestamp': datetime.now().isoformat(),
        'user_id': user_id,
        'features': features,
        'prediction': prediction,
        'explanation': explanation,
        'model_version': '1.0'
    }
    
    logging.info(f"Credit scoring prediction: {audit_log}")
    
    return audit_log
```

## Performance Optimization

### 1. Hyperparameter Tuning
```python
from sklearn.model_selection import GridSearchCV

def optimize_hyperparameters(X_train, y_train):
    param_grid = {
        'n_estimators': [100, 200, 300],
        'max_depth': [3, 4, 5, 6],
        'learning_rate': [0.01, 0.1, 0.2],
        'subsample': [0.8, 0.9, 1.0]
    }
    
    xgb_model = xgb.XGBClassifier()
    
    grid_search = GridSearchCV(
        xgb_model, 
        param_grid, 
        cv=5, 
        scoring='f1',
        n_jobs=-1
    )
    
    grid_search.fit(X_train, y_train)
    
    return grid_search.best_estimator_, grid_search.best_params_
```

### 2. Feature Selection
```python
from sklearn.feature_selection import SelectKBest, f_classif

def select_best_features(X_train, y_train, k=20):
    selector = SelectKBest(score_func=f_classif, k=k)
    X_selected = selector.fit_transform(X_train, y_train)
    
    selected_features = selector.get_support(indices=True)
    
    return X_selected, selected_features
```

## Implementation Checklist

### Data Requirements
- [ ] Rent payment history (minimum 12 months)
- [ ] Utility payment records
- [ ] Banking transaction data
- [ ] Employment verification
- [ ] Education credentials
- [ ] Digital footprint data

### Model Development
- [ ] Feature engineering pipeline
- [ ] Model training and validation
- [ ] Bias detection and mitigation
- [ ] Performance optimization
- [ ] Explainability implementation

### Deployment
- [ ] Model serving infrastructure
- [ ] API development
- [ ] Monitoring and alerting
- [ ] Audit logging
- [ ] Regulatory compliance

### Testing
- [ ] Unit tests for all components
- [ ] Integration testing
- [ ] Performance testing
- [ ] Bias testing
- [ ] Security testing

This comprehensive guide provides the foundation for building a robust, fair, and compliant alternative credit scoring system using AI/ML techniques.