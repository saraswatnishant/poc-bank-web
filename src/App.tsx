import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./containers/Header";
import { CssBaseline } from "@mui/material";
import { theme, ThemeProvider } from "./theme";
import { Container, Box, Snackbar, Alert } from "@mui/material";
import Dashboard from "./containers/Dashboard";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ManageLoans from "./containers/ManageLoans";
import useLoanHandler from "./hooks/useLoanHandler";
import { LoanRequestType, AlertContentType } from "./utility/types";

const alertInitialState: AlertContentType = {
  type: "warning",
  message: "",
  visible: false,
};

function App() {
  const [alertContent, setAlertContent] = useState<AlertContentType>({
    ...alertInitialState,
  });
  const [loanList, setLoanList] = useState<LoanRequestType[]>([]);
  const { fetchLoans, requestLoan, madePartialPayment, madeFullPayment,  loading } =
    useLoanHandler();

  const fetchLoanList = useCallback(async () => {
    const result = await fetchLoans();
    setLoanList(result);
  }, [fetchLoans]);

  useEffect(() => {
    fetchLoanList();
  }, [fetchLoanList]);

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <BrowserRouter basename="/">
            <CssBaseline />
            <Container maxWidth={"xl"}>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={alertContent.visible}
                autoHideDuration={6000}
                onClose={() => setAlertContent({ ...alertInitialState })}
              >
                <Alert severity={alertContent.type}>
                  {alertContent.message}
                </Alert>
              </Snackbar>
              <Header />
              <Box>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route
                    path="/dashboard"
                    element={
                      <>
                        <Dashboard
                          loading={loading}
                          fetchLoanList={fetchLoanList}
                          requestLoan={requestLoan}
                          loanList={loanList}
                          setAlertContent={setAlertContent}
                        />
                      </>
                    }
                  />
                  <Route
                    path="/manageloans"
                    element={
                      <>
                        <ManageLoans
                          fetchLoanList={fetchLoanList}
                          loading={loading}
                          loanList={loanList}
                          madePartialPayment={madePartialPayment}
                          setAlertContent={setAlertContent}
                          madeFullPayment={madeFullPayment}
                        />
                      </>
                    }
                  />
                </Routes>
              </Box>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
