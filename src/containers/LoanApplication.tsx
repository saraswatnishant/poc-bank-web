import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoanApplicationForm from "../components/LoanApplicationForm";
import {
  FormInputTypes,
  LoanApplicationType,
  LoanSummaryType,
} from "../utility/types";
import { calculateLoan, prepareLoanRequestPayload } from "../utility";
import AlertDialog from "../components/AlertDialog";
const loanSummaryInitialState = {
  totalAmount: 0,
  totalInterest: 0,
  principal: 0,
  intrestRate: 8,
  tenure: 0,
};
const LoanApplication = ({
  open,
  handleClose,
  setAlertContent,
  requestLoan,
  fetchLoanList,
  loading,
}: LoanApplicationType) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [calculatedLoanSummary, setCalculatedLoanSummary] =
    useState<LoanSummaryType>({ ...loanSummaryInitialState });

  const form = useForm<FormInputTypes>({
    mode: "all",
    defaultValues: {
      intrestRate: 8,
      startDate: null,
      endDate: null,
      amount: undefined,
      loanType: "CAR",
      currency: "SGD",
    },
  });
  const {
    reset,
    watch,
    getValues,
    formState: { isValid, isDirty },
  } = form;

  const [amount, startDate, endDate] = watch([
    "amount",
    "startDate",
    "endDate",
  ]);

  useEffect(() => {
    if (isValid && isDirty) {
      const loanSummary = calculateLoan(
        amount,
        startDate as Date,
        endDate as Date,
        getValues("intrestRate")
      );
      setCalculatedLoanSummary(loanSummary);
    }
  }, [getValues, amount, startDate, endDate, isValid, isDirty]);

  const onClose = () => {
    reset();
    setCalculatedLoanSummary({ ...loanSummaryInitialState });
    handleClose(false);
  };

  const handleFormSubmit = () => {
    setShowAlertDialog(true);
  };
  const confirmSubmitHanlder = async () => {
    setShowAlertDialog(false);
    if (isValid) {
      const payload = prepareLoanRequestPayload(
        getValues(),
        calculatedLoanSummary
      );
      const result = await requestLoan(payload);
      await fetchLoanList();
      onClose();
      result
        ? setAlertContent({
            type: "success",
            message: "Your loan request is submitted successfull.",
            visible: true,
          })
        : setAlertContent({
            type: "error",
            message: "Something went wrong, please try again.",
            visible: true,
          });
    }
  };

  return (
    <>
      <LoanApplicationForm
        open={open}
        handleClose={onClose}
        handleSubmit={handleFormSubmit}
        form={form}
        calculatedLoanSummary={calculatedLoanSummary}
        loading={loading}
      />
      <AlertDialog
        open={showAlertDialog}
        title="Are you sure ?"
        body="Please confirm on clicking submit button."
        okButtonText="Confirm"
        closeButtonText="Close"
        handleClose={() => {
          setShowAlertDialog(false);
        }}
        handleConfirm={confirmSubmitHanlder}
      />
    </>
  );
};

export default LoanApplication;
