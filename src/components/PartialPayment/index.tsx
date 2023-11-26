import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, Controller } from "react-hook-form";
import { useStyles } from "../../theme";
import { PartialPaymentType } from "../../utility/types";

const PartialPayment = ({
  open,
  selectedLoan,
  onClose,
  onSubmit,
  loading,
}: PartialPaymentType) => {
  const { classes } = useStyles();
  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      payment: "",
    },
  });
  let balanceAmount = 0;

  if (selectedLoan) {
    balanceAmount = selectedLoan?.totalAmount - selectedLoan?.paymentMade;
  }
  return (
    <>
      <Dialog open={open} onClose={() => onClose()}>
        <DialogTitle>Partial Loan Payment</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              Please enter the amount you wish to pay for your loan.
            </DialogContentText>
            <Controller
              name="payment"
              control={control}
              rules={{
                required: "This field is required",
                validate: {
                  isNumber: (value: any) => !isNaN(value) || "Must be a number",
                  minValue: (value: any) =>
                    parseFloat(value) >= 0 ||
                    "Must be greater than or equal to 1000",
                  maxValue: (value: any) =>
                    parseFloat(value) <= balanceAmount ||
                    `Must be less than or equal to loan balance amount.`,
                },
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextField
                    margin="normal"
                    label="Amount"
                    variant="standard"
                    fullWidth
                    {...field}
                    error={!!error?.message}
                    helperText={<>{error?.message || ""}</>}
                    FormHelperTextProps={{
                      className: classes.helperText,
                    }}
                  />
                );
              }}
            />
            <Typography variant="subtitle2">
              Loan Balance Amount - {balanceAmount}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onClose()}>Cancel</Button>
            <LoadingButton type="submit" loading={loading} variant="contained">Confirm</LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default PartialPayment;
