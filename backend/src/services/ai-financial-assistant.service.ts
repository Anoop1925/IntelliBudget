// import axios from 'axios';
// import TransactionModel from "../models/transaction.model";
// import UserModel from "../models/user.model";

// export class AIFinancialAssistantService {
//   private aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8501';

//   async getExpenseCategorization(userId: string) {
//     try {
//       // Get user's recent transactions
//       const transactions = await TransactionModel.find({ 
//         userId, 
//         type: 'EXPENSE' 
//       }).limit(100);

//       // Format data for AI service
//       const transactionData = transactions.map(t => ({
//         description: t.description || t.category,
//         amount: t.amount,
//         date: t.date
//       }));

//       // Call AI service
//       const response = await axios.post(`${this.aiServiceUrl}/categorize`, {
//         transactions: transactionData
//       });

//       return response.data;
//     } catch (error) {
//       console.error('AI categorization error:', error);
//       throw error;
//     }
//   }

//   async getBudgetRecommendations(userId: string) {
//     try {
//       const user = await UserModel.findById(userId);
//       const transactions = await TransactionModel.find({ userId });

//       const totalIncome = transactions
//         .filter(t => t.type === 'INCOME')
//         .reduce((sum, t) => sum + t.amount, 0);

//       const totalExpenses = transactions
//         .filter(t => t.type === 'EXPENSE')
//         .reduce((sum, t) => sum + t.amount, 0);

//       // Call AI service for budget recommendations
//       const response = await axios.post(`${this.aiServiceUrl}/budget-recommendations`, {
//         income: totalIncome,
//         expenses: totalExpenses,
//         user_profile: {
//           age: user.age || 30,
//           location: user.location || 'default'
//         }
//       });

//       return response.data;
//     } catch (error) {
//       console.error('AI budget recommendations error:', error);
//       throw error;
//     }
//   }

//   async getExpenseForecasting(userId: string) {
//     try {
//       const transactions = await TransactionModel.find({ 
//         userId, 
//         type: 'EXPENSE' 
//       }).sort({ date: 1 });

//       // Group expenses by month for time-series analysis
//       const monthlyExpenses = this.groupByMonth(transactions);

//       // Call AI service for forecasting
//       const response = await axios.post(`${this.aiServiceUrl}/forecast`, {
//         monthly_expenses: monthlyExpenses,
//         forecast_months: 6
//       });

//       return response.data;
//     } catch (error) {
//       console.error('AI forecasting error:', error);
//       throw error;
//     }
//   }

//   private groupByMonth(transactions: any[]) {
//     const monthly = {};
//     transactions.forEach(t => {
//       const month = new Date(t.date).toISOString().slice(0, 7); // YYYY-MM
//       monthly[month] = (monthly[month] || 0) + t.amount;
//     });
//     return monthly;
//   }
// }

// export default new AIFinancialAssistantService();