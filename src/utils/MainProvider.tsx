"use client";
import Store, { persistor } from "@/Redux/Store";
import React, { ReactNode, ErrorInfo } from "react";
import { Provider } from "react-redux";
import { unstable_batchedUpdates } from "react-dom";
import { PersistGate } from "redux-persist/integration/react";


interface MainProviderProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

unstable_batchedUpdates(() => {
  console.error = () => { };
  console.warn = () => { };
});

class ErrorBoundary extends React.Component<MainProviderProps, ErrorBoundaryState> {
  constructor(props: MainProviderProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error.message.includes("ToastContainer")) {
      return;
    }
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <></>
    }

    return this.props.children;
  }
}

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default MainProvider;
