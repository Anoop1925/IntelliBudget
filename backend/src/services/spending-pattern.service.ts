import TransactionModel from "../models/transaction.model";
import SpendingPatternModel from "../models/spending-pattern.model";
import { TransactionTypeEnum } from "../models/transaction.model";

export class SpendingPatternService {
  async analyzeUserSpendingPatterns(userId: string) {
    try {
      // Get user's expense transactions from last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      console.log("🔍 SpendingPatternService - Looking for transactions from:", sixMonthsAgo.toISOString());

      const transactions = await TransactionModel.find({
        userId,
        type: TransactionTypeEnum.EXPENSE,
        date: { $gte: sixMonthsAgo },
      }).sort({ date: 1 });

      console.log("🔍 SpendingPatternService - Found transactions:", {
        total: transactions.length,
        types: transactions.map(t => ({ type: t.type, amount: t.amount, date: t.date })),
        userId: userId
      });

      // Lower the threshold and provide better error messages
      if (transactions.length < 5) {
        throw new Error(`Insufficient expense data for pattern analysis. Found ${transactions.length} expense transactions, need at least 5. Consider adding more expense transactions or wait for more data.`);
      }

      // Analyze daily patterns
      const dailyPatterns = this.analyzeDailyPatterns(transactions);
      
      // Analyze weekly patterns
      const weeklyPatterns = this.analyzeWeeklyPatterns(transactions);
      
      // Analyze monthly patterns
      const monthlyPatterns = this.analyzeMonthlyPatterns(transactions);

      console.log("✅ SpendingPatternService - Analysis complete:", {
        daily: dailyPatterns.length,
        weekly: weeklyPatterns.length,
        monthly: monthlyPatterns.length
      });

      // Save patterns to database
      await this.savePatterns(userId, dailyPatterns, weeklyPatterns, monthlyPatterns);

      return {
        daily: dailyPatterns,
        weekly: weeklyPatterns,
        monthly: monthlyPatterns,
      };
    } catch (error) {
      console.error("❌ SpendingPatternService - Error in analyzeUserSpendingPatterns:", error);
      throw error;
    }
  }

  private analyzeDailyPatterns(transactions: any[]) {
    // Group by day of week and analyze spending patterns
    const dailyStats = new Map();
    
    transactions.forEach(transaction => {
      const dayOfWeek = new Date(transaction.date).getDay();
      if (!dailyStats.has(dayOfWeek)) {
        dailyStats.set(dayOfWeek, { total: 0, count: 0, amounts: [] });
      }
      
      const stats = dailyStats.get(dayOfWeek);
      stats.total += transaction.amount;
      stats.count += 1;
      stats.amounts.push(transaction.amount);
    });

    // Calculate patterns for each day
    const patterns = [];
    for (const [day, stats] of dailyStats) {
      const averageAmount = stats.total / stats.count;
      const trend = this.calculateTrend(stats.amounts);
      
      patterns.push({
        patternType: 'daily',
        category: this.getDayName(day),
        averageAmount,
        frequency: stats.count,
        trend,
        confidence: this.calculateConfidence(stats.amounts),
      });
    }

    return patterns;
  }

  private analyzeWeeklyPatterns(transactions: any[]) {
    // Group by week number and analyze spending patterns
    const weeklyStats = new Map();
    
    transactions.forEach(transaction => {
      const weekNumber = this.getWeekNumber(transaction.date);
      if (!weeklyStats.has(weekNumber)) {
        weeklyStats.set(weekNumber, { total: 0, count: 0, amounts: [] });
      }
      
      const stats = weeklyStats.get(weekNumber);
      stats.total += transaction.amount;
      stats.count += 1;
      stats.amounts.push(transaction.amount);
    });

    // Calculate patterns for each week
    const patterns = [];
    for (const [week, stats] of weeklyStats) {
      const averageAmount = stats.total / stats.count;
      const trend = this.calculateTrend(stats.amounts);
      
      patterns.push({
        patternType: 'weekly',
        category: `Week ${week}`,
        averageAmount,
        frequency: stats.count,
        trend,
        confidence: this.calculateConfidence(stats.amounts),
      });
    }

    return patterns;
  }

  private analyzeMonthlyPatterns(transactions: any[]) {
    // Group by month and analyze spending patterns
    const monthlyStats = new Map();
    
    transactions.forEach(transaction => {
      const month = new Date(transaction.date).getMonth();
      if (!monthlyStats.has(month)) {
        monthlyStats.set(month, { total: 0, count: 0, amounts: [] });
      }
      
      const stats = monthlyStats.get(month);
      stats.total += transaction.amount;
      stats.count += 1;
      stats.amounts.push(transaction.amount);
    });

    // Calculate patterns for each month
    const patterns = [];
    for (const [month, stats] of monthlyStats) {
      const averageAmount = stats.total / stats.count;
      const trend = this.calculateTrend(stats.amounts);
      
      patterns.push({
        patternType: 'monthly',
        category: this.getMonthName(month),
        averageAmount,
        frequency: stats.count,
        trend,
        confidence: this.calculateConfidence(stats.amounts),
      });
    }

    return patterns;
  }

  private getWeekNumber(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  }

  private getMonthName(month: number) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  }

  private calculateTrend(amounts: number[]) {
    if (amounts.length < 2) return 'stable';
    
    const firstHalf = amounts.slice(0, Math.floor(amounts.length / 2));
    const secondHalf = amounts.slice(Math.floor(amounts.length / 2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    const change = ((secondAvg - firstAvg) / firstAvg) * 100;
    
    if (change > 10) return 'increasing';
    if (change < -10) return 'decreasing';
    return 'stable';
  }

  private calculateConfidence(amounts: number[]) {
    // Simple confidence calculation based on data consistency
    if (amounts.length < 5) return 0.3;
    if (amounts.length < 10) return 0.6;
    return 0.9;
  }

  private getDayName(day: number) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  }

  private async savePatterns(userId: string, daily: any[], weekly: any[], monthly: any[]) {
    // Clear existing patterns for this user
    await SpendingPatternModel.deleteMany({ userId });
    
    // Save new patterns
    const allPatterns = [...daily, ...weekly, ...monthly].map(pattern => ({
      ...pattern,
      userId,
    }));
    
    await SpendingPatternModel.insertMany(allPatterns);
  }

  async getUserSpendingPatterns(userId: string) {
    return await SpendingPatternModel.find({ userId }).sort({ patternType: 1, category: 1 });
  }

  async getTransactionStats(userId: string) {
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const allTransactions = await TransactionModel.find({
        userId,
        date: { $gte: sixMonthsAgo },
      });

      const expenseTransactions = allTransactions.filter(t => t.type === TransactionTypeEnum.EXPENSE);
      const incomeTransactions = allTransactions.filter(t => t.type === TransactionTypeEnum.INCOME);

      return {
        totalTransactions: allTransactions.length,
        expenseTransactions: expenseTransactions.length,
        incomeTransactions: incomeTransactions.length,
        dateRange: {
          from: sixMonthsAgo.toISOString(),
          to: new Date().toISOString()
        },
        transactions: allTransactions.map(t => ({
          id: t._id,
          type: t.type,
          amount: t.amount,
          date: t.date,
          category: t.category
        }))
      };
    } catch (error) {
      console.error("❌ SpendingPatternService - Error getting transaction stats:", error);
      throw error;
    }
  }
}

export default new SpendingPatternService();