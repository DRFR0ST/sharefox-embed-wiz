import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary is a React component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole application.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        // Initialize state to track if an error has occurred
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    /**
     * This lifecycle method is invoked after an error has been thrown by a descendant component.
     * It updates the state to indicate an error has occurred.
     */
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true };
    }

    /**
     * This lifecycle method is invoked after an error has been thrown by a descendant component.
     * It can be used to log error details to an external service.
     */
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ error, errorInfo });
        // Log the error to an external service (e.g., Sentry, LogRocket)
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    /**
     * Renders the fallback UI if an error has occurred, otherwise renders the child components.
     */
    render() {
        if (this.state.hasError) {
            // Fallback UI when an error occurs
            return (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                    textAlign="center"
                    padding={2}
                >
                    <Alert sx={{width: "100%", mb: 1}} severity="error">
                    Something went wrong
                        </Alert>
                    <Accordion sx={{ width: "100%" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body1" color="textSecondary">
                                View Error Details
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ height: "300px", resize: "vertical", overflowY: "auto" }}>
                                <Typography variant="body2" color="textSecondary" paragraph>
                                    {this.state.error && this.state.error.toString()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" paragraph>
                                    {this.state.errorInfo?.componentStack}
                                </Typography>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '16px' }}
                    >
                        Reload Page
                    </Button>
                </Box>
            );
        }

        // Render children if no error has occurred
        return this.props.children;
    }
}

export default ErrorBoundary;