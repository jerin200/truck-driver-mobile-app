import { useEffect, useState } from "react";
import { X, AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Button } from "./button";

export type SnackbarType = "info" | "warning" | "error" | "success";

export interface SnackbarProps {
  message: string;
  type?: SnackbarType;
  duration?: number; // in milliseconds, 0 = no auto-dismiss
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  visible?: boolean;
}

const snackbarStyles = {
  info: {
    container: "bg-blue-600 text-white",
    icon: "text-blue-100",
    IconComponent: Info,
  },
  warning: {
    container: "bg-amber-600 text-white",
    icon: "text-amber-100",
    IconComponent: AlertTriangle,
  },
  error: {
    container: "bg-red-600 text-white",
    icon: "text-red-100",
    IconComponent: AlertCircle,
  },
  success: {
    container: "bg-green-600 text-white",
    icon: "text-green-100",
    IconComponent: CheckCircle,
  },
};

export function Snackbar({
  message,
  type = "info",
  duration = 3000,
  actionLabel,
  onAction,
  onDismiss,
  visible = true,
}: SnackbarProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const [isAnimating, setIsAnimating] = useState(false);
  const styles = snackbarStyles[type];
  const IconComponent = styles.IconComponent;

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setIsAnimating(true);

      // Auto dismiss
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      handleDismiss();
    }
  }, [visible, duration]);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 300); // Match animation duration
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-[9999] pointer-events-none transition-all duration-300 ${
        isAnimating
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
      role="alert"
      aria-live="polite"
    >
      <div
        className={`${styles.container} pointer-events-auto rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 max-w-[420px] mx-auto`}
      >
        {/* Icon */}
        <IconComponent className={`h-5 w-5 shrink-0 ${styles.icon}`} />

        {/* Message */}
        <p className="text-sm font-medium flex-1 min-w-0">{message}</p>

        {/* Action Button */}
        {actionLabel && onAction && (
          <Button
            onClick={() => {
              onAction();
              handleDismiss();
            }}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 h-8 shrink-0"
          >
            {actionLabel}
          </Button>
        )}

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Hook for managing snackbar state
export function useSnackbar() {
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
    setSnackbar({ visible: true, message, type, duration, actionLabel, onAction });
  };

  const hideSnackbar = () => {
    setSnackbar(null);
  };

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  };
}