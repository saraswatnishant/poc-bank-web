import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { LoanSettlementDialogType } from "../../utility/types";

const LoanSettlementDialog = ({
  open,
  onClose,
  handleFullPaymentSubmit,
  selectedLoan,
  loading,
}: LoanSettlementDialogType) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id="alert-dialog-title">
          Full & Final Loan Settlement
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have opted to pay the full amount of your loan towards
            settlement. Kindly click on “CONFIRM’ if you wish to proceed for
            final settlement
            {selectedLoan && (
              <Typography variant="subtitle2" sx={{ pt: 1, color: "#000000" }}>
                Balance Amount to be paid:
                {selectedLoan?.totalAmount - selectedLoan?.paymentMade}
              </Typography>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleFullPaymentSubmit}
            autoFocus
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoanSettlementDialog;
