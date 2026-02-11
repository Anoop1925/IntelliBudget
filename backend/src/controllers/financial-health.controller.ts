import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import { HTTPSTATUS } from "../config/http.config";
import FinancialHealthService from "../services/financial-health.service";

export const generateFinancialHealthAssessmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated"
      });
    }

    console.log("🔍 generateFinancialHealthAssessmentController - User ID:", userId);
    
    const assessment = await FinancialHealthService.generateFinancialHealthAssessment(userId);
    
    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Financial health assessment generated successfully",
      data: assessment
    });
  }
);

export const generateCustomFinancialHealthAssessmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const { customInput } = req.body;
    
    if (!customInput) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        message: "Custom input data is required"
      });
    }

    console.log("🔍 generateCustomFinancialHealthAssessmentController - User ID:", userId);
    
    const assessment = await FinancialHealthService.generateCustomFinancialHealthAssessment(userId, customInput);
    
    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Custom financial health assessment generated successfully",
      data: assessment
    });
  }
);

export const getLatestFinancialHealthController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const assessment = await FinancialHealthService.getLatestAssessment(userId);
    
    if (!assessment) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        message: "No financial health assessment found"
      });
    }
    
    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Latest financial health assessment retrieved successfully",
      data: assessment
    });
  }
);

export const getFinancialHealthHistoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const pageLimit = parseInt(limit as string) || 10;
    
    const result = await FinancialHealthService.getAssessmentHistory(
      userId, 
      pageNumber, 
      pageLimit
    );
    
    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Financial health assessment history retrieved successfully",
      data: result.assessments,
      pagination: result.pagination
    });
  }
);

export const deleteFinancialHealthAssessmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { assessmentId } = req.params;
    
    if (!userId) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (!assessmentId) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        message: "Assessment ID is required"
      });
    }

    // Note: This would require adding a delete method to the service
    // For now, we'll return a not implemented response
    return res.status(HTTPSTATUS.NOT_IMPLEMENTED).json({
      success: false,
      message: "Delete functionality not implemented yet"
    });
  }
);
