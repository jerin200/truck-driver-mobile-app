import { Calendar } from "lucide-react";

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function DatePicker({ value, onChange, placeholder = "Select date", label }: DatePickerProps) {
  return (
    <div className="relative">
      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none z-10" />
      <input
        type="date"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex h-[50px] w-full items-center rounded-[6px] border border-[#cfcdcd] bg-white pl-12 pr-[16px] py-[12px] text-[16px] font-medium text-[#0b1215] transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F89823] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}

interface TimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function TimePicker({ value, onChange, placeholder = "Select time", label }: TimePickerProps) {
  return (
    <div className="relative">
      <svg 
        className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none z-10"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <input
        type="time"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex h-[50px] w-full items-center rounded-[6px] border border-[#cfcdcd] bg-white pl-12 pr-[16px] py-[12px] text-[16px] font-medium text-[#0b1215] transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F89823] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}