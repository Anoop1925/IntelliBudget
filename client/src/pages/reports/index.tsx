import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/page-layout";
import ScheduleReportDrawer from "./_component/schedule-report-drawer";
import ReportTable from "./_component/report-table";
import { DateRangeSelect, DateRangeType, DateRangeEnum } from "@/components/date-range-select";
import { Button } from "@/components/ui/button";
import { useGenerateReportMutation, useSendReportNowMutation } from "@/features/report/reportAPI";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart3, Send } from "lucide-react";


export default function Reports() {
  const [dateRange, setDateRange] = useState<DateRangeType | null>(null);
  const [generateReport, { isLoading }] = useGenerateReportMutation();
  const [sendReportNow, { isLoading: isSending }] = useSendReportNowMutation();
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<any | null>(null);

  const { fromISO, toISO, disabled } = useMemo(() => {
    const from = dateRange?.from?.toISOString();
    const to = dateRange?.to?.toISOString();
    return {
      fromISO: from,
      toISO: to,
      disabled: !from || !to,
    };
  }, [dateRange]);

  const handleGenerate = () => {
    if (disabled || !fromISO || !toISO) {
      toast.error("Please select a valid date range");
      return;
    }
    generateReport({ from: fromISO, to: toISO })
      .unwrap()
      .then((res) => {
        setReport(res);
        setOpen(true);
        toast.success(`Report generated ${res.period}`);
      })
      .catch((err) => {
        const msg = err?.data?.message || "Failed to generate report";
        toast.error(msg);
      });
  };

  const handleSendNow = () => {
    if (disabled || !fromISO || !toISO) {
      toast.error("Please select a valid date range");
      return;
    }
    sendReportNow({ from: fromISO, to: toISO })
      .unwrap()
      .then((res) => {
        toast.success(res.message || `Send report: ${res.status}`);
      })
      .catch((err) => {
        const msg = err?.data?.message || "Failed to send report";
        toast.error(msg);
      });
  };

  return (
    <PageLayout
      title="Report History"
      subtitle="View and manage your financial reports"
      addMarginTop
      rightAction={
        <div className="flex items-center gap-2">
          <DateRangeSelect
            dateRange={dateRange}
            setDateRange={setDateRange}
            defaultRange={DateRangeEnum.LAST_MONTH}
          />
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              "Generating..."
            ) : (
              <span className="inline-flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Generate Report
              </span>
            )}
          </Button>
          <Button variant="secondary" onClick={handleSendNow} disabled={isSending}>
            {isSending ? (
              "Sending..."
            ) : (
              <span className="inline-flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Report
              </span>
            )}
          </Button>
          <ScheduleReportDrawer />
        </div>
      }
    >
        <Card className="border shadow-none">
          <CardContent>
           <ReportTable />
          </CardContent>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report {report?.period}</DialogTitle>
            </DialogHeader>
            {report ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Income</div>
                    <div className="text-xl font-semibold">
                      {typeof report.summary.income === "number"
                        ? `$${report.summary.income.toFixed(2)}`
                        : report.summary.income}
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Expenses</div>
                    <div className="text-xl font-semibold">
                      {typeof report.summary.expenses === "number"
                        ? `$${report.summary.expenses.toFixed(2)}`
                        : report.summary.expenses}
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Balance</div>
                    <div className="text-xl font-semibold">
                      {typeof report.summary.balance === "number"
                        ? `$${report.summary.balance.toFixed(2)}`
                        : report.summary.balance}
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Savings Rate</div>
                    <div className="text-xl font-semibold">{report.summary.savingsRate}%</div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="font-medium mb-2">Top Spending Categories</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {report.summary.topCategories?.map((c: any, idx: number) => (
                      <li key={`${c.name}-${idx}`}>
                        {c.name}: {typeof c.amount === "number" ? `$${c.amount}` : c.amount} ({c.percent}%)
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <div className="font-medium mb-2">Insights</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.isArray(report.insights) && report.insights.length > 0 ? (
                      report.insights.map((ins: any, idx: number) => (
                        <li key={`insight-${idx}`}>{typeof ins === "string" ? ins : JSON.stringify(ins)}</li>
                      ))
                    ) : (
                      <li key="insight-empty">No insights available</li>
                    )}
                  </ul>
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
    </PageLayout>
  );
}
