import { Router } from "express";
import {
  generateReportController,
  getAllReportsController,
  updateReportSettingController,
  sendReportNowController,
} from "../controllers/report.controller";
import { passportAuthenticateJwt } from "../config/passport.config";

const reportRoutes = Router();

reportRoutes.get("/all", getAllReportsController);
reportRoutes.get("/generate", generateReportController);
reportRoutes.put("/update-setting", updateReportSettingController);
// Dev-only: send report immediately for the authenticated user
reportRoutes.post("/send-now", sendReportNowController);

export default reportRoutes;
