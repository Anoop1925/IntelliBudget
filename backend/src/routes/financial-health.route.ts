import express from "express";
import {
  generateFinancialHealthAssessmentController,
  generateCustomFinancialHealthAssessmentController,
  getLatestFinancialHealthController,
  getFinancialHealthHistoryController,
  deleteFinancialHealthAssessmentController
} from "../controllers/financial-health.controller";

const router = express.Router();

// Generate new financial health assessment
router.post("/generate", generateFinancialHealthAssessmentController);

// Generate custom financial health assessment
router.post("/generate-custom", generateCustomFinancialHealthAssessmentController);

// Get latest assessment for the user
router.get("/latest", getLatestFinancialHealthController);

// Get assessment history with pagination
router.get("/history", getFinancialHealthHistoryController);

// Delete specific assessment (placeholder for future implementation)
router.delete("/:assessmentId", deleteFinancialHealthAssessmentController);

export default router;
