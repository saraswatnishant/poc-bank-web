import moment, { Moment } from "moment";
import { LoanRequestType, FormInputTypes, LoanSummaryType, UserRole } from "./types";
import "moment-precise-range-plugin";
import {
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const LABELS = {
  id: "ID",
  amount: "Principal Amount",
  loanType: "Loan Type",
  paymentMade: "Paid Amount",
  currency: "Currency",
  totalAmount: "Total Payback Amount",
  totalInterest: "Total Interest",
  intrestRate: "Intrest Rate (%)",
  principal: "Principal",
  tenure: "Tenure",
  status: "Status",
  startDate: "Start Date",
  endDate: "End Date",
};

function calculateTenure(startDate: Moment, endDate: Moment) {
  const start = moment(startDate);
  const end = moment(endDate);
  const diff = start.preciseDiff(end);
  return diff;
}

export const calculateLoan = (
  amount: number,
  startDate: Date,
  endDate: Date,
  intrestRate: number
) => {
  const decimalInterestRate = intrestRate / 100;
  // Parse start and end dates
  const start = moment(new Date(startDate as Date));
  const end = moment(new Date(endDate as Date));

  const duration = end.diff(start, "years", true);

  const totalAmount = +(amount * (1 + decimalInterestRate * duration)).toFixed(
    2
  );
  const totalInterest = +(totalAmount - amount).toFixed(2);

  return {
    totalAmount,
    totalInterest,
    intrestRate,
    principal: amount,
    tenure: calculateTenure(start, end),
  };
};

export const formatLoanSummaryData = (data: Partial<LoanRequestType>) => {
  return Object.keys(data).map((key) => ({
    name: (LABELS as any)[key],
    value:
      key === "startDate" || key === "endDate"
        ? moment((data as any)[key]).format("DD/MM/YYYY")
        : (data as any)[key],
  }));
};

export const prepareLoanRequestPayload = (
  {
    amount,
    intrestRate,
    startDate,
    endDate,
    loanType,
    currency,
  }: FormInputTypes,
  { totalAmount, totalInterest, tenure }: LoanSummaryType
): Partial<LoanRequestType> => {
  return {
    amount: Number(amount),
    intrestRate,
    startDate,
    endDate,
    loanType,
    currency,
    totalAmount,
    totalInterest,
    tenure,
    status: "PENDING",
    paymentMade: 0,
  };
};

export const manageLoanTableCols: GridColDef[] = [
  {
    field: "id",
    headerName: "Loan Number",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "loanType",
    headerName: "Loan Type",
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "amount",
    headerName: "Principal Amount",
    headerAlign: "center",
    align: "center",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "paymentMade",
    headerName: "Paid Amount",
    headerAlign: "center",
    align: "center",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "intrestRate",
    headerName: "Intrest Rate",
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    flex: 1,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }
      return `${params.value.toLocaleString()}%`;
    },
  },
  {
    field: "currency",
    headerName: "Currency",
    headerAlign: "center",
    minWidth: 100,
    align: "center",
    flex: 1,
  },
  {
    field: "tenure",
    headerName: "Tenure",
    headerAlign: "center",
    align: "center",
    minWidth: 250,
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    minWidth: 120,
    flex: 1,
    renderCell: ({ value }: GridRenderCellParams) => {
      return (
        <Chip
          size="small"
          label={value}
          color={
            value === "APPROVED"
              ? "success"
              : value === "PENDING"
              ? "warning"
              : "error"
          }
        />
      );
    },
  },
];
