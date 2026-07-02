import { useState } from "react";
import {
  ChevronDown,
  MapPin,
  ArrowRight,
  Building2,
  Box,
  Truck,
  Container,
  UserCircle,
  AlertTriangle,
  Phone,
  Mail,
  Calendar,
  Plus,
  Ruler,
  Weight,
  Settings2,
  Edit,
  Check,
  X,
  Scale,
  Download,
  Eye,
  FileText,
} from "lucide-react";
import ReportIncidentDrawer from "./ReportIncidentDrawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useIsMobile } from "./ui/use-mobile";
import { InlineUnitSelector } from "./InlineUnitSelector";

interface TripInfoTabProps {
  permit: any;
  routeDetails: any;
  load: any;
  driverDetails: any;
  truck: any;
  trailer: any;
}

// Dimension data interface
interface DimensionData {
  overallLength: { ft: number; in: number };
  overallWidth: { ft: number; in: number };
  overallHeight: { ft: number; in: number };
  trailerLength: { ft: number; in: number };
  loadLength: { ft: number; in: number };
  frontOverhang: { ft: number; in: number };
  rearOverhang: { ft: number; in: number };
  effectiveFrontOverhang: { ft: number; in: number } | null;
  effectiveRearOverhang: { ft: number; in: number } | null;
  loadPositionAdjustment: number; // in inches, positive = forward, negative = backward
}

// Axle configuration types
type AxleConfigType =
  | "single-steer-tandem"
  | "single-steer-tandem-push"
  | "single-steer-triaxle"
  | "tandem-steer-tandem"
  | "tandem-steer-tandem-push"
  | "tandem-steer-triaxle";

// Axle weights data
interface AxleWeightsData {
  steer: number; // lbs
  drive: number; // lbs
  jeep?: number; // lbs
  booster?: number; // lbs
  trailer?: number; // lbs
  gvw: number; // lbs
}

// Truck dimensions
interface TruckDimensions {
  length: { ft: number; in: number };
  axleWidth: { ft: number; in: number };
}

