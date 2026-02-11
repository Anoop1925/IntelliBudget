// import { Request, Response } from "express";
// import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
// import AIFinancialAssistantService from "../services/ai-financial-assistant.service";

// export const getExpenseCategorizationController = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user?._id;
//     if (!userId) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const categorization = await AIFinancialAssistantService.getExpenseCategorization(userId);
    
//     res.status(200).json({
//       success: true,
//       data: categorization,
//     });
//   }
// );

// export const getBudgetRecommendationsController = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user?._id;
//     if (!userId) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const recommendations = await AIFinancialAssistantService.getBudgetRecommendations(userId);
    
//     res.status(200).json({
//       success: true,
//       data: recommendations,
//     });
//   }
// );

// export const getExpenseForecastingController = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user?._id;
//     if (!userId) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const forecasting = await AIFinancialAssistantService.getExpenseForecasting(userId);
    
//     res.status(200).json({
//       success: true,
//       data: forecasting,
//     });
//   }
// );