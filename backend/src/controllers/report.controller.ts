import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import { HTTPSTATUS } from "../config/http.config";
import {
  generateReportService,
  getAllReportsService,
  updateReportSettingService,
} from "../services/report.service";
import { updateReportSettingSchema } from "../validators/report.validator";
import ReportModel, { ReportStatusEnum } from "../models/report.model";
import { sendReportEmail } from "../mailers/report.mailer";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

export const getAllReportsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 20,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const result = await getAllReportsService(userId, pagination);

    return res.status(HTTPSTATUS.OK).json({
      message: "Reports history fetched successfully",
      ...result,
    });
  }
);

export const updateReportSettingController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = updateReportSettingSchema.parse(req.body);

    await updateReportSettingService(userId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Reports setting updated successfully",
    });
  }
);

export const generateReportController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { from, to } = req.query;
    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const result = await generateReportService(userId, fromDate, toDate);

    if (!result) {
      const periodLabel = `${fromDate.toLocaleString('en-US', { month: 'long' })} ${fromDate.getDate()} - ${toDate.getDate()}, ${toDate.getFullYear()}`;
      return res.status(HTTPSTATUS.OK).json({
        message: "No transactions found for the selected period",
        period: periodLabel,
        summary: {
          income: 0,
          expenses: 0,
          balance: 0,
          savingsRate: 0,
          topCategories: [],
        },
        insights: [],
        empty: true,
      });
    }

    return res.status(HTTPSTATUS.OK).json({
      message: "Report generated successfully",
      ...result,
    });
  }
);

export const sendReportNowController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as any;
    const userId = user?._id;

    // Accept from/to via body or query; default to last month if not provided
    const rawFrom = (req.body?.from || req.query?.from) as string | undefined;
    const rawTo = (req.body?.to || req.query?.to) as string | undefined;

    const now = new Date();
    const defaultFrom = startOfMonth(subMonths(now, 1));
    const defaultTo = endOfMonth(subMonths(now, 1));

    const fromDate = rawFrom ? new Date(rawFrom) : defaultFrom;
    const toDate = rawTo ? new Date(rawTo) : defaultTo;

    const report = await generateReportService(userId, fromDate, toDate);

    const createdAt = new Date();
    let status: ReportStatusEnum;

    if (!report) {
      status = ReportStatusEnum.NO_ACTIVITY;
      await ReportModel.create({
        userId,
        sentDate: createdAt,
        period: `${fromDate.toLocaleString('en-US', { month: 'long' })} ${fromDate.getDate()}–${toDate.getDate()}, ${toDate.getFullYear()}`,
        status,
      });

      return res.status(HTTPSTATUS.OK).json({
        message: "No transactions found for the selected period. Nothing to send.",
        status,
      });
    }

    let emailId: string | undefined;
    try {
      const sendResult = await sendReportEmail({
        email: user.email,
        username: user.name,
        report: {
          period: report.period,
          totalIncome: report.summary.income,
          totalExpenses: report.summary.expenses,
          availableBalance: report.summary.balance,
          savingsRate: report.summary.savingsRate,
          topSpendingCategories: report.summary.topCategories,
          insights: report.insights,
        },
        frequency: "One-off",
      });
      // Resend returns an object with data.id when accepted
      // If the provider didn't return an id, treat as failed
      // @ts-ignore - allow unknown structure from provider
      emailId = sendResult?.data?.id;
      status = emailId ? ReportStatusEnum.SENT : ReportStatusEnum.FAILED;
    } catch (error) {
      status = ReportStatusEnum.FAILED;
    }

    await ReportModel.create({
      userId,
      sentDate: createdAt,
      period: report.period,
      status,
    });

    return res.status(HTTPSTATUS.OK).json({
      message:
        status === ReportStatusEnum.SENT
          ? "Report emailed successfully"
          : "Report generated but email failed",
      status,
      emailId,
    });
  }
);
