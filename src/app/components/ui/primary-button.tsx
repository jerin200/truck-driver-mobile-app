import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: LucideIcon;
  showChevron?: boolean;
  fullWidth?: boolean;
}

export function PrimaryButton({ 
  children, 
  icon: Icon, 
  showChevron = false,
  fullWidth = false,
  className = '',
  ...props 
}: PrimaryButtonProps) {
  return (
    <button 
      className={`${fullWidth ? 'flex-1' : ''} bg-[#f89823] rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      <p className="font-medium text-[#1a1a1a] text-sm">{children}</p>
      {Icon && <Icon className="size-4 text-[#1a1a1a]" />}
      {showChevron && <ChevronRight className="size-4 text-[#1a1a1a]" />}
    </button>
  );
}
