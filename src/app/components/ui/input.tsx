import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full items-center rounded-[6px] border border-[#cfcdcd] bg-white px-[16px] py-[12px] text-[14px] font-medium text-[#0b1215] leading-[20px] transition-colors placeholder:text-[#717182] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };