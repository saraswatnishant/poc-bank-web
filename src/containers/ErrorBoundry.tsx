import React, { Component, ErrorInfo, ReactNode } from "react";
import { Typography, Box } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by error boundary:", error, errorInfo);
    this.setState({ hasError: true });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Box textAlign="center" m={3}>
          <SentimentVeryDissatisfiedIcon style={{ fontSize: 100 }} />
          <Typography variant="h5" color="error" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography>Please try again later or contact support.</Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
