import mongoose, { Schema } from "mongoose";

export interface BudgetForecastDocument extends Document {
	userId: mongoose.Types.ObjectId;
	generatedAt: Date;
	params: {
		months: number;
		horizonMonths: number;
		granularity: "monthly" | "weekly";
		incomeOverride?: number;
		savingsTargetPercent?: number;
	};
	result: any;
}

const budgetForecastSchema = new Schema<BudgetForecastDocument>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		generatedAt: { type: Date, default: Date.now },
		params: {
			months: { type: Number, required: true },
			horizonMonths: { type: Number, required: true },
			granularity: { type: String, enum: ["monthly", "weekly"], required: true },
			incomeOverride: { type: Number, default: null },
			savingsTargetPercent: { type: Number, default: null },
		},
		result: { type: Schema.Types.Mixed, required: true },
	},
	{ timestamps: true }
);

const BudgetForecastModel = mongoose.model<BudgetForecastDocument>(
	"BudgetForecast",
	budgetForecastSchema
);

export default BudgetForecastModel;


