import { genAI } from "../config/google-ai.config";
import TransactionModel, { TransactionTypeEnum } from "../models/transaction.model";
import UserModel from "../models/user.model";
import FinancialHealthModel from "../models/financial-health.model";
import { convertToDollarUnit } from "../utils/format-currency";
import { CustomFinancialInput } from "../@types/financial-health.type";

export class FinancialHealthService {
  async generateFinancialHealthAssessment(userId: string) {
    try {
      console.log("🔍 FinancialHealthService - Starting assessment for user:", userId);
      
      // 1. Gather all financial data independently
      const financialData = await this.gatherFinancialData(userId);
      
      // 2. Generate AI analysis using Gemini
      const aiAnalysis = await this.generateAIAnalysis(financialData);
      
      // 3. Calculate scores independently
      const scores = this.calculateScores(financialData);
      
      // 4. Create comprehensive assessment
      const assessment = {
        userId,
        assessmentDate: new Date(),
        overallScore: this.calculateOverallScore(scores),
        categoryScores: scores,
        detailedAnalysis: aiAnalysis.detailedAnalysis,
        aiInsights: aiAnalysis.insights
      };
      
      console.log("✅ FinancialHealthService - Assessment created:", {
        overallScore: assessment.overallScore,
        categoryScores: assessment.categoryScores
      });
      
      // 5. Save to database
      const savedAssessment = await FinancialHealthModel.create(assessment);
      
      return savedAssessment;
    } catch (error) {
      console.error("❌ FinancialHealthService - Error in generateFinancialHealthAssessment:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Financial health assessment failed: ${errorMessage}`);
    }
  }

  async generateCustomFinancialHealthAssessment(userId: string, customInput: CustomFinancialInput) {
    try {
      console.log("🔍 FinancialHealthService - Starting custom assessment for user:", userId);
      
      // 1. Gather transaction data and combine with custom input
      const transactionData = await this.gatherFinancialData(userId);
      const enhancedData = this.enhanceDataWithCustomInput(transactionData, customInput);
      
      // 2. Generate personalized AI analysis using Gemini
      const aiAnalysis = await this.generatePersonalizedAIAnalysis(enhancedData, customInput);
      
      // 3. Calculate personalized scores
      const scores = this.calculatePersonalizedScores(enhancedData, customInput);
      
      // 4. Create comprehensive personalized assessment
      const assessment = {
        userId,
        assessmentDate: new Date(),
        overallScore: this.calculateOverallScore(scores),
        categoryScores: scores,
        detailedAnalysis: aiAnalysis.detailedAnalysis,
        aiInsights: aiAnalysis.insights
      };
      
      console.log("✅ FinancialHealthService - Custom assessment created:", {
        overallScore: assessment.overallScore,
        categoryScores: assessment.categoryScores
      });
      
      // 5. Save to database
      const savedAssessment = await FinancialHealthModel.create(assessment);
      
      return savedAssessment;
    } catch (error) {
      console.error("❌ FinancialHealthService - Error in generateCustomFinancialHealthAssessment:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Custom financial health assessment failed: ${errorMessage}`);
    }
  }

  async getLatestAssessment(userId: string) {
    try {
      const assessment = await FinancialHealthModel.findOne({ userId })
        .sort({ assessmentDate: -1 })
        .limit(1);
      
      return assessment;
    } catch (error) {
      console.error("❌ FinancialHealthService - Error getting latest assessment:", error);
      throw error;
    }
  }

  async getAssessmentHistory(userId: string, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const [assessments, totalCount] = await Promise.all([
        FinancialHealthModel.find({ userId })
          .sort({ assessmentDate: -1 })
          .skip(skip)
          .limit(limit),
        FinancialHealthModel.countDocuments({ userId })
      ]);
      
      const totalPages = Math.ceil(totalCount / limit);
      
      return {
        assessments,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          skip,
        },
      };
    } catch (error) {
      console.error("❌ FinancialHealthService - Error getting assessment history:", error);
      throw error;
    }
  }

