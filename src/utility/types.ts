import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { AlertColor } from "@mui/material";

export type UserRole = 'Banker' | 'Applicant';

export type STATUS = "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";
export interface HeaderProps {
  setUser: Dispatch<SetStateAction<{role: UserRole | string }>>;
}
export interface ActionBarType {
  value: string;
  tabs: {name: string; value: string}[];
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export interface InstaLoanCardType {
  image: string;
  heading: string;
  subheading: string;
  buttonText: string;
  handleApplyLoan: Dispatch<SetStateAction<boolean>>;
}

export interface LoadWidgetSummaryType {
  title: string;
  total: number;
}

export interface LoanApplicationType {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  setAlertContent: Dispatch<SetStateAction<AlertContentType>>;
  loading: boolean;
  requestLoan: (payload: Partial<LoanRequestType>) => {};
  fetchLoanList: () => void;
}

export interface LoanApplicationFormType {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  form: UseFormReturn<FormInputTypes>;
  calculatedLoanSummary: LoanSummaryType;
  loading: boolean;
}
export interface FormInputTypes {
  amount: number;
  currency: string;
  startDate: Date | null;
  endDate: Date | null;
  loanType: string;
  intrestRate: number;
}

export interface LoanSummaryType {
  totalAmount: number;
  totalInterest: number;
  principal: number;
  intrestRate: number;
  tenure: string | number;
}

export interface LoanRequestType extends FormInputTypes, LoanSummaryType {
  id?: string;
  paymentMade: number;
  status: STATUS;
}

export interface AlertDialogType {
  title: string;
  body: string;
  okButtonText: string;
  closeButtonText: string;
  handleClose: () => void;
  handleConfirm: () => void;
  open: boolean;
  loading?:boolean;
}

export interface AlertContentType {
  type: AlertColor;
  message: string;
  visible: boolean;
}

export interface DashboardPropsType {
  requestLoan: (payload: Partial<LoanRequestType>) => {};
  loading: boolean;
  fetchLoanList: () => void;
  loanList: LoanRequestType[];
  setAlertContent: Dispatch<SetStateAction<AlertContentType>>;
}

export interface ManageLoansPropsType {
  loading: boolean;
  fetchLoanList: () => void;
  loanList: LoanRequestType[];
  updateLoan: (payload: LoanRequestType) => {};
  setAlertContent: Dispatch<SetStateAction<AlertContentType>>;
}

export interface PartialPaymentType {
  open:boolean;
  onClose: () => void;
  onSubmit: (param: { payment: number | string}) => void;
  selectedLoan: LoanRequestType | null;
  loading: boolean;
  form: UseFormReturn<any>
}

export interface LoanSummaryDialogType {
  showLoanSummary: boolean;
  setShowLoanSummary: Dispatch<SetStateAction<boolean>>;
  selectedLoan: LoanRequestType | null;
}

export interface LoanSettlementDialogType {
  open: boolean;
  onClose: () => void;
  handleFullPaymentSubmit: () => void;
  selectedLoan: LoanRequestType | null;
  loading: boolean;
}

export interface HomeComponentType {
  setUser: Dispatch<SetStateAction<{role: UserRole | string }>>;
}