import { useContext, useState } from "react";
import { Typography, Stack, Button, IconButton, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  ManageLoansPropsType,
  LoanRequestType,
  STATUS,
} from "../utility/types";
import { manageLoanTableCols as columns } from "../utility";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PaymentIcon from "@mui/icons-material/Payment";
import TaskIcon from "@mui/icons-material/Task";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import PartialPayment from "../components/PartialPayment";
import LoanSummaryDialog from "../components/LoanSummaryDialog";
import LoanSettlementDialog from "../components/LoanSettlementDialog";
import AlertDialog from "../components/AlertDialog";
import { useStyles } from "../theme/index";
import withPermissionGate from "../components/AuthProvider/withPermissionGate";
import { UserContext } from "../utility/UserContext";
import { useForm } from "react-hook-form";
const ManageLoans = ({
  loanList = [],
  setAlertContent,
  fetchLoanList,
  updateLoan,
  loading,
}: ManageLoansPropsType) => {
  const form = useForm({
    mode: "all",
    defaultValues: {
      payment: "",
    },
  });

  const { reset } = form;
  const { classes } = useStyles();
  const { role } = useContext(UserContext);
  const [showLoanSummary, setShowLoanSummary] = useState(false);
  const [showLoanApprovalDialog, setShowLoanApprovalDialog] = useState(false);
  const [showPartialPayment, setShowPartialPayment] = useState(false);
  const [showFullPayment, setShowFullPayment] = useState(false);

  const [selectedLoan, setSelectedLoan] = useState<LoanRequestType | null>(
    null
  );

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
      ...(selectedLoan.totalAmount <=
        selectedLoan.paymentMade + Number(payment) && {
        status: "CLOSED",
      }),
    };
    const success = await updateLoan(payload as LoanRequestType);

    fetchLoanList();
    handlePartialPaymentClose();
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
    const success = await updateLoan(payload as LoanRequestType);

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
    reset();
    setShowPartialPayment(false);
    setSelectedLoan(null);
  };

  const handleFullPaymentClose = () => {
    setShowFullPayment(false);
    setSelectedLoan(null);
  };

  const handleLoanApprovalSubmit = async (status: STATUS) => {
    if (!selectedLoan) {
      return;
    }
    const payload = {
      ...selectedLoan,
      paymentMade: 0,
      status: status,
    };
    const success = await updateLoan(payload as LoanRequestType);

    fetchLoanList();
    setShowLoanApprovalDialog(false);
    setSelectedLoan(null);
    success
      ? setAlertContent({
          type: "success",
          message: `Loan request is ${status} successfully.`,
          visible: true,
        })
      : setAlertContent({
          type: "error",
          message: "Something went wrong, please try again.",
          visible: true,
        });
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
          {role === "Applicant" && (
            <>
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
            </>
          )}
          {role === "Banker" && (
            <Button
              disabled={row.status !== "PENDING"}
              variant="outlined"
              size="small"
              onClick={() => {
                setSelectedLoan({ ...row });
                setShowLoanApprovalDialog(true);
              }}
              startIcon={<TaskIcon />}
            >
              Approve
            </Button>
          )}
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
          mt: "8px",
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
        form={form}
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
      <AlertDialog
        open={showLoanApprovalDialog}
        title="Confirmation ?"
        body="Are you sure you want to approve this loan request?        "
        okButtonText="Approve"
        closeButtonText="Reject"
        handleClose={() => handleLoanApprovalSubmit("REJECTED")}
        handleConfirm={() => handleLoanApprovalSubmit("APPROVED")}
        loading={loading}
      />
    </Box>
  );
};

export default withPermissionGate(ManageLoans);
