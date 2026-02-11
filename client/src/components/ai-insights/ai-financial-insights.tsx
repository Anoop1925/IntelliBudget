// import React from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useAiExpenseCategorizationQuery, useAiBudgetRecommendationsQuery, useAiExpenseForecastingQuery } from '@/features/analytics/analyticsAPI';

// const AIFinancialInsights: React.FC = () => {
//   const { data: categorization } = useAiExpenseCategorizationQuery();
//   const { data: budgetRecs } = useAiBudgetRecommendationsQuery();
//   const { data: forecasting } = useAiExpenseForecastingQuery();

//   return (
//     <Card className="w-full border-2 border-purple-200 shadow-lg">
//       <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200">
//         <CardTitle className="text-xl font-bold text-purple-800">
//           🤖 AI Financial Assistant
//         </CardTitle>
//         <CardDescription className="text-purple-600 font-medium">
//           AI-powered insights and recommendations
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4 p-6">
//         {/* AI Insights content */}
//       </CardContent>
//     </Card>
//   );
// };

// export default AIFinancialInsights;