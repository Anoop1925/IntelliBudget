import { Router } from "express";
import { generateBudgetForecastController, getLatestBudgetForecastController, getBudgetForecastHistoryController } from "../controllers/budget-forecast.controller";

const budgetForecastRoutes = Router();

budgetForecastRoutes.post("/generate", generateBudgetForecastController);
budgetForecastRoutes.get("/latest", getLatestBudgetForecastController);
budgetForecastRoutes.get("/history", getBudgetForecastHistoryController);

export default budgetForecastRoutes;


