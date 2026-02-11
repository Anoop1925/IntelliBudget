import mongoose, { Document, Schema } from "mongoose";

export interface FinancialHealthDocument extends Document {
  userId: mongoose.Types.ObjectId;
  assessmentDate: Date;
  overallScore: number; // 0-100
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
  createdAt: Date;
  updatedAt: Date;
}

const financialHealthSchema = new Schema<FinancialHealthDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    assessmentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    categoryScores: {
      incomeExpenseRatio: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      savingsRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      emergencyFundAdequacy: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      debtToIncomeRatio: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      spendingEfficiency: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
    },
    detailedAnalysis: {
      incomeExpenseRatio: {
        score: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        analysis: {
          type: String,
          required: true,
        },
        recommendations: [{
          type: String,
          required: true,
        }],
      },
      savingsRate: {
        score: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        analysis: {
          type: String,
          required: true,
        },
        recommendations: [{
          type: String,
          required: true,
        }],
      },
      emergencyFundAdequacy: {
        score: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        analysis: {
          type: String,
          required: true,
        },
        recommendations: [{
          type: String,
          required: true,
        }],
      },
      debtToIncomeRatio: {
        score: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        analysis: {
          type: String,
          required: true,
        },
        recommendations: [{
          type: String,
          required: true,
        }],
      },
      spendingEfficiency: {
        score: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        analysis: {
          type: String,
          required: true,
        },
        recommendations: [{
          type: String,
          required: true,
        }],
      },
    },
    aiInsights: {
      summary: {
        type: String,
        required: true,
      },
      keyStrengths: [{
        type: String,
        required: true,
      }],
      areasOfConcern: [{
        type: String,
        required: true,
      }],
      priorityActions: [{
        type: String,
        required: true,
      }],
      longTermRecommendations: [{
        type: String,
        required: true,
      }],
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
financialHealthSchema.index({ userId: 1, assessmentDate: -1 });
financialHealthSchema.index({ userId: 1, createdAt: -1 });

const FinancialHealthModel = mongoose.model<FinancialHealthDocument>(
  "FinancialHealth",
  financialHealthSchema
);

export default FinancialHealthModel;

