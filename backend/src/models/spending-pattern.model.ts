import mongoose, { Schema } from "mongoose";

export interface SpendingPatternDocument extends Document {
  userId: mongoose.Types.ObjectId;
  patternType: 'daily' | 'weekly' | 'monthly';
  category: string;
  averageAmount: number;
  frequency: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const spendingPatternSchema = new Schema<SpendingPatternDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    patternType: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    averageAmount: {
      type: Number,
      required: true,
    },
    frequency: {
      type: Number,
      required: true,
    },
    trend: {
      type: String,
      enum: ['increasing', 'decreasing', 'stable'],
      required: true,
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
spendingPatternSchema.index({ userId: 1, patternType: 1, category: 1 });

const SpendingPatternModel = mongoose.model<SpendingPatternDocument>(
  "SpendingPattern",
  spendingPatternSchema
);

export default SpendingPatternModel;