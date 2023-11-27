import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./containers/Header";
import { CssBaseline } from "@mui/material";
import { theme, ThemeProvider } from "./theme";
import { Container, Box, Snackbar, Alert } from "@mui/material";
import Dashboard from "./containers/Dashboard";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageLoans from "./containers/ManageLoans";
import Home from "./containers/Home";
import useLoanHandler from "./hooks/useLoanHandler";
import { LoanRequestType, AlertContentType, UserRole } from "./utility/types";
import { UserContextProvider } from "./utility/UserContext";
import { AuthProvider } from "./components/AuthProvider";
import NoMatchFound from "./containers/NotFound";
import ErrorBoundary from "./containers/ErrorBoundry";
const alertInitialState: AlertContentType = {
  type: "warning",
  message: "",
  visible: false,
};

function App() {
  const [user, setUser] = useState<{ role: UserRole | string }>({
    role: "",
  });
  const [alertContent, setAlertContent] = useState<AlertContentType>({
    ...alertInitialState,
  });
  const [loanList, setLoanList] = useState<LoanRequestType[]>([]);
  const { fetchLoans, requestLoan, updateLoan, loading } = useLoanHandler();

  const fetchLoanList = useCallback(async () => {
    const result = await fetchLoans();
    setLoanList(result);
  }, [fetchLoans]);

  useEffect(() => {
    fetchLoanList();
  }, [fetchLoanList]);

  return (
    <div className="App">
      <ErrorBoundary>
        <BrowserRouter basename="/">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
              <UserContextProvider value={user}>
                <AuthProvider>
                  <CssBaseline />
                  <Container maxWidth="xl" sx={{ mb: 15 }}>
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
                        <Route path="/" element={<Home setUser={setUser} />} />
                        <Route
                          path="/dashboard"
                          element={
                            <Dashboard
                              loading={loading}
                              fetchLoanList={fetchLoanList}
                              requestLoan={requestLoan}
                              loanList={loanList}
                              setAlertContent={setAlertContent}
                            />
                          }
                        />
                        <Route
                          path="/manageloans"
                          element={
                            <ManageLoans
                              fetchLoanList={fetchLoanList}
                              loading={loading}
                              loanList={loanList}
                              setAlertContent={setAlertContent}
                              updateLoan={updateLoan}
                            />
                          }
                        />
                        <Route path="*" element={<NoMatchFound />} />
                      </Routes>
                    </Box>
                  </Container>
                </AuthProvider>
              </UserContextProvider>
            </ThemeProvider>
          </LocalizationProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
