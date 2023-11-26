import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { LoanSettlementDialogType } from "../../utility/types";

const LoanSettlementDialog = ({
  open,
  onClose,
  handleFullPaymentSubmit,
  selectedLoan,
  loading
}: LoanSettlementDialogType) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id="alert-dialog-title">
          Full & Final Loan Settlement
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
            {selectedLoan && (
              <p>
                You are paying this muct amount:
                {selectedLoan?.totalAmount - selectedLoan?.paymentMade}
              </p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <LoadingButton variant="contained" loading={loading} onClick={handleFullPaymentSubmit} autoFocus>
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoanSettlementDialog;
