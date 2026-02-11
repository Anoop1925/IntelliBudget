import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import BudgetForecastService from "../services/budget-forecast.service";
import { GenerateBudgetForecastRequestBody } from "../@types/budget-forecast.type";

export const generateBudgetForecastController = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = (req as any).user?._id;
		if (!userId) {
			return res.status(401).json({ success: false, message: "User not authenticated" });
		}

		const body = (req.body || {}) as GenerateBudgetForecastRequestBody;
		const data = await BudgetForecastService.generate(userId, body);
		return res.status(200).json({ success: true, data });
	}
);

export const getLatestBudgetForecastController = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = (req as any).user?._id;
		if (!userId) {
			return res.status(401).json({ success: false, message: "User not authenticated" });
		}
		const latest = await BudgetForecastService.getLatest(userId);
		if (!latest) return res.status(404).json({ success: false, message: "No budget forecast found" });
		return res.status(200).json({ success: true, data: latest });
	}
);

export const getBudgetForecastHistoryController = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = (req as any).user?._id;
		if (!userId) {
			return res.status(401).json({ success: false, message: "User not authenticated" });
		}
		const page = parseInt((req.query.page as string) || "1", 10);
		const limit = parseInt((req.query.limit as string) || "10", 10);
		const result = await BudgetForecastService.getHistory(userId, page, limit);
		return res.status(200).json({ success: true, data: result.items, pagination: result.pagination });
	}
);


