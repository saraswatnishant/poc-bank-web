import { useMemo, useState } from "react";
import { Grid } from "@mui/material";
import InstaLoanCard from "../components/InstaLoan";
import LoadWidgetSummary from "../components/LoadWidgetSummary";
import LoanApplication from "./LoanApplication";
import InstanLoanImg from "../assets/instant-loan.jpg";
import { DashboardPropsType, LoanRequestType } from "../utility/types";
import withPermissionGate from "../components/AuthProvider/withPermissionGate";

const Dashboard = ({
  requestLoan,
  fetchLoanList,
  loading,
  loanList,
  setAlertContent,
}: DashboardPropsType) => {
  const [showApplyLoan, setShowApplyLoan] = useState(false);
  const loadWidgetMetrices = useMemo(() => {
    const metrices = {
      totalAmount: 0,
      totalPendingAmount: 0,
      totalActiveLoans: 0,
      totalPendingLoans: 0,
    };
    loanList.forEach(
      ({ totalAmount, paymentMade, status }: LoanRequestType) => {
        if (status === "APPROVED") {
          metrices.totalAmount += Math.round(totalAmount);
          metrices.totalPendingAmount += Math.round(totalAmount - paymentMade);
          metrices.totalActiveLoans += 1;
        }
        metrices.totalPendingLoans += status === "PENDING" ? 1 : 0;
      },
    );

    return metrices;
  }, [loanList]);
  return (
    <>
      <LoanApplication
        open={showApplyLoan}
        handleClose={setShowApplyLoan}
        setAlertContent={setAlertContent}
        requestLoan={requestLoan}
        fetchLoanList={fetchLoanList}
        loading={loading}
      />
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={4}>
          <InstaLoanCard
            heading="Instant Loan Apply"
            subheading="Access quick financial solutions with our instant loan services. Streamlined processes and competitive rates make obtaining funds hassle-free."
            buttonText="Apply Loan"
            image={InstanLoanImg}
            handleApplyLoan={setShowApplyLoan}
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={8}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          alignSelf="flex-start"
        >
          <Grid item xs={12} sm={6}>
            <LoadWidgetSummary
              title="Total Loan Amount"
              total={loadWidgetMetrices.totalAmount}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LoadWidgetSummary
              title="Total Loan Pending Amount"
              total={loadWidgetMetrices.totalPendingAmount}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LoadWidgetSummary
              title="Total Active Loans"
              total={loadWidgetMetrices.totalActiveLoans}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LoadWidgetSummary
              title="Loans Pending For Approval"
              total={loadWidgetMetrices.totalPendingLoans}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default withPermissionGate(Dashboard);
