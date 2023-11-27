import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { LoanApplicationFormType } from "../../utility/types";
import LoanSummary from "../LoanSummary";
import { useStyles } from "../../theme";
import { formatLoanSummaryData } from "../../utility";
const LoanApplicationForm = ({
  open,
  handleClose,
  handleSubmit,
  form,
  calculatedLoanSummary,
  loading = false,
}: LoanApplicationFormType) => {
  const { control, handleSubmit: onSubmit, watch } = form;
  const { classes } = useStyles();
  const startDate = watch("startDate");
  return (
    <Box mt={5}>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle
          sx={{
            textAlign: "center",
            color: "primary.main",
            fontSize: "1.30rem",
            fontWeight: 700,
            boxShadow: "0px 10px 5px -10px grey",
          }}
        >
          Loan Application Form
        </DialogTitle>
        <form onSubmit={onSubmit(handleSubmit)}>
          <DialogContent>
            <Backdrop
              open={loading}
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Loan Type</InputLabel>
                    <Controller
                      name="loanType"
                      control={control}
                      rules={{
                        required: "This field is required",
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Select
                            label="Loan Type"
                            {...field}
                            error={!!error?.message}
                          >
                            <MenuItem value="CAR">CAR</MenuItem>
                            <MenuItem value="HOME">HOME</MenuItem>
                            <MenuItem value="PERSONAL">PERSONAL</MenuItem>
                            {/* Add more loan options as needed */}
                          </Select>
                          {!!error?.message && (
                            <FormHelperText className={classes.helperText}>
                              {error?.message || ""}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="amount"
                    control={control}
                    rules={{
                      required: "This field is required",
                      validate: {
                        isNumber: (value: any) =>
                          !isNaN(value) || "Must be a number",
                        minValue: (value: any) =>
                          parseFloat(value) >= 1000 ||
                          "Must be greater than or equal to 1000",
                        maxValue: (value: any) =>
                          parseFloat(value) <= 1000000 ||
                          "Must be less than or equal to 1000000",
                      },
                    }}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <TextField
                          label="Amount"
                          variant="outlined"
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Currency</InputLabel>
                    <Controller
                      name="currency"
                      control={control}
                      rules={{
                        required: "This field is required",
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Select
                            label="Currency"
                            {...field}
                            error={!!error?.message}
                          >
                            <MenuItem value="SGD">SGD</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="GBP">GBP</MenuItem>
                            {/* Add more currency options as needed */}
                          </Select>
                          {!!error?.message && (
                            <FormHelperText className={classes.helperText}>
                              {error?.message || ""}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{
                        required: "Date is required",
                        validate: {
                          validDate: (value) => {
                            const selectedDate = new Date(value as Date);
                            const currentDate = new Date();
                            if (
                              selectedDate <= currentDate ||
                              isNaN(selectedDate.getTime())
                            ) {
                              return "Please select a valid future date";
                            }

                            return true;
                          },
                        },
                      }}
                      render={({ field, fieldState: { error } }) => {
                        return (
                          <DatePicker
                            {...field}
                            disablePast
                            label="Start Date"
                            slotProps={{
                              textField: {
                                error: !!error?.message,
                                helperText: error?.message,
                                FormHelperTextProps: {
                                  className: classes.helperText,
                                },
                              },
                            }}
                          />
                        );
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{
                        required: "End Date is required",
                        validate: {
                          validDate: (value) => {
                            const selectedDate = new Date(value as Date);
                            const currentDate = new Date();
                            if (
                              selectedDate <= currentDate ||
                              isNaN(selectedDate.getTime())
                            ) {
                              return "Please select a valid future date";
                            }

                            // Validate that end date is at least 6 months greater than start date
                            const minEndDate = new Date(startDate as Date);
                            minEndDate.setMonth(minEndDate.getMonth() + 6);

                            if (selectedDate <= minEndDate) {
                              return "End Date should be at least 6 months greater than Start Date";
                            }

                            return true;
                          },
                        },
                      }}
                      render={({ field, fieldState: { error } }) => {
                        return (
                          <DatePicker
                            {...field}
                            disablePast
                            label="End Date"
                            slotProps={{
                              textField: {
                                error: !!error?.message,
                                helperText: error?.message,
                                FormHelperTextProps: {
                                  className: classes.helperText,
                                },
                              },
                            }}
                          />
                        );
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <LoanSummary
                showTitle={true}
                title="Loan Details"
                fields={formatLoanSummaryData({ ...calculatedLoanSummary })}
              />
            </>
          </DialogContent>

          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default LoanApplicationForm;
