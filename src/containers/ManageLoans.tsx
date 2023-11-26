import { useState } from "react";
import { Typography, Stack, Button, IconButton, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ManageLoansPropsType, LoanRequestType } from "../utility/types";
import { manageLoanTableCols as columns } from "../utility";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import PartialPayment from "../components/PartialPayment";
import LoanSummaryDialog from "../components/LoanSummaryDialog";
import LoanSettlementDialog from "../components/LoanSettlementDialog";
import { useStyles } from '../theme/index';
const ManageLoans = ({
  loanList = [],
  madePartialPayment,
  setAlertContent,
  fetchLoanList,
  loading,
  madeFullPayment,
}: ManageLoansPropsType) => {
  const [showLoanSummary, setShowLoanSummary] = useState(false);
  const [showPartialPayment, setShowPartialPayment] = useState(false);
  const [showFullPayment, setShowFullPayment] = useState(false);

  const [selectedLoan, setSelectedLoan] = useState<LoanRequestType | null>(
    null
  );

  const { classes } = useStyles();

  const handlePartialPaymentSubmit = async ({
    payment,
  }: {
    payment: number | string;
  }) => {
    if (!selectedLoan) {
      return;
    }
    const payload = {
      ...selectedLoan,
      paymentMade: selectedLoan.paymentMade + Number(payment),
    };
    const success = await madePartialPayment(payload as LoanRequestType);

    fetchLoanList();
    setShowPartialPayment(false);
    setSelectedLoan(null);
    success
      ? setAlertContent({
          type: "success",
          message: "Your loan payment is submitted successfull.",
          visible: true,
        })
      : setAlertContent({
          type: "error",
          message: "Something went wrong, please try again.",
          visible: true,
        });
  };

  const handleFullPaymentSubmit = async () => {
    if (!selectedLoan) {
      return;
    }
    const payload = {
      ...selectedLoan,
      paymentMade: selectedLoan.totalAmount,
      status: "CLOSED",
    };
    const success = await madePartialPayment(payload as LoanRequestType);

    fetchLoanList();
    setShowFullPayment(false);
    setSelectedLoan(null);
    success
      ? setAlertContent({
          type: "success",
          message: "Your loan payment is fully paid.",
          visible: true,
        })
      : setAlertContent({
          type: "error",
          message: "Something went wrong, please try again.",
          visible: true,
        });
  };

  const handlePartialPaymentClose = () => {
    setShowPartialPayment(false);
    setSelectedLoan(null);
  };

  const handleFullPaymentClose = () => {
    setShowFullPayment(false);
    setSelectedLoan(null);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    sortable: false,
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 400,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <Stack direction="row" spacing={2}>
          <IconButton
            aria-label="view loan details"
            onClick={() => {
              setSelectedLoan({ ...row });
              setShowLoanSummary(true);
            }}
          >
            <VisibilityIcon color="primary" />
          </IconButton>
          <Button
            disabled={row.status !== "APPROVED"}
            variant="outlined"
            startIcon={<PaymentIcon />}
            size="small"
            onClick={() => {
              setShowPartialPayment(true);
              setSelectedLoan({ ...row });
            }}
          >
            Partial Payment
          </Button>
          <Button
            disabled={row.status !== "APPROVED"}
            variant="outlined"
            size="small"
            onClick={() => {
              setSelectedLoan({ ...row });
              setShowFullPayment(true);
            }}
            startIcon={<CreditScoreIcon />}
          >
            Full Payment
          </Button>
        </Stack>
      );
    },
  };

  return (
    <Box sx={{ mt: "16px" }}>
      <Typography variant="h6">Manage Loans</Typography>
      <Typography>
        Effortlessly track and manage all your loans in one place with the
        'Manage Loan' tab. View loan details, check statuses, and choose between
        full or partial payments for ultimate financial control.
      </Typography>
      <DataGrid
        autoHeight
        sx={{
          height: "100%",
          overflowX: "scroll",
          mt: "8px"
        }}
        className={classes.dataGrid}
        rows={loanList}
        columns={[...columns, { ...actionColumn }]}
        rowSelection={false}
        disableColumnMenu
        disableColumnSelector
      />
      <PartialPayment
        open={showPartialPayment}
        selectedLoan={selectedLoan}
        onClose={handlePartialPaymentClose}
        loading={loading}
        onSubmit={handlePartialPaymentSubmit}
      />
      <LoanSummaryDialog
        showLoanSummary={showLoanSummary}
        setShowLoanSummary={setShowLoanSummary}
        selectedLoan={selectedLoan}
      />
      <LoanSettlementDialog
        open={showFullPayment}
        onClose={handleFullPaymentClose}
        selectedLoan={selectedLoan}
        handleFullPaymentSubmit={handleFullPaymentSubmit}
        loading={loading}
      />
    </Box>
  );
};

export default ManageLoans;
