export interface FilterParams {
  preset?: string;
  from?: string;
  to?: string;
}

interface PercentageChange {
  income: number;
  expenses: number;
  balance: number;
  prevPeriodFrom: string | null;
  prevPeriodTo: string | null;
}

interface PresetType {
  from: string;
  to: string;
  value: string;
  label: string;
}

export interface SummaryAnalyticsResponse {
  message: string;
  data: {
    availableBalance: number;
    totalIncome: number;
    totalExpenses: number;
    transactionCount: number;
    savingRate: {
      percentage: number;
      expenseRatio: number;
    };
    percentageChange: PercentageChange;
    preset: PresetType;
  };
}

export interface ChartAnalyticsResponse {
  message: string;
  data: {
    chartData: {
      date: string;
      income: number;
      expenses: number;
    }[];
    totalIncomeCount: number;
    totalExpenseCount: number;
    preset: PresetType;
  };
}

export interface ExpensePieChartBreakdownResponse {
  message: string;
  data: {
    totalSpent: number;
    breakdown: {
      name: string;
      value: number;
      percentage: number;
    }[];
    preset: PresetType;
  };
}

// ... existing code ...

export interface SpendingPattern {
  _id: string;
  userId: string;
  patternType: 'daily' | 'weekly' | 'monthly';
  category: string;
  averageAmount: number;
  frequency: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface SpendingPatternResponse {
  success: boolean;
  data: SpendingPattern[];
}

export interface SpendingPatternAnalysis {
  daily: SpendingPattern[];
  weekly: SpendingPattern[];
  monthly: SpendingPattern[];
}

export interface TransactionStats {
  totalTransactions: number;
  expenseTransactions: number;
  incomeTransactions: number;
  dateRange: {
    from: string;
    to: string;
  };
  transactions: {
    id: string;
    type: string;
    amount: number;
    date: string;
    category: string;
  }[];
}

export interface TransactionStatsResponse {
  success: boolean;
  data: TransactionStats;
}