import { Router } from "express";
import {
  getUserSpendingPatternsController,
  analyzeSpendingPatternsController,
  getTransactionStatsController,
} from "../controllers/spending-pattern.controller";

const spendingPatternRoutes = Router();

spendingPatternRoutes.get("/", getUserSpendingPatternsController);
spendingPatternRoutes.post("/analyze", analyzeSpendingPatternsController);
spendingPatternRoutes.get("/stats", getTransactionStatsController);

export default spendingPatternRoutes;