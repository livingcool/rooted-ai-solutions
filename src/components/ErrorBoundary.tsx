import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", background: "#fee2e2", color: "#991b1b", border: "2px solid #991b1b", margin: "2rem", borderRadius: "12px", fontFamily: "sans-serif" }}>
          <h2 style={{ marginTop: 0 }}>Something went wrong.</h2>
          <pre style={{ whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.05)", padding: "1rem", borderRadius: "8px" }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: "0.5rem 1rem", background: "#991b1b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
