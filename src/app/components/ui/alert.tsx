import { X, AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Button } from "./button";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

// ===========================
// SHADCN ALERT COMPONENT (Original)
// ===========================
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

// ===========================
// CUSTOM ALERT BANNER COMPONENT (Mobile UX)
// ===========================
export type AlertBannerType = "info" | "warning" | "error" | "success";

export interface AlertBannerProps {
  type?: AlertBannerType;
  title?: string;
  message: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const alertBannerStyles = {
  info: {
    container: "bg-blue-50 border-blue-200",
    icon: "text-blue-600",
    title: "text-blue-900",
    message: "text-blue-700",
    IconComponent: Info,
  },
  warning: {
    container: "bg-amber-50 border-amber-200",
    icon: "text-amber-600",
    title: "text-amber-900",
    message: "text-amber-700",
    IconComponent: AlertTriangle,
  },
  error: {
    container: "bg-red-50 border-red-200",
    icon: "text-red-600",
    title: "text-red-900",
    message: "text-red-700",
    IconComponent: AlertCircle,
  },
  success: {
    container: "bg-green-50 border-green-200",
    icon: "text-green-600",
    title: "text-green-900",
    message: "text-green-700",
    IconComponent: CheckCircle,
  },
};

export function AlertBanner({
  type = "info",
  title,
  message,
  ctaLabel,
  onCtaClick,
  dismissible = false,
  onDismiss,
  className = "",
}: AlertBannerProps) {
  const styles = alertBannerStyles[type];
  const IconComponent = styles.IconComponent;

  return (
    null
  );
}