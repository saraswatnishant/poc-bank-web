import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import LoanSummary from '../LoanSummary';
import { formatLoanSummaryData } from "../../utility";
import { LoanSummaryDialogType } from '../../utility/types';

const LoanSummaryDialog = ({
    showLoanSummary,
    setShowLoanSummary,
    selectedLoan
}: LoanSummaryDialogType) => {
  return (
    <Dialog
      open={showLoanSummary}
      onClose={() => setShowLoanSummary(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          color: "primary.main",
          fontSize: "1.30rem",
          fontWeight: 700,
          boxShadow: "0px 10px 5px -10px grey",
        }}
      >
        Loan Summary
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        <LoanSummary
          showTitle={false}
          fields={formatLoanSummaryData({ ...selectedLoan })}
        />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowLoanSummary(false)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanSummaryDialog;
