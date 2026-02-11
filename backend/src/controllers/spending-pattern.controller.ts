import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import SpendingPatternService from "../services/spending-pattern.service";

export const getUserSpendingPatternsController = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("🔍 getUserSpendingPatternsController - req.user:", req.user);
    console.log("🔍 getUserSpendingPatternsController - req.headers:", req.headers);
    
    const userId = req.user?._id;
    if (!userId) {
      console.log("❌ getUserSpendingPatternsController - No user ID found");
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("✅ getUserSpendingPatternsController - User ID:", userId);
    const patterns = await SpendingPatternService.getUserSpendingPatterns(userId);
    
    res.status(200).json({
      success: true,
      data: patterns,
    });
  }
);

export const analyzeSpendingPatternsController = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("🔍 analyzeSpendingPatternsController - req.user:", req.user);
    console.log("🔍 analyzeSpendingPatternsController - req.headers:", req.headers);
    
    const userId = req.user?._id;
    if (!userId) {
      console.log("❌ analyzeSpendingPatternsController - No user ID found");
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("✅ analyzeSpendingPatternsController - User ID:", userId);
    const patterns = await SpendingPatternService.analyzeUserSpendingPatterns(userId);
    
    res.status(200).json({
      success: true,
      data: patterns,
    });
  }
);

export const getTransactionStatsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const stats = await SpendingPatternService.getTransactionStats(userId);
    
    res.status(200).json({
      success: true,
      data: stats,
    });
  }
);