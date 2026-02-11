export interface CustomFinancialInput {
  // Basic Financial Information
  monthlyIncome: number;
  monthlyBudget: number;
  totalDebt: number;
  emergencyFund: number;
  netWorth: number;
  
  // Life Circumstances
  age: number;
  familySize: number;
  careerStage: 'student' | 'early-career' | 'mid-career' | 'late-career' | 'retired';
  location: string;
  costOfLiving: 'low' | 'medium' | 'high';
  
  // Financial Goals
  primaryGoal: 'debt-reduction' | 'savings' | 'investment' | 'retirement' | 'emergency-fund' | 'other';
  timeHorizon: 'short-term' | 'medium-term' | 'long-term';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  
  // Custom Metrics
  investmentPortfolio: number;
  insuranceCoverage: 'basic' | 'adequate' | 'comprehensive';
  housingType: 'renting' | 'owning' | 'mortgage';
  dependents: number;
  
  // Additional Context
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  educationLevel: 'high-school' | 'bachelor' | 'master' | 'phd' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  hasChildren: boolean;
}

