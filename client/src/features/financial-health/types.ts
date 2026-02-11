export interface FinancialHealthAssessment {
  _id: string;
  userId: string;
  assessmentDate: string;
  overallScore: number;
  categoryScores: {
    incomeExpenseRatio: number;
    savingsRate: number;
    emergencyFundAdequacy: number;
    debtToIncomeRatio: number;
    spendingEfficiency: number;
  };
  detailedAnalysis: {
    incomeExpenseRatio: {
      score: number;
      analysis: string;
      recommendations: string[];
    };
    savingsRate: {
      score: number;
      analysis: string;
      recommendations: string[];
    };
    emergencyFundAdequacy: {
      score: number;
      analysis: string;
      recommendations: string[];
    };
    debtToIncomeRatio: {
      score: number;
      analysis: string;
      recommendations: string[];
    };
    spendingEfficiency: {
      score: number;
      analysis: string;
      recommendations: string[];
    };
  };
  aiInsights: {
    summary: string;
    keyStrengths: string[];
    areasOfConcern: string[];
    priorityActions: string[];
    longTermRecommendations: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface FinancialHealthResponse {
  success: boolean;
  message: string;
  data: FinancialHealthAssessment;
}

export interface FinancialHealthHistoryResponse {
  success: boolean;
  message: string;
  data: FinancialHealthAssessment[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    skip: number;
  };
}

export interface GenerateAssessmentRequest {
  // No body parameters needed for now
}

export interface AssessmentHistoryParams {
  page?: number;
  limit?: number;
}

// New types for custom input
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

export interface GenerateCustomAssessmentRequest {
  customInput: CustomFinancialInput;
}