/* ── Collapsible section ─────────────────────────────── */
function Section({
  icon: Icon,
  title,
  subtitle,
  defaultOpen = false,
  children,
  count,
  actions,
}: {
  icon: any;
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  count?: number;
  actions?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="w-full flex items-center gap-2.5 px-4 py-3">
        <button
          type="button"
          className="flex-1 flex items-center gap-2.5 active:bg-gray-50 transition-colors -mx-4 -my-3 px-4 py-3"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <span className="text-sm text-gray-900 block truncate">
              {title}
            </span>
            {subtitle && (
              <span className="text-[10px] text-gray-400 block mt-0.5">
                {subtitle}
              </span>
            )}
          </div>
          {count !== undefined && (
            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full tabular-nums shrink-0">
              {count}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {actions && (
          <div className="shrink-0">
            {actions}
          </div>
        )}
      </div>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100 animate-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Inner sub-section (for vehicle deep specs) ──────── */
function SubSection({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center gap-2 px-3 py-2.5 active:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {icon && (
          <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <span className="text-xs text-gray-700 flex-1 text-left">
          {title}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-3 pb-3 pt-1 border-t border-gray-50">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Compact row ─────────────────────────────────────── */
function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400 shrink-0">
        {label}
      </span>
      <span className="text-sm text-gray-900 text-right break-words min-w-0">
        {value}
      </span>
    </div>
  );
}

/* ── Grid cell for dimensions / specs ────────────────── */
function DimCell({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg px-2.5 py-2">
      <p className="text-[10px] uppercase tracking-wider text-[#717c8c]">
        {label}
      </p>
      <p className="text-sm text-gray-900 tabular-nums mt-0.5">
        {value}
      </p>
    </div>
  );
}

/* ── Dimension input with Feet + Inches ────────────── */
function DimensionInput({
  label,
  feet,
  inches,
  onFeetChange,
  onInchesChange,
  optional = false,
  lengthUnit,
}: {
  label: string;
  feet: number;
  inches: number;
  onFeetChange: (value: number) => void;
  onInchesChange: (value: number) => void;
  optional?: boolean;
  lengthUnit: 'ft' | 'm';
}) {
  const [feetError, setFeetError] = useState<string | null>(
    null,
  );
  const [inchesError, setInchesError] = useState<string | null>(
    null,
  );

  // Convert to meters if metric
  const totalInches = feet * 12 + inches;
  const meters = (totalInches * 0.0254).toFixed(2);

  const handleFeetChange = (value: string) => {
    // Only allow whole numbers
    if (value === "") {
      onFeetChange(0);
      setFeetError(null);
      return;
    }

    const num = parseInt(value);
    if (isNaN(num) || num < 0) {
      setFeetError("Must be a positive whole number");
      return;
    }

    if (!Number.isInteger(parseFloat(value))) {
      setFeetError("Feet must be a whole number");
      return;
    }

    setFeetError(null);
    onFeetChange(num);
  };

  const handleInchesChange = (value: string) => {
    if (value === "") {
      onInchesChange(0);
      setInchesError(null);
      return;
    }

    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
      setInchesError("Must be a positive number");
      return;
    }

    if (num >= 12) {
      setInchesError("Inches must be less than 12");
      return;
    }

    // Allow only 2 decimal places
    const decimal = value.split(".")[1];
    if (decimal && decimal.length > 2) {
      setInchesError("Maximum 2 decimal places");
      return;
    }

    setInchesError(null);
    onInchesChange(num);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs text-gray-700">
        {label}{" "}
        {optional && (
          <span className="text-gray-400">(Optional)</span>
        )}
      </Label>
      {lengthUnit === 'ft' ? (
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="relative">
              <Input
                type="number"
                value={feet || ""}
                onChange={(e) =>
                  handleFeetChange(e.target.value)
                }
                placeholder="0"
                className={`pr-8 ${feetError ? "border-red-500" : ""}`}
                step="1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                ft
              </span>
            </div>
            {feetError && (
              <p className="text-[10px] text-red-500 mt-1">
                {feetError}
              </p>
            )}
          </div>
          <div className="flex-1">
            <div className="relative">
              <Input
                type="number"
                value={inches || ""}
                onChange={(e) =>
                  handleInchesChange(e.target.value)
                }
                placeholder="0"
                className={`pr-8 ${inchesError ? "border-red-500" : ""}`}
                step="0.01"
                max="11.99"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                in
              </span>
            </div>
            {inchesError && (
              <p className="text-[10px] text-red-500 mt-1">
                {inchesError}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <Input
            type="number"
            value={meters}
            onChange={(e) => {
              // Convert meters back to feet and inches
              const m = parseFloat(e.target.value);
              if (!isNaN(m)) {
                const totalInches = m / 0.0254;
                const ft = Math.floor(totalInches / 12);
                const inch = totalInches % 12;
                onFeetChange(ft);
                onInchesChange(parseFloat(inch.toFixed(2)));
              }
            }}
            placeholder="0.00"
            step="0.01"
            className="pr-8"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            m
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Axle icon SVG ───────────────────────────────────── */
const AxleIcon = () => (
  <svg className="size-3.5" fill="none" viewBox="0 0 16 16">
    <path
      d="M5.33333 9.33333C6.80609 9.33333 8 8.13943 8 6.66667C8 5.19391 6.80609 4 5.33333 4C3.86057 4 2.66667 5.19391 2.66667 6.66667C2.66667 8.13943 3.86057 9.33333 5.33333 9.33333Z"
      stroke="#2563EB"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 2.66667V4M2 4.66667H4M2 8.66667H4M4 9.33333V12"
      stroke="#2563EB"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Format dimension for display ─────────────────────── */
function formatDimension(
  ft: number,
  inch: number,
  lengthUnit: 'ft' | 'm',
): string {
  if (lengthUnit === 'm') {
    const totalInches = ft * 12 + inch;
    const meters = (totalInches * 0.0254).toFixed(2);
    return `${meters} m`;
  }

  if (inch === 0) {
    return `${ft}'`;
  }

  // Format inches to remove trailing zeros
  const formattedInches =
    inch % 1 === 0
      ? inch.toString()
      : inch.toFixed(2).replace(/\.?0+$/, "");
  return `${ft}'${formattedInches}"`;
}

/* ── Format weight for display ─────────────────────── */
function formatWeight(
  lbs: number,
  weightUnit: 'lbs' | 'kg',
): string {
  if (weightUnit === 'kg') {
    const kg = (lbs * 0.453592).toFixed(0);
    return `${kg.toLocaleString()} kg`;
  }
  return `${lbs.toLocaleString()} lbs`;
}

/* ── Format tire size for display ─────────────────────── */
function formatTireSize(
  inches: number,
  lengthUnit: 'ft' | 'm',
): string {
  if (lengthUnit === 'm') {
    const mm = (inches * 25.4).toFixed(0);
    return `${mm} mm`;
  }
  return `${inches} in`;
}

/* ── Get axle configuration display name ─────────────────────── */
function getAxleConfigName(config: AxleConfigType): string {
  const names: Record<AxleConfigType, string> = {
    "single-steer-tandem": "Single Steer + Tandem Drive",
    "single-steer-tandem-push":
      "Single Steer + Tandem Drive with Push",
    "single-steer-triaxle": "Single Steer + Triaxle Drive",
    "tandem-steer-tandem": "Tandem Steer + Tandem Drive",
    "tandem-steer-tandem-push":
      "Tandem Steer + Tandem Drive with Push",
    "tandem-steer-triaxle": "Tandem Steer + Triaxle Drive",
  };
  return names[config];
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function TripInfoTab({
  permit,
  routeDetails,
  load,
  driverDetails,
  truck,
  trailer,
}: TripInfoTabProps) {
  const isMobile = useIsMobile();
  const [isIncidentDrawerOpen, setIsIncidentDrawerOpen] =
    useState(false);
  const [isEditingDimensions, setIsEditingDimensions] =
    useState(false);
  const [lengthUnit, setLengthUnit] = useState<'ft' | 'm'>('ft');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');

  // Axle configuration
  const [axleConfig, setAxleConfig] = useState<AxleConfigType>(
    "single-steer-tandem",
  );

  // Truck dimensions (OV-1310)
  const [truckDimensions] = useState<TruckDimensions>({
    length: { ft: 25, in: 6 },
    axleWidth: { ft: 8, in: 0 },
  });

  // Axle weights data
  const [axleWeights] = useState<AxleWeightsData>({
    steer: 12000,
    drive: 34000,
    jeep: 10000,
    booster: 16000,
    trailer: 28000,
    gvw: 100000,
  });

  // Initialize dimension data with mock values
  const [dimensions, setDimensions] = useState<DimensionData>({
    overallLength: { ft: 53, in: 0 },
    overallWidth: { ft: 8, in: 6 },
    overallHeight: { ft: 13, in: 6 },
    trailerLength: { ft: 48, in: 0 },
    loadLength: { ft: 45, in: 0 },
    frontOverhang: { ft: 5, in: 0 },
    rearOverhang: { ft: 4, in: 0 },
    effectiveFrontOverhang: null,
    effectiveRearOverhang: null,
    loadPositionAdjustment: 0,
  });

  // Store original dimensions for cancel
  const [originalDimensions, setOriginalDimensions] =
    useState<DimensionData>(dimensions);

  const handleEditClick = () => {
    setOriginalDimensions(dimensions);
    setIsEditingDimensions(true);
  };

  const handleSaveClick = () => {
    // Validate before saving
    const totalInches =
      dimensions.overallLength.ft * 12 +
      dimensions.overallLength.in;
    const trailerInches =
      dimensions.trailerLength.ft * 12 +
      dimensions.trailerLength.in;
    const frontInches =
      dimensions.frontOverhang.ft * 12 +
      dimensions.frontOverhang.in;
    const rearInches =
      dimensions.rearOverhang.ft * 12 +
      dimensions.rearOverhang.in;

    // Basic validation: Overall Length should be >= Trailer Length
    if (totalInches < trailerInches) {
      alert(
        "Overall Length must be greater than or equal to Trailer Length",
      );
      return;
    }

    // Save successful
    setIsEditingDimensions(false);
  };

  const handleCancelClick = () => {
    setDimensions(originalDimensions);
    setIsEditingDimensions(false);
  };

  const updateDimension = (
    field: keyof DimensionData,
    type: "ft" | "in",
    value: number,
  ) => {
    setDimensions((prev) => {
      const current = prev[field];
      if (current === null) {
        return {
          ...prev,
          [field]:
            type === "ft"
              ? { ft: value, in: 0 }
              : { ft: 0, in: value },
        };
      }
      return {
        ...prev,
        [field]: {
          ...(current as { ft: number; in: number }),
          [type]: value,
        },
      };
    });
  };

  return (
    <div className="space-y-4 p-4 pb-6">
      {/* Unit System Selector - Inline */}
      <InlineUnitSelector
        lengthUnit={lengthUnit}
        weightUnit={weightUnit}
        onLengthUnitChange={setLengthUnit}
        onWeightUnitChange={setWeightUnit}
      />

      {/* ──────────────────────────────────────────────────
          SUMMARY HERO CARD
          ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Route banner */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex items-center gap-2 text-white">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-sm truncate">California</span>
            <ArrowRight className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="text-sm truncate">Arizona</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Acme Logistics Corp.
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
          <div className="px-3 py-2.5 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              Start
            </p>
            <p className="text-xs text-gray-900 mt-0.5 tabular-nums">
              12/18/2024
            </p>
          </div>
          <div className="px-3 py-2.5 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              End
            </p>
            <p className="text-xs text-gray-900 mt-0.5 tabular-nums">
              12/30/2024
            </p>
          </div>
          <div className="px-3 py-2.5 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              GVW
            </p>
            <p className="text-xs text-gray-900 mt-0.5 tabular-nums">
              {formatWeight(axleWeights.gvw, weightUnit)}
            </p>
          </div>
        </div>

        {/* Driver + contact quick row */}
        <div className="px-4 py-2.5 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <UserCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-900 truncate">
              John Smith
            </p>
            <p className="text-[10px] text-gray-400">
              Driver • DL123456789
            </p>
          </div>
          <a
            href="tel:5551234567"
            className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center shrink-0 active:scale-95"
            aria-label="Call driver"
          >
            <Phone className="w-3.5 h-3.5 text-green-600" />
          </a>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────
          ROUTE & SCHEDULE (expanded) - PRIORITY 1
          ────────────────────────────────────────────────── */}
      <Section
        icon={MapPin}
        title="Route & Schedule"
        defaultOpen
      >
        <div className="space-y-0">
          <Row label="Origin" value="California" />
          <Row label="Destination" value="Arizona" />
          <Row
            label="States to Travel Through"
            value="CA, AZ, NM, TX"
          />
          <Row
            label="Start Date & Time"
            value="12/18/2024 at 08:00 (PST)"
          />
          <Row
            label="End Date & Time"
            value="12/30/2024 at 17:00 (MST)"
          />
        </div>
      </Section>

      {/* ──────────────────────────────────────────────────
          LOAD & DIMENSIONS (expanded with edit mode)
          ────────────────────────────────────────────────── */}
      <Section
        icon={Box}
        title="Load & Dimensions"
        defaultOpen
        count={7}
        actions={
          !isEditingDimensions ? (
            <button
              onClick={handleEditClick}
              className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
              aria-label="Edit dimensions"
            >
              <Edit className="w-3.5 h-3.5 text-gray-700" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancelClick}
                className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Cancel editing"
              >
                <X className="w-3.5 h-3.5 text-gray-700" />
              </button>
              <button
                onClick={handleSaveClick}
                className="w-8 h-8 rounded-lg bg-[#F89823] hover:bg-[#E08820] flex items-center justify-center transition-colors"
                aria-label="Save changes"
              >
                <Check className="w-3.5 h-3.5 text-[#1a1a1a]" />
              </button>
            </div>
          )
        }
      >
        <div className="space-y-0 mb-3">
          <Row label="Load Type" value="Standard Load" />
          <Row label="Divisible" value="No" />
          <Row label="Self-Propelled" value="No" />
          <Row
            label="Commodity Class"
            value="General Freight"
          />
          <Row label="Commodity Type" value="Standard" />
          <Row
            label="Description"
            value="Sample load description"
          />
        </div>

        {/* Dimension inputs/display */}
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
          Dimensions(Overall)
        </p>

        {isEditingDimensions ? (
          <div className="space-y-4">
            {/* Overall Dimensions */}
            <div className="bg-blue-50/30 rounded-xl p-3 space-y-3 border border-blue-100">
              <p className="text-xs text-blue-900 font-medium">
                Dimensions
              </p>
              <DimensionInput
                label="Length"
                feet={dimensions.overallLength.ft}
                inches={dimensions.overallLength.in}
                onFeetChange={(v) =>
                  updateDimension("overallLength", "ft", v)
                }
                onInchesChange={(v) =>
                  updateDimension("overallLength", "in", v)
                }
                lengthUnit={lengthUnit}
              />
              <DimensionInput
                label="Width"
                feet={dimensions.overallWidth.ft}
                inches={dimensions.overallWidth.in}
                onFeetChange={(v) =>
                  updateDimension("overallWidth", "ft", v)
                }
                onInchesChange={(v) =>
                  updateDimension("overallWidth", "in", v)
                }
                lengthUnit={lengthUnit}
              />
              <DimensionInput
                label="Height"
                feet={dimensions.overallHeight.ft}
                inches={dimensions.overallHeight.in}
                onFeetChange={(v) =>
                  updateDimension("overallHeight", "ft", v)
                }
                onInchesChange={(v) =>
                  updateDimension("overallHeight", "in", v)
                }
                lengthUnit={lengthUnit}
              />
            </div>

            {/* Trailer & Load Dimensions */}
            <div className="bg-amber-50/30 rounded-xl p-3 space-y-3 border border-amber-100">
              <p className="text-xs text-amber-900 font-medium">
                Trailer & Load
              </p>
              <DimensionInput
                label="Trailer Length"
                feet={dimensions.trailerLength.ft}
                inches={dimensions.trailerLength.in}
                onFeetChange={(v) =>
                  updateDimension("trailerLength", "ft", v)
                }
                onInchesChange={(v) =>
                  updateDimension("trailerLength", "in", v)
                }
                lengthUnit={lengthUnit}
              />
              <DimensionInput
                label="Load Length"
                feet={dimensions.loadLength.ft}
                inches={dimensions.loadLength.in}
                onFeetChange={(v) =>
                  updateDimension("loadLength", "ft", v)
                }
                onInchesChange={(v) =>
                  updateDimension("loadLength", "in", v)
                }
                lengthUnit={lengthUnit}
              />
            </div>

            {/* Overhang Dimensions */}
            <div className="bg-green-50/30 rounded-xl p-3 space-y-3 border border-green-100">
              <p className="text-xs text-green-900 font-medium">
                Overhang
              </p>
              <DimensionInput
                label="Front Overhang"
                feet={dimensions.frontOverhang.ft}
                inches={dimensions.frontOverhang.in}
                onFeetChange={(v) =>
                  updateDimension("frontOverhang", "ft", v)
                }
                onInchesChange={(v) =>
                  updateDimension("frontOverhang", "in", v)
                }
                lengthUnit={lengthUnit}
              />
              <DimensionInput
                label="Rear Overhang"
                feet={dimensions.rearOverhang.ft}
                inches={dimensions.rearOverhang.in}
                onFeetChange={(v) =>
                  updateDimension("rearOverhang", "ft", v)
                }
                onInchesChange={(v) =>
                  updateDimension("rearOverhang", "in", v)
                }
                lengthUnit={lengthUnit}
              />
              <DimensionInput
                label="Effective Front Overhang"
                feet={
                  dimensions.effectiveFrontOverhang?.ft || 0
                }
                inches={
                  dimensions.effectiveFrontOverhang?.in || 0
                }
                onFeetChange={(v) =>
                  updateDimension(
                    "effectiveFrontOverhang",
                    "ft",
                    v,
                  )
                }
                onInchesChange={(v) =>
                  updateDimension(
                    "effectiveFrontOverhang",
                    "in",
                    v,
                  )
                }
                optional
                lengthUnit={lengthUnit}
              />
              <DimensionInput
                label="Effective Rear Overhang"
                feet={dimensions.effectiveRearOverhang?.ft || 0}
                inches={
                  dimensions.effectiveRearOverhang?.in || 0
                }
                onFeetChange={(v) =>
                  updateDimension(
                    "effectiveRearOverhang",
                    "ft",
                    v,
                  )
                }
                onInchesChange={(v) =>
                  updateDimension(
                    "effectiveRearOverhang",
                    "in",
                    v,
                  )
                }
                optional
                lengthUnit={lengthUnit}
              />
            </div>

            {/* Load Position Adjustment */}
            <div className="bg-purple-50/30 rounded-xl p-3 space-y-3 border border-purple-100">
              <p className="text-xs text-purple-900 font-medium">
                Load Position
              </p>
              <div className="space-y-2">
                <Label className="text-xs text-gray-700">
                  Load Position Adjustment
                </Label>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 shrink-0">
                    Backward
                  </span>
                  <input
                    type="range"
                    min="-24"
                    max="24"
                    value={dimensions.loadPositionAdjustment}
                    onChange={(e) =>
                      setDimensions((prev) => ({
                        ...prev,
                        loadPositionAdjustment: parseInt(
                          e.target.value,
                        ),
                      }))
                    }
                    className="flex-1"
                  />
                  <span className="text-xs text-gray-500 shrink-0">
                    Forward
                  </span>
                </div>
                <p className="text-xs text-gray-600 text-center tabular-nums">
                  {dimensions.loadPositionAdjustment > 0 && "+"}
                  {dimensions.loadPositionAdjustment}"
                  {dimensions.loadPositionAdjustment === 0 &&
                    " (Centered)"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* View Mode - Display grid */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <DimCell
                label="Height"
                value={formatDimension(
                  dimensions.overallHeight.ft,
                  dimensions.overallHeight.in,
                  lengthUnit,
                )}
              />
              <DimCell
                label="Width"
                value={formatDimension(
                  dimensions.overallWidth.ft,
                  dimensions.overallWidth.in,
                  lengthUnit,
                )}
              />
              <DimCell
                label="Length"
                value={formatDimension(
                  dimensions.overallLength.ft,
                  dimensions.overallLength.in,
                  lengthUnit,
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <DimCell
                label="Trailer Length"
                value={formatDimension(
                  dimensions.trailerLength.ft,
                  dimensions.trailerLength.in,
                  lengthUnit,
                )}
              />
              <DimCell
                label="Load Length"
                value={formatDimension(
                  dimensions.loadLength.ft,
                  dimensions.loadLength.in,
                  lengthUnit,
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <DimCell
                label="Front Overhang"
                value={formatDimension(
                  dimensions.frontOverhang.ft,
                  dimensions.frontOverhang.in,
                  lengthUnit,
                )}
              />
              <DimCell
                label="Rear Overhang"
                value={formatDimension(
                  dimensions.rearOverhang.ft,
                  dimensions.rearOverhang.in,
                  lengthUnit,
                )}
              />
            </div>
            {(dimensions.effectiveFrontOverhang ||
              dimensions.effectiveRearOverhang) && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {dimensions.effectiveFrontOverhang && (
                  <DimCell
                    label="Eff. Front Overhang"
                    value={formatDimension(
                      dimensions.effectiveFrontOverhang.ft,
                      dimensions.effectiveFrontOverhang.in,
                      lengthUnit,
                    )}
                  />
                )}
                {dimensions.effectiveRearOverhang && (
                  <DimCell
                    label="Eff. Rear Overhang"
                    value={formatDimension(
                      dimensions.effectiveRearOverhang.ft,
                      dimensions.effectiveRearOverhang.in,
                      lengthUnit,
                    )}
                  />
                )}
              </div>
            )}
            {dimensions.loadPositionAdjustment !== 0 && (
              <div className="bg-purple-50 rounded-lg px-2.5 py-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                  Load Position
                </p>
                <p className="text-sm text-gray-900 tabular-nums mt-0.5">
                  {dimensions.loadPositionAdjustment > 0 && "+"}
                  {dimensions.loadPositionAdjustment}"
                  {dimensions.loadPositionAdjustment > 0
                    ? " Forward"
                    : " Backward"}
                </p>
              </div>
            )}
          </>
        )}

        {/* Weight grid */}
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 mt-4">
          Weight
        </p>
        <div className="grid grid-cols-2 gap-2">
          <DimCell
            label="Total Vehicle"
            value={formatWeight(axleWeights.gvw, weightUnit)}
          />
          <DimCell
            label="Load Weight"
            value={formatWeight(45000, weightUnit)}
          />
        </div>

        {/* Load Diagram - PRIORITY 2 */}
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 mt-4">
          Load Diagram
        </p>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FileText className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-xs text-gray-700 truncate">
                load-diagram-2024-12-18.pdf
              </span>
            </div>
            <div className="flex gap-1">
              <button
                className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="View diagram"
              >
                <Eye className="w-3.5 h-3.5 text-gray-600" />
              </button>
              <button
                className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Download diagram"
              >
                <Download className="w-3.5 h-3.5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ──────────────────────────────────────────────────
          AXLE WEIGHTS AFTER LOAD - PRIORITY 1 (NEW SECTION)
          ────────────────────────────────────────────────── */}
      <Section
        icon={Scale}
        title="Axle Weights After Load"
        defaultOpen
      >
        <div className="grid grid-cols-2 gap-2 mb-3">
          <DimCell
            label="Steer"
            value={formatWeight(axleWeights.steer, weightUnit)}
          />
          <DimCell
            label="Drive"
            value={formatWeight(axleWeights.drive, weightUnit)}
          />
        </div>

        {/* Dynamic trailer weights based on configuration */}
        {axleWeights.jeep && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            <DimCell
              label="Jeep"
              value={formatWeight(axleWeights.jeep, weightUnit)}
            />
            {axleWeights.booster && (
              <DimCell
                label="Booster"
                value={formatWeight(
                  axleWeights.booster,
                  weightUnit,
                )}
              />
            )}
          </div>
        )}

        {axleWeights.trailer && (
          <div className="grid grid-cols-1 gap-2 mb-3">
            <DimCell
              label="Trailer"
              value={formatWeight(
                axleWeights.trailer,
                weightUnit,
              )}
            />
          </div>
        )}

        {/* GVW */}
        <div className="pt-2 mt-2 border-t border-gray-100">
          <DimCell
            label="Gross Vehicle Weight (GVW)"
            value={formatWeight(axleWeights.gvw, weightUnit)}
          />
        </div>
      </Section>

      {/* ──────────────────────────────────────────────────
          COMPANY INFO (collapsed)
          ────────────────────────────────────────────────── */}
      <Section
        icon={Building2}
        title="Company Information"
        count={9}
      >
        <div className="space-y-0">
          <Row label="Company" value="Acme Logistics Corp." />
          <Row label="MC Number" value="MC-123456" />
          <Row label="US DOT" value="DOT-789012" />
          <Row label="NSC Number" value="NSC-345678" />
          <Row
            label="Phone"
            value={
              <a
                href="tel:+15125550123"
                className="text-blue-600"
              >
                +1 (512) 555-0123
              </a>
            }
          />
          <Row
            label="Email"
            value={
              <a
                href="mailto:contact@acmelogistics.com"
                className="text-blue-600"
              >
                contact@acmelogistics.com
              </a>
            }
          />
          <Row label="Requested By" value="John Smith" />
          <Row label="Created" value="December 15, 2024" />
          <Row
            label="Address"
            value="123 Main Street, Suite 100, Austin, TX 78701"
          />
        </div>
      </Section>

      {/* ──────────────────────────────────────────────────
          TRUCK DETAILS (collapsed, with sub-sections) - PRIORITY 2
          ────────────────────────────────────────────────── */}
      <Section
        icon={Truck}
        title="Truck Details"
        subtitle="Peterbilt 579 • TRK-001"
      >
        {/* General */}
        <div className="space-y-0 mb-3">
          <Row label="Unit #" value="TRK-001" />
          <Row label="License Plate" value="ABC-1234" />
          <Row label="VIN" value="1HGBH41JXMN109186" />
          <Row
            label="Year / Make / Model"
            value="2020 Peterbilt 579"
          />
          <Row label="Inspection Expiry" value="12/31/2025" />
        </div>

        {/* Truck Dimensions (OV-1310) - PRIORITY 2 */}
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
          Truck Dimensions
        </p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <DimCell
            label="Truck Length"
            value={formatDimension(
              truckDimensions.length.ft,
              truckDimensions.length.in,
              lengthUnit,
            )}
          />
          <DimCell
            label="Axle Width"
            value={formatDimension(
              truckDimensions.axleWidth.ft,
              truckDimensions.axleWidth.in,
              lengthUnit,
            )}
          />
        </div>

        {/* Axle Configuration Display - PRIORITY 2 */}
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
          Axle Configuration
        </p>
        <div className="bg-blue-50 rounded-lg px-2.5 py-2 mb-3">
          <p className="text-sm text-gray-900">
            {getAxleConfigName(axleConfig)}
          </p>
        </div>

        <div className="space-y-2">
          {/* Steer - Dynamic based on configuration */}
          <SubSection
            title={
              axleConfig.startsWith("tandem-steer")
                ? "Tandem Steer Configuration"
                : "Steer Configuration"
            }
            icon={<AxleIcon />}
          >
            <div className="space-y-0">
              <Row
                label="Type"
                value={
                  axleConfig.startsWith("tandem-steer")
                    ? "Tandem Steer"
                    : "Single Steer"
                }
              />
              <Row
                label="Axles"
                value={
                  axleConfig.startsWith("tandem-steer")
                    ? "2"
                    : "1"
                }
              />
              <Row label="Wheels / Axle" value="2" />
              <Row
                label="Tire Width"
                value={formatTireSize(10, lengthUnit)}
              />
              <Row
                label="TARE"
                value={formatWeight(12000, weightUnit)}
              />
            </div>
          </SubSection>

          {/* Drive - Dynamic based on configuration */}
          <SubSection
            title={
              axleConfig.includes("triaxle")
                ? "Triaxle Drive Configuration"
                : axleConfig.includes("push")
                  ? "Tandem Drive with Push Configuration"
                  : "Tandem Drive Configuration"
            }
            icon={<AxleIcon />}
          >
            <div className="space-y-0">
              <Row
                label="Type"
                value={
                  axleConfig.includes("triaxle")
                    ? "Triaxle Drive"
                    : axleConfig.includes("push")
                      ? "Tandem with Push Axle"
                      : "Tandem Drive"
                }
              />
              <Row
                label="Driving Axles"
                value={
                  axleConfig.includes("triaxle")
                    ? "3"
                    : axleConfig.includes("push")
                      ? "2 + 1 Push"
                      : "2"
                }
              />
              <Row label="Wheels / Drive Axle" value="4" />
              <Row
                label="Tire Size"
                value={formatTireSize(11, lengthUnit)}
              />
              <Row
                label="TARE"
                value={formatWeight(34000, weightUnit)}
              />
            </div>
          </SubSection>

          {/* Weight */}
          <SubSection
            title="Weight Details"
            icon={
              <svg
                className="size-3.5"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 13.3333H14M4 10.6667H12C12.7364 10.6667 13.3333 10.0697 13.3333 9.33333V6C13.3333 5.26362 12.7364 4.66667 12 4.66667H4C3.26362 4.66667 2.66667 5.26362 2.66667 6V9.33333C2.66667 10.0697 3.26362 10.6667 4 10.6667ZM8 7.33333V8.66667"
                  stroke="#2563EB"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            <div className="grid grid-cols-3 gap-2">
              <DimCell
                label="Tractor TARE"
                value={formatWeight(18000, weightUnit)}
              />
              <DimCell
                label="Steer Axle"
                value={formatWeight(12000, weightUnit)}
              />
              <DimCell
                label="Drive Axles"
                value={formatWeight(34000, weightUnit)}
              />
            </div>
          </SubSection>

          {/* Axle Spacing - Dynamic based on configuration */}
          <SubSection
            title="Axle Config & Spacing"
            icon={
              <svg
                className="size-3.5"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 8H14M10.6667 5.33333L13.3333 8L10.6667 10.6667M5.33333 5.33333L2.66667 8L5.33333 10.6667"
                  stroke="#2563EB"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            <p className="text-[10px] text-gray-400 italic mb-2">
              Center-to-center between axles
            </p>
            <div className="space-y-0 mb-3">
              <Row
                label="Bumper → 1st Steer"
                value={formatTireSize(120, lengthUnit)}
              />
              {axleConfig.startsWith("tandem-steer") && (
                <Row
                  label="1st Steer → 2nd Steer"
                  value={formatTireSize(54, lengthUnit)}
                />
              )}
              <Row
                label="Last Steer → 1st Drive"
                value={formatTireSize(192, lengthUnit)}
              />
              <Row
                label="1st Drive → 2nd Drive"
                value={formatTireSize(54, lengthUnit)}
              />
              {axleConfig.includes("triaxle") && (
                <Row
                  label="2nd Drive → 3rd Drive"
                  value={formatTireSize(54, lengthUnit)}
                />
              )}
              {axleConfig.includes("push") && (
                <Row
                  label="2nd Drive → Push Axle"
                  value={formatTireSize(96, lengthUnit)}
                />
              )}
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Axle Widths
            </p>
            <div className="grid grid-cols-3 gap-2">
              <DimCell
                label="Steer"
                value={formatTireSize(80, lengthUnit)}
              />
              <DimCell
                label="1st Drive"
                value={formatTireSize(96, lengthUnit)}
              />
              <DimCell
                label="2nd Drive"
                value={formatTireSize(96, lengthUnit)}
              />
            </div>
          </SubSection>
        </div>
      </Section>

      {/* ──────────────────────────────────────────────────
          TRAILER DETAILS (collapsed, with sub-sections) - PRIORITY 2
          ────────────────────────────────────────────────── */}
      <Section
        icon={Container}
        title="Trailer Details"
        subtitle="3 units"
      >
        <div className="space-y-2">
          {/* Jeep */}
          <SubSection title="Jeep — UASJT01" defaultOpen>
            <div className="space-y-0 mb-2">
              <Row
                label="License / VIN"
                value="JEP-1234 / 1FUJGHDV1CLBP3589"
              />
              <Row
                label="Year / Make / Model"
                value="2019 Fontaine Magnitude 55L"
              />
              <Row label="Axles" value="2 (4 wheels/axle)" />
            </div>

            {/* Tire Details - PRIORITY 2 */}
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Tire Specifications
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <DimCell
                label="Tire Size (Axle 1)"
                value={formatTireSize(11, lengthUnit)}
              />
              <DimCell
                label="Tire Size (Axle 2)"
                value={formatTireSize(11, lengthUnit)}
              />
              <DimCell
                label="Tire Width (Axle 1)"
                value={formatTireSize(10, lengthUnit)}
              />
              <DimCell
                label="Tire Width (Axle 2)"
                value={formatTireSize(10, lengthUnit)}
              />
            </div>

            {/* Deck Section - PRIORITY 2 */}
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Deck Section
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <DimCell
                label="Deck Height"
                value={formatTireSize(48, lengthUnit)}
              />
              <DimCell
                label="Deck Length"
                value={formatDimension(12, 0, lengthUnit)}
              />
            </div>

            <div className="space-y-0 mb-2">
              <Row
                label="Prev Unit → 1st Axle"
                value={formatTireSize(168, lengthUnit)}
              />
              <Row
                label="Last Axle → Next"
                value={formatTireSize(54, lengthUnit)}
              />
              <Row
                label="TARE"
                value={formatWeight(5000, weightUnit)}
              />
              <Row
                label="Inspection Expiry"
                value="12/31/2025"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 italic">
              Note: Unit # does not need to be unique
            </p>
          </SubSection>

          {/* Booster */}
          <SubSection title="Booster — UABST01">
            <div className="space-y-0 mb-2">
              <Row
                label="License / VIN"
                value="BST-5678 / 1XNAP40X6YN456789"
              />
              <Row
                label="Year / Make / Model"
                value="2020 Trail King TK110HDG"
              />
              <Row label="Axles" value="2 (8 wheels/axle)" />
            </div>

            {/* Tire Details - PRIORITY 2 */}
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Tire Specifications
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <DimCell
                label="Tire Size (Axle 1)"
                value={formatTireSize(12, lengthUnit)}
              />
              <DimCell
                label="Tire Size (Axle 2)"
                value={formatTireSize(12, lengthUnit)}
              />
              <DimCell
                label="Tire Width (Axle 1)"
                value={formatTireSize(11, lengthUnit)}
              />
              <DimCell
                label="Tire Width (Axle 2)"
                value={formatTireSize(11, lengthUnit)}
              />
            </div>

            {/* Deck Section - PRIORITY 2 */}
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Deck Section
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <DimCell
                label="Deck Height"
                value={formatTireSize(52, lengthUnit)}
              />
              <DimCell
                label="Deck Length"
                value={formatDimension(16, 0, lengthUnit)}
              />
            </div>

            <div className="space-y-0 mb-2">
              <Row
                label="Prev Unit → 1st Axle"
                value={formatTireSize(192, lengthUnit)}
              />
              <Row
                label="Last Axle → Next"
                value={formatTireSize(52, lengthUnit)}
              />
              <Row
                label="TARE"
                value={formatWeight(12000, weightUnit)}
              />
              <Row
                label="Inspection Expiry"
                value="06/30/2026"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 italic">
              Note: Unit # does not need to be unique
            </p>
          </SubSection>

          {/* Trailer unit */}
          <SubSection title="Trailer — TRL-001">
            <div className="space-y-0 mb-2">
              <Row
                label="License / VIN"
                value="TRL-9012 / 4KZDCO9292VS234567"
              />
              <Row
                label="Year / Make / Model"
                value="2021 Fontaine Magnitude 55 Ton"
              />
              <Row
                label="Configuration"
                value="Perimeter Trailer"
              />
              <Row label="Type" value="Flat Bed" />
            </div>

            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Deck & Pin Joint
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <DimCell label="Pin Joint" value="Yes" />
              <DimCell label="Deck Required" value="Yes" />
              <DimCell
                label="Deck Length"
                value={formatTireSize(240, lengthUnit)}
              />
              <DimCell
                label="Deck Width"
                value={formatTireSize(102, lengthUnit)}
              />
            </div>

            {/* Deck Section - PRIORITY 2 */}
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Deck Section
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <DimCell
                label="Deck Height"
                value={formatTireSize(60, lengthUnit)}
              />
              <DimCell
                label="Deck Length"
                value={formatDimension(20, 0, lengthUnit)}
              />
            </div>

            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Axles & Tires
            </p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <DimCell label="Axles" value="3" />
              <DimCell label="Wheels/Axle" value="8" />
              <DimCell
                label="Axle Spacing"
                value={formatTireSize(54, lengthUnit)}
              />
            </div>

            {/* Tire Details - PRIORITY 2 */}
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Tire Specifications (Per Axle)
            </p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <DimCell
                label="Tire Size (1)"
                value={formatTireSize(11, lengthUnit)}
              />
              <DimCell
                label="Tire Size (2)"
                value={formatTireSize(11, lengthUnit)}
              />
              <DimCell
                label="Tire Size (3)"
                value={formatTireSize(11, lengthUnit)}
              />
              <DimCell
                label="Tire Width (1)"
                value={formatTireSize(10, lengthUnit)}
              />
              <DimCell
                label="Tire Width (2)"
                value={formatTireSize(10, lengthUnit)}
              />
              <DimCell
                label="Tire Width (3)"
                value={formatTireSize(10, lengthUnit)}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <DimCell
                label="Axle Width (1)"
                value={formatTireSize(102, lengthUnit)}
              />
              <DimCell
                label="Axle Width (2)"
                value={formatTireSize(102, lengthUnit)}
              />
              <DimCell
                label="Axle Width (3)"
                value={formatTireSize(102, lengthUnit)}
              />
            </div>

            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Spacing & Distance
            </p>
            <div className="space-y-0 mb-3">
              <Row
                label="Prev Unit → 1st Axle"
                value={formatTireSize(192, lengthUnit)}
              />
              <Row
                label="Axle 1 → Axle 2"
                value={formatTireSize(54, lengthUnit)}
              />
              <Row
                label="Axle 2 → Axle 3"
                value={formatTireSize(54, lengthUnit)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <DimCell
                label="TARE"
                value={formatWeight(15000, weightUnit)}
              />
              <DimCell
                label="Inspection Expiry"
                value="06/30/2026"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 italic">
              Note: Unit # does not need to be unique
            </p>
          </SubSection>
        </div>
      </Section>

      {/* ──────────────────────────────────────────────────
          DRIVER (collapsed) - PRIORITY 1
          ────────────────────────────────────────────────── */}
      <Section icon={UserCircle} title="Driver Information">
        <div className="space-y-0">
          <Row label="Assigned Driver" value="John Smith" />
          <Row label="License" value="DL123456789" />
          <Row
            label="Phone"
            value={
              <a
                href="tel:5551234567"
                className="text-blue-600"
              >
                (555) 123-4567
              </a>
            }
          />
        </div>
      </Section>

      {/* ──────────────────────────────────────────────────
          REPORTED INCIDENTS
          ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-3 py-3 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm text-gray-900">
              Reported Incidents
            </span>
            <span className="text-[10px] text-gray-400 block mt-0.5">
              2 incidents
            </span>
          </div>
          <button
            onClick={() => setIsIncidentDrawerOpen(true)}
            className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center shrink-0 active:scale-95 transition-all border border-gray-200"
            aria-label="Report new incident"
          >
            <Plus className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        <div className="px-3 pb-3 space-y-2 border-t border-gray-100 pt-3">
          {/* Incident 1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <span className="text-xs text-gray-700">
                Breakdown
              </span>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-amber-50 border border-amber-200 rounded text-[9px] text-amber-700 font-medium">
                  Medium
                </span>
                <span className="text-[10px] text-gray-400">
                  2h ago
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Tire blowout on I-95 southbound near mile marker
              142. Vehicle pulled to shoulder, waiting for
              roadside assistance.
            </p>
          </div>

          {/* Incident 2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <span className="text-xs text-gray-700">
                Road Closure
              </span>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-red-50 border border-red-200 rounded text-[9px] text-red-700 font-medium">
                  High
                </span>
                <span className="text-[10px] text-gray-400">
                  5h ago
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Highway 101 closed due to accident. Rerouting
              through alternate route via Highway 280. ETA
              delayed by 45 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Report Incident Drawer */}
      <ReportIncidentDrawer
        isOpen={isIncidentDrawerOpen}
        onClose={() => setIsIncidentDrawerOpen(false)}
      />
    </div>
  );
}