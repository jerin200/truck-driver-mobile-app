import { createContext, useContext, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { Snackbar, SnackbarType } from "../components/ui/snackbar";

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    type?: SnackbarType,
    duration?: number,
    actionLabel?: string,
    onAction?: () => void
  ) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
    type: SnackbarType;
    duration?: number;
    actionLabel?: string;
    onAction?: () => void;
  } | null>(null);

  const showSnackbar = (
    message: string,
    type: SnackbarType = "info",
    duration: number = 3000,
    actionLabel?: string,
    onAction?: () => void
  ) => {
    setSnackbar({
      visible: true,
      message,
      type,
      duration,
      actionLabel,
      onAction,
    });
  };

  const hideSnackbar = () => {
    setSnackbar(null);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      {snackbar &&
        createPortal(
          <Snackbar
            message={snackbar.message}
            type={snackbar.type}
            duration={snackbar.duration}
            actionLabel={snackbar.actionLabel}
            onAction={snackbar.onAction}
            visible={snackbar.visible}
            onDismiss={hideSnackbar}
          />,
          document.body
        )}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}