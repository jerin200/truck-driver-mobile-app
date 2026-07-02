import { Minus, Plus } from "lucide-react";
import { Input } from "./input";

interface CountInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  label?: string;
}

export function CountInput({
  value,
  onChange,
  disabled = false,
  min = 1,
  max,
  label = "Count:",
}: CountInputProps) {
  const handleDecrement = () => {
    const currentValue = parseInt(value || min.toString());
    const newValue = Math.max(min, currentValue - 1);
    onChange(newValue.toString());
  };

  const handleIncrement = () => {
    const currentValue = parseInt(value || min.toString());
    const newValue = max ? Math.min(max, currentValue + 1) : currentValue + 1;
    onChange(newValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      onChange('');
      return;
    }
    
    const numValue = parseInt(inputValue);
    if (!isNaN(numValue)) {
      if (max && numValue > max) {
        onChange(max.toString());
      } else if (numValue < min) {
        onChange(min.toString());
      } else {
        onChange(numValue.toString());
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-[12px] text-gray-600 font-medium">{label}</span>}
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled}
          className="h-9 w-9 flex items-center justify-center bg-white hover:bg-gray-100 active:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-r border-gray-300"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className="h-9 w-12 text-[13px] border-0 rounded-none text-center font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
          min={min}
          max={max}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled}
          className="h-9 w-9 flex items-center justify-center bg-white hover:bg-gray-100 active:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-l border-gray-300"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