  private async gatherFinancialData(userId: string) {
    // Get last 12 months of data
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    const transactions = await TransactionModel.find({
      userId,
      date: { $gte: twelveMonthsAgo }
    });
    
    const user = await UserModel.findById(userId);
    
    return {
      transactions,
      user,
      analysisPeriod: {
        from: twelveMonthsAgo,
        to: new Date()
      }
    };
  }

  private async generateAIAnalysis(financialData: any) {
    try {
      const prompt = this.buildFinancialHealthPrompt(financialData);
      
      console.log("🤖 FinancialHealthService - Sending prompt to Gemini API");
      
      const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      if (!result.text) {
        throw new Error("No response text received from Gemini API");
      }
      
      const aiResponse = result.text;
      console.log("✅ FinancialHealthService - Received AI response, length:", aiResponse.length);
      
      // Parse AI response into structured format
      return this.parseAIResponse(aiResponse);
    } catch (error) {
      console.error("❌ FinancialHealthService - Error generating AI analysis:", error);
      // Return fallback analysis if AI fails
      return this.generateFallbackAnalysis(financialData);
    }
  }

  private buildFinancialHealthPrompt(financialData: any) {
    const { transactions, user } = financialData;
    
    const totalIncome = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.INCOME)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.EXPENSE)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const monthlyIncome = totalIncome / 12;
    const monthlyExpenses = totalExpenses / 12;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    
    // Calculate category breakdown
    const categoryBreakdown = this.calculateCategoryBreakdown(transactions);
    
    return `
    Analyze the financial health of this user and provide a comprehensive assessment.
    
    User Profile:
    - Name: ${user?.name || 'User'}
    - Monthly Income: $${monthlyIncome.toFixed(2)}
    - Monthly Expenses: $${monthlyExpenses.toFixed(2)}
    - Savings Rate: ${savingsRate.toFixed(2)}%
    - Total Transactions: ${transactions.length}
    - Analysis Period: Last 12 months
    
    Transaction Summary:
    - Total Income: $${totalIncome.toFixed(2)}
    - Total Expenses: $${totalExpenses.toFixed(2)}
    - Net Savings: $${(totalIncome - totalExpenses).toFixed(2)}
    
    Category Breakdown:
    ${Object.entries(categoryBreakdown)
      .map(([category, amount]) => `- ${category}: $${amount.toFixed(2)}`)
      .join('\n')}
    
    Please provide a comprehensive financial health analysis in this exact JSON format:
    {
      "overallScore": 75,
      "detailedAnalysis": {
        "incomeExpenseRatio": {
          "score": 80,
          "analysis": "Your income exceeds expenses by a healthy margin, providing good financial stability.",
          "recommendations": [
            "Consider increasing your emergency fund",
            "Look into investment opportunities for excess income"
          ]
        },
        "savingsRate": {
          "score": 70,
          "analysis": "You're saving a reasonable amount, but there's room for improvement.",
          "recommendations": [
            "Aim to save 20% of your income",
            "Automate your savings transfers"
          ]
        },
        "emergencyFundAdequacy": {
          "score": 60,
          "analysis": "Your emergency fund could be stronger to handle unexpected expenses.",
          "recommendations": [
            "Build emergency fund to cover 3-6 months of expenses",
            "Set up automatic monthly contributions"
          ]
        },
        "debtToIncomeRatio": {
          "score": 85,
          "analysis": "Your debt levels are well-managed relative to your income.",
          "recommendations": [
            "Continue making regular debt payments",
            "Consider debt consolidation if you have multiple high-interest debts"
          ]
        },
        "spendingEfficiency": {
          "score": 65,
          "analysis": "Your spending shows some areas where optimization is possible.",
          "recommendations": [
            "Review discretionary spending categories",
            "Look for subscription services you can cancel"
          ]
        }
      },
      "insights": {
        "summary": "Overall, you have a solid financial foundation with good income management and reasonable savings. Focus on building your emergency fund and optimizing discretionary spending.",
        "keyStrengths": [
          "Strong income-to-expense ratio",
          "Consistent savings habits",
          "Good debt management"
        ],
        "areasOfConcern": [
          "Emergency fund could be stronger",
          "Some room for spending optimization"
        ],
        "priorityActions": [
          "Increase emergency fund contributions",
          "Review and optimize monthly subscriptions",
          "Set up automatic savings transfers"
        ],
        "longTermRecommendations": [
          "Consider increasing retirement contributions",
          "Explore investment opportunities",
          "Plan for major future expenses"
        ]
      }
    }
    
    Base your analysis on the financial data provided and provide realistic, actionable recommendations.
    `;
  }

  private parseAIResponse(aiResponse: string) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          detailedAnalysis: parsed.detailedAnalysis,
          insights: parsed.insights
        };
      }
      
      throw new Error("No valid JSON found in AI response");
    } catch (error) {
      console.error("❌ FinancialHealthService - Error parsing AI response:", error);
      throw new Error("Failed to parse AI response");
    }
  }

  private generateFallbackAnalysis(financialData: any) {
    // Fallback analysis if AI fails
    const { transactions } = financialData;
    
    const totalIncome = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.INCOME)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.EXPENSE)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    
    return {
      detailedAnalysis: {
        incomeExpenseRatio: {
          score: this.calculateIncomeExpenseRatio(transactions),
          analysis: "Analysis based on income and expense patterns.",
          recommendations: ["Review your spending habits", "Consider increasing income sources"]
        },
        savingsRate: {
          score: this.calculateSavingsRate(transactions),
          analysis: "Savings rate analysis based on transaction history.",
          recommendations: ["Aim to save 20% of income", "Set up automatic savings"]
        },
        emergencyFundAdequacy: {
          score: this.calculateEmergencyFundAdequacy(transactions),
          analysis: "Emergency fund assessment based on current savings.",
          recommendations: ["Build 3-6 months emergency fund", "Start with small monthly contributions"]
        },
        debtToIncomeRatio: {
          score: this.calculateDebtToIncomeRatio(transactions),
          analysis: "Debt management assessment.",
          recommendations: ["Keep debt below 30% of income", "Prioritize high-interest debt"]
        },
        spendingEfficiency: {
          score: this.calculateSpendingEfficiency(transactions),
          analysis: "Spending efficiency analysis.",
          recommendations: ["Track all expenses", "Identify unnecessary spending"]
        }
      },
      insights: {
        summary: "Financial health assessment completed. Review the detailed analysis for specific recommendations.",
        keyStrengths: ["Regular income", "Transaction tracking"],
        areasOfConcern: ["Limited data for analysis"],
        priorityActions: ["Continue tracking expenses", "Set financial goals"],
        longTermRecommendations: ["Build emergency fund", "Plan for future expenses"]
      }
    };
  }

  private calculateScores(financialData: any) {
    const { transactions } = financialData;
    
    // Calculate each metric independently
    const incomeExpenseRatio = this.calculateIncomeExpenseRatio(transactions);
    const savingsRate = this.calculateSavingsRate(transactions);
    const emergencyFundAdequacy = this.calculateEmergencyFundAdequacy(transactions);
    const debtToIncomeRatio = this.calculateDebtToIncomeRatio(transactions);
    const spendingEfficiency = this.calculateSpendingEfficiency(transactions);
    
    return {
      incomeExpenseRatio,
      savingsRate,
      emergencyFundAdequacy,
      debtToIncomeRatio,
      spendingEfficiency
    };
  }

  private calculateOverallScore(categoryScores: any) {
    const weights: Record<string, number> = {
      incomeExpenseRatio: 0.25,
      savingsRate: 0.25,
      emergencyFundAdequacy: 0.20,
      debtToIncomeRatio: 0.20,
      spendingEfficiency: 0.10
    };
    
    let overallScore = 0;
    for (const [category, score] of Object.entries(categoryScores)) {
      overallScore += (score as number) * (weights[category] || 0);
    }
    
    return Math.round(overallScore);
  }

  private calculateIncomeExpenseRatio(transactions: any[]) {
    const totalIncome = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.INCOME)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.EXPENSE)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    if (totalExpenses === 0) return 100;
    
    const ratio = totalIncome / totalExpenses;
    
    if (ratio >= 2.0) return 100;
    if (ratio >= 1.5) return 85;
    if (ratio >= 1.2) return 70;
    if (ratio >= 1.0) return 50;
    if (ratio >= 0.8) return 30;
    return 10;
  }

  private calculateSavingsRate(transactions: any[]) {
    const totalIncome = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.INCOME)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.EXPENSE)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    if (totalIncome === 0) return 0;
    
    const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
    
    if (savingsRate >= 30) return 100;
    if (savingsRate >= 20) return 85;
    if (savingsRate >= 15) return 70;
    if (savingsRate >= 10) return 50;
    if (savingsRate >= 5) return 30;
    return 10;
  }

  private calculateEmergencyFundAdequacy(transactions: any[]) {
    const monthlyExpenses = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.EXPENSE)
      .reduce((sum: number, t: any) => sum + t.amount, 0) / 12;
    
    const totalSavings = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.INCOME)
      .reduce((sum: number, t: any) => sum + t.amount, 0) - 
      transactions
        .filter((t: any) => t.type === TransactionTypeEnum.EXPENSE)
        .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const monthsCovered = monthlyExpenses > 0 ? totalSavings / monthlyExpenses : 0;
    
    if (monthsCovered >= 6) return 100;
    if (monthsCovered >= 4) return 80;
    if (monthsCovered >= 3) return 60;
    if (monthsCovered >= 2) return 40;
    if (monthsCovered >= 1) return 20;
    return 0;
  }

  private calculateDebtToIncomeRatio(transactions: any[]) {
    // Simplified calculation - in real implementation, you'd need debt data
    // For now, we'll use a conservative estimate based on spending patterns
    const totalIncome = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.INCOME)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter((t: any) => t.type === TransactionTypeEnum.EXPENSE)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    if (totalIncome === 0) return 0;
    
    // Estimate debt as 20% of expenses (conservative)
    const estimatedDebt = totalExpenses * 0.2;
    const debtRatio = (estimatedDebt / totalIncome) * 100;
    
    if (debtRatio <= 10) return 100;
    if (debtRatio <= 20) return 85;
    if (debtRatio <= 30) return 70;
    if (debtRatio <= 40) return 50;
    if (debtRatio <= 50) return 30;
    return 10;
  }

  private calculateSpendingEfficiency(transactions: any[]) {
    // Analyze spending patterns for efficiency
    const expenses = transactions.filter((t: any) => t.type === TransactionTypeEnum.EXPENSE);
    
    if (expenses.length === 0) return 100;
    
    // Calculate variance in spending (lower variance = more efficient)
    const amounts = expenses.map((t: any) => t.amount);
    const mean = amounts.reduce((sum: number, amount: number) => sum + amount, 0) / amounts.length;
    const variance = amounts.reduce((sum: number, amount: number) => sum + Math.pow(amount - mean, 2), 0) / amounts.length;
    const standardDeviation = Math.sqrt(variance);
    const coefficientOfVariation = standardDeviation / mean;
    
    // Score based on spending consistency
    if (coefficientOfVariation <= 0.3) return 100;
    if (coefficientOfVariation <= 0.5) return 80;
    if (coefficientOfVariation <= 0.7) return 60;
    if (coefficientOfVariation <= 1.0) return 40;
    return 20;
  }

  private calculateCategoryBreakdown(transactions: any[]) {
    const categoryMap = new Map<string, number>();
    
    transactions
      .filter((t: any) => t.type === TransactionTypeEnum.EXPENSE)
      .forEach((transaction: any) => {
        const category = transaction.category || 'Uncategorized';
        const currentAmount = categoryMap.get(category) || 0;
        categoryMap.set(category, currentAmount + transaction.amount);
      });
    
    // Convert to object and sort by amount
    const breakdown = Object.fromEntries(categoryMap);
    return Object.fromEntries(
      Object.entries(breakdown)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10) // Top 10 categories
    );
  }

  private enhanceDataWithCustomInput(transactionData: any, customInput: CustomFinancialInput) {
    return {
      ...transactionData,
      customInput,
      enhancedIncome: customInput.monthlyIncome * 12,
      enhancedBudget: customInput.monthlyBudget * 12,
      enhancedDebt: customInput.totalDebt,
      enhancedEmergencyFund: customInput.emergencyFund,
      enhancedNetWorth: customInput.netWorth,
      enhancedInvestmentPortfolio: customInput.investmentPortfolio
    };
  }

  private async generatePersonalizedAIAnalysis(enhancedData: any, customInput: CustomFinancialInput) {
    try {
      const prompt = this.buildPersonalizedPrompt(enhancedData, customInput);
      
      const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (!result.text) {
        throw new Error("No response text received from Gemini API");
      }

      const aiResponse = result.text;
      
      // Try to parse JSON response
      try {
        // Clean the response to remove markdown formatting
        let cleanResponse = aiResponse.trim();
        
        // Remove markdown code blocks if present
        if (cleanResponse.startsWith('```')) {
          cleanResponse = cleanResponse.replace(/```json\s*/, '').replace(/```\s*$/, '');
        }
        
        // Remove any leading/trailing whitespace and newlines
        cleanResponse = cleanResponse.trim();
        
        const parsedResponse = JSON.parse(cleanResponse);
        return {
          detailedAnalysis: parsedResponse.detailedAnalysis || this.generatePersonalizedFallbackAnalysis(enhancedData, customInput),
          insights: parsedResponse.insights || this.generateFallbackInsights(enhancedData, customInput)
        };
      } catch (parseError) {
        console.warn("Failed to parse AI response, using fallback:", parseError);
        console.warn("Raw AI response:", aiResponse);
        return {
          detailedAnalysis: this.generatePersonalizedFallbackAnalysis(enhancedData, customInput),
          insights: this.generateFallbackInsights(enhancedData, customInput)
        };
      }
    } catch (error) {
      console.error("Error generating personalized AI analysis:", error);
      return {
        detailedAnalysis: this.generatePersonalizedFallbackAnalysis(enhancedData, customInput),
        insights: this.generateFallbackInsights(enhancedData, customInput)
      };
    }
  }

  private buildPersonalizedPrompt(enhancedData: any, customInput: CustomFinancialInput) {
    return `Analyze the financial health of this user with personalized context.

USER PROFILE:
- Age: ${customInput.age}
- Family Size: ${customInput.familySize}
- Career Stage: ${customInput.careerStage}
- Risk Tolerance: ${customInput.riskTolerance}
- Financial Goals: ${customInput.primaryGoal}
- Time Horizon: ${customInput.timeHorizon}

CURRENT FINANCIAL SITUATION:
- Monthly Income: $${customInput.monthlyIncome}
- Monthly Budget: $${customInput.monthlyBudget}
- Net Worth: $${customInput.netWorth}
- Emergency Fund: $${customInput.emergencyFund}
- Debt Load: $${customInput.totalDebt}
- Investment Portfolio: $${customInput.investmentPortfolio}

LIFE CONTEXT:
- Location: ${customInput.location}
- Housing: ${customInput.housingType}
- Dependents: ${customInput.dependents}
- Health Status: ${customInput.healthStatus}
- Education: ${customInput.educationLevel}
- Marital Status: ${customInput.maritalStatus}
- Has Children: ${customInput.hasChildren}

TRANSACTION DATA (Last 12 months):
- Total Income: $${enhancedData.totalIncome}
- Total Expenses: $${enhancedData.totalExpenses}
- Savings Rate: ${enhancedData.savingsRate}%

Please provide a personalized financial health analysis considering:
1. Their specific life circumstances and goals
2. Age-appropriate financial recommendations
3. Location-specific cost considerations
4. Family situation implications
5. Career stage financial planning
6. Risk tolerance alignment

IMPORTANT: Respond with ONLY valid JSON. Do not include any markdown formatting, code blocks, or explanatory text. Start directly with the opening brace { and end with the closing brace }.

The response must have this exact structure:
{
  "detailedAnalysis": {
    "incomeExpenseRatio": {
      "score": 85,
      "analysis": "Your income-to-expense ratio is healthy, with expenses at 65% of income.",
      "recommendations": ["Continue monitoring spending", "Consider increasing savings"]
    },
    "savingsRate": {
      "score": 75,
      "analysis": "You're saving 15% of your income, which is good for your age group.",
      "recommendations": ["Aim for 20% savings rate", "Automate savings transfers"]
    },
    "emergencyFundAdequacy": {
      "score": 60,
      "analysis": "Your emergency fund covers 4 months of expenses.",
      "recommendations": ["Build to 6 months coverage", "Set monthly contribution goals"]
    },
    "debtToIncomeRatio": {
      "score": 80,
      "analysis": "Your debt levels are manageable at 25% of annual income.",
      "recommendations": ["Keep debt below 30%", "Prioritize high-interest debt"]
    },
    "spendingEfficiency": {
      "score": 70,
      "analysis": "Your spending shows good consistency with room for optimization.",
      "recommendations": ["Review discretionary spending", "Optimize recurring expenses"]
    }
  },
  "insights": {
    "summary": "Overall, you have a solid financial foundation with good income management.",
    "keyStrengths": ["Strong income-to-expense ratio", "Consistent savings habits"],
    "areasOfConcern": ["Emergency fund could be stronger", "Some spending optimization opportunities"],
    "priorityActions": ["Increase emergency fund", "Review monthly subscriptions"],
    "longTermRecommendations": ["Start retirement planning", "Consider investment opportunities"]
  }
}`;
  }

  private calculatePersonalizedScores(enhancedData: any, customInput: CustomFinancialInput) {
    // Use custom input values for more accurate scoring
    const monthlyIncome = customInput.monthlyIncome;
    const monthlyExpenses = customInput.monthlyBudget;
    const emergencyFund = customInput.emergencyFund;
    const totalDebt = customInput.totalDebt;
    const netWorth = customInput.netWorth;

    return {
      incomeExpenseRatio: this.calculatePersonalizedIncomeExpenseRatio(monthlyIncome, monthlyExpenses, customInput),
      savingsRate: this.calculatePersonalizedSavingsRate(monthlyIncome, monthlyExpenses, customInput),
      emergencyFundAdequacy: this.calculatePersonalizedEmergencyFundAdequacy(monthlyExpenses, emergencyFund, customInput),
      debtToIncomeRatio: this.calculatePersonalizedDebtToIncomeRatio(monthlyIncome, totalDebt, customInput),
      spendingEfficiency: this.calculatePersonalizedSpendingEfficiency(monthlyExpenses, customInput)
    };
  }

  private calculatePersonalizedIncomeExpenseRatio(income: number, expenses: number, customInput: CustomFinancialInput) {
    if (income === 0) return 0;
    const ratio = (expenses / income) * 100;
    
    // Adjust scoring based on age and family size
    let baseScore = 0;
    if (ratio <= 50) baseScore = 100;
    else if (ratio <= 60) baseScore = 90;
    else if (ratio <= 70) baseScore = 80;
    else if (ratio <= 80) baseScore = 70;
    else if (ratio <= 90) baseScore = 50;
    else baseScore = 30;

    // Age-based adjustments
    if (customInput.age < 30) baseScore += 10; // Younger people get some leeway
    else if (customInput.age > 50) baseScore -= 5; // Older people should be more conservative

    // Family size adjustments
    if (customInput.familySize > 1) baseScore += 5; // Families get some leeway

    return Math.min(100, Math.max(0, baseScore));
  }

  private calculatePersonalizedSavingsRate(income: number, expenses: number, customInput: CustomFinancialInput) {
    if (income === 0) return 0;
    const savingsRate = ((income - expenses) / income) * 100;
    
    let baseScore = 0;
    if (savingsRate >= 30) baseScore = 100;
    else if (savingsRate >= 20) baseScore = 85;
    else if (savingsRate >= 15) baseScore = 70;
    else if (savingsRate >= 10) baseScore = 50;
    else if (savingsRate >= 5) baseScore = 30;
    else baseScore = 10;

    // Age-based adjustments
    if (customInput.age < 30) baseScore += 5; // Younger people get some leeway
    else if (customInput.age > 50) baseScore += 10; // Older people should save more

    // Career stage adjustments
    if (customInput.careerStage === 'student') baseScore += 15; // Students get bonus
    else if (customInput.careerStage === 'retired') baseScore += 10; // Retired people should have savings

    return Math.min(100, Math.max(0, baseScore));
  }

  private calculatePersonalizedEmergencyFundAdequacy(monthlyExpenses: number, emergencyFund: number, customInput: CustomFinancialInput) {
    const monthsCovered = monthlyExpenses > 0 ? emergencyFund / monthlyExpenses : 0;
    
    let baseScore = 0;
    if (monthsCovered >= 6) baseScore = 100;
    else if (monthsCovered >= 4) baseScore = 80;
    else if (monthsCovered >= 3) baseScore = 60;
    else if (monthsCovered >= 2) baseScore = 40;
    else if (monthsCovered >= 1) baseScore = 20;
    else baseScore = 0;

    // Family size adjustments
    if (customInput.familySize > 1) baseScore += 10; // Families need more emergency fund

    // Health status adjustments
    if (customInput.healthStatus === 'poor' || customInput.healthStatus === 'fair') {
      baseScore += 15; // Health issues require more emergency fund
    }

    return Math.min(100, Math.max(0, baseScore));
  }

  private calculatePersonalizedDebtToIncomeRatio(monthlyIncome: number, totalDebt: number, customInput: CustomFinancialInput) {
    if (monthlyIncome === 0) return 0;
    const annualIncome = monthlyIncome * 12;
    const debtRatio = (totalDebt / annualIncome) * 100;
    
    let baseScore = 0;
    if (debtRatio <= 10) baseScore = 100;
    else if (debtRatio <= 20) baseScore = 85;
    else if (debtRatio <= 30) baseScore = 70;
    else if (debtRatio <= 40) baseScore = 50;
    else if (debtRatio <= 50) baseScore = 30;
    else baseScore = 10;

    // Age-based adjustments
    if (customInput.age < 30) baseScore += 10; // Younger people can have more debt
    else if (customInput.age > 50) baseScore -= 10; // Older people should have less debt

    // Education adjustments
    if (customInput.educationLevel === 'master' || customInput.educationLevel === 'phd') {
      baseScore += 5; // Higher education debt is often justified
    }

    return Math.min(100, Math.max(0, baseScore));
  }

  private calculatePersonalizedSpendingEfficiency(monthlyExpenses: number, customInput: CustomFinancialInput) {
    // Base score on budget adherence
    let baseScore = 80; // Start with a reasonable base

    // Location-based adjustments
    if (customInput.costOfLiving === 'high') baseScore += 10; // High cost areas get bonus
    else if (customInput.costOfLiving === 'low') baseScore -= 5; // Low cost areas should be more efficient

    // Housing type adjustments
    if (customInput.housingType === 'renting') baseScore += 5; // Renting is often more flexible
    else if (customInput.housingType === 'mortgage') baseScore -= 5; // Mortgages require more planning

    // Family adjustments
    if (customInput.hasChildren) baseScore += 10; // Children increase necessary expenses

    return Math.min(100, Math.max(0, baseScore));
  }

  private generatePersonalizedFallbackAnalysis(enhancedData: any, customInput: CustomFinancialInput) {
    // Generate personalized fallback analysis with proper structure
    const monthlyIncome = customInput.monthlyIncome;
    const monthlyExpenses = customInput.monthlyBudget;
    const emergencyFund = customInput.emergencyFund;
    const totalDebt = customInput.totalDebt;

    return {
      incomeExpenseRatio: {
        score: this.calculatePersonalizedIncomeExpenseRatio(monthlyIncome, monthlyExpenses, customInput),
        analysis: `Your income-to-expense ratio analysis based on your monthly income of $${monthlyIncome} and budget of $${monthlyExpenses}.`,
        recommendations: [
          "Aim to keep expenses below 70% of income",
          "Consider increasing income sources if expenses are too high",
          "Review discretionary spending categories"
        ]
      },
      savingsRate: {
        score: this.calculatePersonalizedSavingsRate(monthlyIncome, monthlyExpenses, customInput),
        analysis: `Savings rate analysis considering your age (${customInput.age}) and career stage (${customInput.careerStage}).`,
        recommendations: [
          "Target 20% savings rate for financial security",
          "Set up automatic savings transfers",
          "Create multiple savings goals"
        ]
      },
      emergencyFundAdequacy: {
        score: this.calculatePersonalizedEmergencyFundAdequacy(monthlyExpenses, emergencyFund, customInput),
        analysis: `Emergency fund assessment for your family size (${customInput.familySize}) and health status (${customInput.healthStatus}).`,
        recommendations: [
          "Build emergency fund to cover 6 months of expenses",
          "Consider family size and health factors",
          "Set up automatic monthly contributions"
        ]
      },
      debtToIncomeRatio: {
        score: this.calculatePersonalizedDebtToIncomeRatio(monthlyIncome, totalDebt, customInput),
        analysis: `Debt management analysis considering your education level (${customInput.educationLevel}) and age (${customInput.age}).`,
        recommendations: [
          "Keep debt below 30% of annual income",
          "Prioritize high-interest debt repayment",
          "Consider debt consolidation if needed"
        ]
      },
      spendingEfficiency: {
        score: this.calculatePersonalizedSpendingEfficiency(monthlyExpenses, customInput),
        analysis: `Spending efficiency analysis for your location (${customInput.location}) and housing type (${customInput.housingType}).`,
        recommendations: [
          "Track all expenses consistently",
          "Optimize housing and transportation costs",
          "Review subscription services regularly"
        ]
      }
    };
  }

  private generateFallbackInsights(enhancedData: any, customInput: CustomFinancialInput) {
    const insights = {
      summary: `Based on your profile as a ${customInput.age}-year-old ${customInput.careerStage} professional in ${customInput.location}, your financial health shows areas for improvement.`,
      keyStrengths: [
        `You have a clear monthly budget of $${customInput.monthlyBudget}`,
        `Your emergency fund provides some financial security`,
        `You're actively tracking your finances`
      ],
      areasOfConcern: [
        `Consider increasing your emergency fund to cover 6 months of expenses`,
        `Focus on reducing debt to improve your debt-to-income ratio`,
        `Work on increasing your savings rate`
      ],
      priorityActions: [
        `Set up automatic transfers to build emergency fund`,
        `Create a debt repayment plan`,
        `Review and optimize your monthly budget`
      ],
      longTermRecommendations: [
        `Start retirement planning early`,
        `Consider investment opportunities`,
        `Build multiple income streams`
      ]
    };

    // Customize based on primary goal
    if (customInput.primaryGoal === 'debt-reduction') {
      insights.priorityActions.unshift('Prioritize high-interest debt repayment');
      insights.longTermRecommendations.unshift('Develop a comprehensive debt management strategy');
    } else if (customInput.primaryGoal === 'savings') {
      insights.priorityActions.unshift('Set up multiple savings accounts for different goals');
      insights.longTermRecommendations.unshift('Implement the 50/30/20 budgeting rule');
    }

    return insights;
  }
}

export default new FinancialHealthService();
