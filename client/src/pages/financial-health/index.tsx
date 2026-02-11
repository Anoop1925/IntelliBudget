import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  BarChart3,
  Target,
  Lightbulb,
  Calendar,
  TrendingUpIcon
} from 'lucide-react';
import { 
      useGenerateAssessmentMutation, 
      useGenerateCustomAssessmentMutation,
      useGetLatestAssessmentQuery 
    } from '@/features/financial-health/financialHealthAPI';
    import PageLayout from '@/components/page-layout';
    import { FinancialHealthAssessment, CustomFinancialInput } from '@/features/financial-health/types';
    import CustomInputModal from '@/components/financial-health/custom-input-modal';

const FinancialHealthDashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
        const { data: assessmentResponse, isLoading, refetch } = useGetLatestAssessmentQuery();
      const [generateAssessment] = useGenerateAssessmentMutation();
      const [generateCustomAssessment] = useGenerateCustomAssessmentMutation();

  const assessment = assessmentResponse?.data;

        const handleGenerateAssessment = async () => {
        try {
          setIsGenerating(true);
          await generateAssessment({}).unwrap();
          refetch();
        } catch (error) {
          console.error('Failed to generate assessment:', error);
        } finally {
          setIsGenerating(false);
        }
      };

      const handleCustomAssessment = async (customInput: CustomFinancialInput) => {
        try {
          setIsGenerating(true);
          await generateCustomAssessment({ customInput }).unwrap();
          refetch();
        } catch (error) {
          console.error('Failed to generate custom assessment:', error);
        } finally {
          setIsGenerating(false);
        }
      };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    if (score >= 40) return <Badge className="bg-orange-100 text-orange-800">Fair</Badge>;
    return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Excellent financial health";
    if (score >= 60) return "Good financial health";
    if (score >= 40) return "Fair financial health";
    return "Poor financial health - needs attention";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <PageLayout title="Financial Health Assessment" subtitle="Analyzing your financial wellness">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">Loading assessment...</span>
        </div>
      </PageLayout>
    );
  }

  return (
            <PageLayout 
          title="Financial Health Assessment" 
          subtitle="Comprehensive analysis of your financial wellness powered by AI. Use Custom Assessment for personalized insights based on your specific circumstances."
                rightAction={
            <div className="flex gap-3">
              <CustomInputModal onSubmit={handleCustomAssessment} isLoading={isGenerating} />
              <Button onClick={handleGenerateAssessment} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Assessment
                  </>
                )}
              </Button>
            </div>
          }
    >
      {assessment ? (
        <div className="space-y-6">
          {/* Overall Score Card */}
          <Card className="border shadow-md">
            <CardHeader className="bg-muted/40 border-b">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Overall Financial Health Score
                </span>
                {getScoreBadge(assessment.overallScore)}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(assessment.overallScore)}`}>
                  {assessment.overallScore}
                </div>
                <div className="text-gray-600 mt-2">out of 100</div>
                <div className="text-sm text-gray-500 mt-1">
                  {getScoreDescription(assessment.overallScore)}
                </div>
                <Progress value={assessment.overallScore} className="mt-4" />
                <div className="text-xs text-gray-500 mt-2">
                  Assessment Date: {formatDate(assessment.assessmentDate)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Scores Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(assessment.categoryScores).map(([category, score]) => (
              <Card key={category} className="border shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg capitalize flex items-center gap-2">
                    {category === 'incomeExpenseRatio' && <TrendingUpIcon className="h-4 w-4 text-blue-600" />}
                    {category === 'savingsRate' && <Target className="h-4 w-4 text-green-600" />}
                    {category === 'emergencyFundAdequacy' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                    {category === 'debtToIncomeRatio' && <BarChart3 className="h-4 w-4 text-purple-600" />}
                    {category === 'spendingEfficiency' && <Lightbulb className="h-4 w-4 text-indigo-600" />}
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                      {score}
                    </div>
                    <Progress value={score} className="mt-2" />
                    <div className="text-xs text-gray-500 mt-2">
                      {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Insights */}
          <Card className="border shadow-md">
            <CardHeader className="bg-muted/40 border-b">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-green-600" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Summary</h4>
                <p className="text-gray-600 leading-relaxed">{assessment.aiInsights.summary}</p>
              </div>

              {/* Key Strengths */}
              <div>
                <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Key Strengths
                </h4>
                <ul className="space-y-1">
                  {assessment.aiInsights.keyStrengths.map((strength, index) => (
                    <li key={index} className="text-gray-600 flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas of Concern */}
              <div>
                <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Areas of Concern
                </h4>
                <ul className="space-y-1">
                  {assessment.aiInsights.areasOfConcern.map((concern, index) => (
                    <li key={index} className="text-gray-600 flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 text-orange-600 mt-1 flex-shrink-0" />
                      {concern}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Priority Actions */}
              <div>
                <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Priority Actions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {assessment.aiInsights.priorityActions.map((action, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium text-blue-800">#{index + 1}</span>
                      <p className="text-blue-700 mt-1 text-sm">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long Term Recommendations */}
              <div>
                <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Long-term Recommendations
                </h4>
                <ul className="space-y-1">
                  {assessment.aiInsights.longTermRecommendations.map((recommendation, index) => (
                    <li key={index} className="text-gray-600 flex items-start gap-2">
                      <Calendar className="h-3 w-3 text-purple-600 mt-1 flex-shrink-0" />
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <Card className="border shadow-md">
            <CardHeader className="bg-muted/40 border-b">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Detailed Category Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(assessment.detailedAnalysis).map(([category, analysis]) => (
                <div key={category} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h4 className="font-semibold text-gray-800 mb-2 capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-gray-600 mb-3 text-sm">{analysis.analysis}</p>
                  <div className="space-y-1">
                    {analysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No Financial Health Assessment Available</h3>
              <p className="text-sm">Generate your first assessment to get started with AI-powered financial insights.</p>
            </div>
                            <div className="flex gap-3 justify-center">
                  <CustomInputModal onSubmit={handleCustomAssessment} isLoading={isGenerating} />
                  <Button 
                    onClick={handleGenerateAssessment} 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating Assessment...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Generate Your First Assessment
                      </>
                    )}
                  </Button>
                </div>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
};

export default FinancialHealthDashboard;
