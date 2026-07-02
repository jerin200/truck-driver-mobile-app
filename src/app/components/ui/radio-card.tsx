import * as React from "react";

interface RadioCardProps {
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
  title: string;
  description?: string;
  variant?: "orange" | "blue";
}

export function RadioCard({
  value,
  selectedValue,
  onChange,
  title,
  description,
  variant = "orange",
}: RadioCardProps) {
  const isSelected = selectedValue === value;

  const colors =
    variant === "blue"
      ? {
          selectedBg: "rgba(35,131,248,0.08)",
          selectedBorder: "#2383F8",
          selectedShadow:
            "0px 4px 5px 0px rgba(35,131,248,0.1)",
          radioStroke: "#2383F8",
          radioFill: "#2383F8",
        }
      : {
          selectedBg: "rgba(248,152,35,0.06)",
          selectedBorder: "#F89823",
          selectedShadow: "0px 4px 5px 0px rgba(248,152,35,0.1)",
          radioStroke: "#F89823",
          radioFill: "#F89823",
        };

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`relative rounded-[6px] w-full text-left transition-all ${
        isSelected ? "" : "bg-white"
      }`}
      style={{
        backgroundColor:
          isSelected
            ? colors.selectedBg
            : undefined,
        boxShadow: isSelected
          ? `0px 0px 0px 1px ${colors.selectedBorder}, ${colors.selectedShadow}`
          : "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 6px 24px 0px rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex flex-row items-center">
        <div className="flex gap-4 items-center p-4 w-full">
          {/* Radio Button */}
          <div className="relative shrink-0 size-5">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 20 20"
            >
              <circle
                cx="10"
                cy="10"
                fill="white"
                r="9"
                stroke={
                  isSelected ? colors.radioStroke : "#CFCDCD"
                }
                strokeWidth="2"
              />
              {isSelected && (
                <circle
                  cx="10"
                  cy="10"
                  fill={colors.radioFill}
                  r="5"
                />
              )}
            </svg>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 justify-center min-w-0">
            <p className="font-semibold text-[13px] text-[#0b1215] mb-0 leading-[20px]">
              {title}
            </p>
            {description && (
              <p className="font-normal text-[12px] text-[#0b1215] leading-[20px]">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}