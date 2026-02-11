import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, RefreshCw, Info } from 'lucide-react';
import { useGetUserSpendingPatternsQuery, useAnalyzeSpendingPatternsMutation, useGetTransactionStatsQuery } from '@/features/analytics/analyticsAPI';
import { SpendingPattern, TransactionStats } from '@/features/analytics/anayticsType';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const SpendingPatternCard: React.FC = () => {
  const { data: patternsData, isLoading, refetch, error } = useGetUserSpendingPatternsQuery();
  const [analyzePatterns, { isLoading: isAnalyzing }] = useAnalyzeSpendingPatternsMutation();
  const { data: statsData } = useGetTransactionStatsQuery();
  
  // Get auth state to check if user is logged in
  const auth = useSelector((state: RootState) => state.auth);
  
  console.log("🔍 SpendingPatternCard - Auth state:", auth);
  console.log("🔍 SpendingPatternCard - Query error:", error);
  console.log("🔍 SpendingPatternCard - Transaction stats:", statsData);

  const patterns = patternsData?.data || [];
  const stats = statsData?.data;

  const handleAnalyze = async () => {
    try {
      console.log("🔍 SpendingPatternCard - Starting analysis...");
      console.log("🔍 SpendingPatternCard - Auth token:", auth?.accessToken ? "Present" : "Missing");
      
      await analyzePatterns().unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to analyze patterns:', error);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-red-600';
      case 'decreasing':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            Loading Patterns...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full border-2 border-gray-200 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
        <div>
          <CardTitle className="text-xl font-bold text-gray-800">Spending Patterns</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            AI-powered analysis of your spending behavior
          </CardDescription>
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md"
        >
          {isAnalyzing ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Analyze
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 p-6 bg-white">
        {patterns.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-gray-700 mb-2">No spending patterns analyzed yet.</p>
            <p className="text-gray-600 mb-4">Click analyze to discover your spending patterns.</p>
            
            {/* Transaction Stats for Debugging */}
            {stats && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border-2 border-blue-300 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-5 w-5 text-blue-700" />
                  <span className="text-base font-bold text-blue-800">Transaction Data Available</span>
                </div>
                <div className="text-sm text-blue-800 space-y-2 font-medium">
                  <p className="bg-white p-2 rounded border border-blue-200">
                    📊 Total Transactions (6 months): <span className="font-bold text-blue-900">{stats.totalTransactions}</span>
                  </p>
                  <p className="bg-white p-2 rounded border border-blue-200">
                    💸 Expense Transactions: <span className="font-bold text-blue-900">{stats.expenseTransactions}</span>
                  </p>
                  <p className="bg-white p-2 rounded border border-blue-200">
                    💰 Income Transactions: <span className="font-bold text-blue-900">{stats.incomeTransactions}</span>
                  </p>
                  <p className="bg-white p-2 rounded border border-blue-200">
                    📅 Date Range: <span className="font-bold text-blue-900">
                      {new Date(stats.dateRange.from).toLocaleDateString()} - {new Date(stats.dateRange.to).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                {stats.expenseTransactions < 5 && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-yellow-400 shadow-md">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⚠️</span>
                      <span className="text-sm font-bold text-yellow-800">
                        Need at least 5 expense transactions for pattern analysis. 
                        Current: {stats.expenseTransactions}/5
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Transaction Stats Summary */}
            {stats && (
              <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300 shadow-md">
                <div className="text-base text-green-800 font-bold">
                  🎯 Data Summary: <span className="text-green-900">{stats.expenseTransactions} expense transactions</span> from {stats.totalTransactions} total
                </div>
              </div>
            )}

            {/* Daily Patterns */}
            {patterns.filter((p: SpendingPattern) => p.patternType === 'daily').length > 0 && (
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-3 border-b-2 border-gray-300 pb-2">📅 Daily Patterns</h4>
                <div className="space-y-3">
                  {patterns
                    .filter((p: SpendingPattern) => p.patternType === 'daily')
                    .slice(0, 3)
                    .map((pattern: SpendingPattern) => (
                      <div key={pattern._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-2 border-gray-300 shadow-md">
                        <div className="flex items-center gap-3">
                          <span className="text-base font-bold text-gray-800">{pattern.category}</span>
                          {getTrendIcon(pattern.trend)}
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getTrendColor(pattern.trend)}`}>
                            {formatCurrency(pattern.averageAmount)}
                          </div>
                          <Badge variant="secondary" className={`${getConfidenceColor(pattern.confidence)} text-xs font-bold px-3 py-1`}>
                            {Math.round(pattern.confidence * 100)}% confidence
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Weekly Patterns */}
            {patterns.filter((p: SpendingPattern) => p.patternType === 'weekly').length > 0 && (
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-3 border-b-2 border-gray-300 pb-2">📊 Weekly Patterns</h4>
                <div className="space-y-3">
                  {patterns
                    .filter((p: SpendingPattern) => p.patternType === 'weekly')
                    .slice(0, 2)
                    .map((pattern: SpendingPattern) => (
                      <div key={pattern._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border-2 border-blue-300 shadow-md">
                        <div className="flex items-center gap-3">
                          <span className="text-base font-bold text-blue-800">{pattern.category}</span>
                          {getTrendIcon(pattern.trend)}
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getTrendColor(pattern.trend)}`}>
                            {formatCurrency(pattern.averageAmount)}
                          </div>
                          <Badge variant="secondary" className={`${getConfidenceColor(pattern.confidence)} text-xs font-bold px-3 py-1`}>
                            {Math.round(pattern.confidence * 100)}% confidence
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Monthly Patterns */}
            {patterns.filter((p: SpendingPattern) => p.patternType === 'monthly').length > 0 && (
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-3 border-b-2 border-gray-300 pb-2">📈 Monthly Patterns</h4>
                <div className="space-y-3">
                  {patterns
                    .filter((p: SpendingPattern) => p.patternType === 'monthly')
                    .slice(0, 2)
                    .map((pattern: SpendingPattern) => (
                      <div key={pattern._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300 shadow-md">
                        <div className="flex items-center gap-3">
                          <span className="text-base font-bold text-purple-800">{pattern.category}</span>
                          {getTrendIcon(pattern.trend)}
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getTrendColor(pattern.trend)}`}>
                            {formatCurrency(pattern.averageAmount)}
                          </div>
                          <Badge variant="secondary" className={`${getConfidenceColor(pattern.confidence)} text-xs font-bold px-3 py-1`}>
                            {Math.round(pattern.confidence * 100)}% confidence
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingPatternCard;