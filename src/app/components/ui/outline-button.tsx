import * as React from "react";

export interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "blue";
  children: React.ReactNode;
}

const OutlineButton = React.forwardRef<HTMLButtonElement, OutlineButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    // Build className string manually
    const baseClasses = "flex items-center justify-center gap-2 rounded-lg px-4 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    const variantClasses = variant === "blue" 
      ? "bg-white border-2 border-[#2383f8] hover:bg-blue-50"
      : "bg-gray-50 border-2 border-[#d1d5db] hover:bg-gray-100";
    const finalClassName = `${baseClasses} ${variantClasses} ${className || ""}`.trim();
    
    return (
      <button
        ref={ref}
        className={finalClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

OutlineButton.displayName = "OutlineButton";

export { OutlineButton };