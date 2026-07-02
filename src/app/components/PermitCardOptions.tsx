import { useState } from "react";
import { ArrowLeft, Download, ChevronDown, ChevronUp, FileText, Calendar, DollarSign, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { formatDate } from "../utils/dateFormat";
import { useSnackbar } from "../contexts/SnackbarContext";

interface PermitCardOptionsProps {
  onBack: () => void;
  onNavigate?: (screen: string, params?: any) => void;
}

interface PermitState {
  code: string;
  name: string;
  status: "Approved" | "Pending" | "Rejected";
  permitNumber?: string;
  effectiveDate?: string;
  expiryDate?: string;
  fee?: number;
  processingFee?: number;
  totalFee?: number;
  paymentMethod?: string;
  lastFourDigits?: string;
}

// Sample permit data
const samplePermit: PermitState = {
  code: "OR",
  name: "Oregon",
  status: "Approved",
  permitNumber: "OM25081400154",
  effectiveDate: "2025-03-01",
  expiryDate: "2025-03-15",
  fee: 285.00,
  processingFee: 15.00,
  totalFee: 300.00,
  paymentMethod: "Visa",
  lastFourDigits: "4242",
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]";
    case "Pending":
      return "bg-[#fffaeb] text-[#b54708] border-[#fedf89]";
    case "Rejected":
      return "bg-[#fef3f2] text-[#b42318] border-[#fecdca]";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

// Option 1: Ultra-Compact
function UltraCompactCard({ permit }: { permit: PermitState }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-gray-100 shadow-sm overflow-hidden">
      <CardContent className="p-3">
        {/* Header - Super minimal */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
              {permit.code}
            </div>
            <Badge variant="outline" className={`text-[10px] h-5 px-1.5 ${getStatusColor(permit.status)}`}>
              {permit.status}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {/* Collapsed state - Just permit number */}
        {!isExpanded && (
          <div className="text-[10px] text-gray-500">
            #{permit.permitNumber}
          </div>
        )}

        {/* Expanded state - Everything */}
        {isExpanded && (
          <div className="space-y-3 mt-3 pt-3 border-t border-gray-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">Permit</span>
                <span className="text-gray-900 ml-auto">#{permit.permitNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">Valid</span>
                <span className="text-gray-900 ml-auto">
                  {formatDate(permit.effectiveDate!)} → {formatDate(permit.expiryDate!)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">Total</span>
                <span className="text-gray-900 ml-auto">${permit.totalFee?.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">Payment</span>
                <span className="text-gray-900 ml-auto">
                  {permit.paymentMethod} ••{permit.lastFourDigits}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full h-8 text-xs">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Option 2: Balanced Compact (Current Design)
function BalancedCompactCard({ permit }: { permit: PermitState }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-gray-100 shadow-sm overflow-hidden">
      <CardContent className="p-3">
        {/* Header with key info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 flex-1">
            <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
              {permit.code}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-sm font-medium text-gray-900">{permit.name}</span>
                <Badge variant="outline" className={`text-[10px] h-5 px-1.5 ${getStatusColor(permit.status)}`}>
                  {permit.status}
                </Badge>
              </div>
              <div className="text-[10px] text-gray-500 flex items-center gap-1.5">
                <span>#{permit.permitNumber}</span>
                <span>•</span>
                <span>Valid 14 days</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 ml-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {/* Inline summary */}
        <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-gray-100">
          <span className="text-gray-500">
            {formatDate(permit.effectiveDate!).split(',')[0]} → {formatDate(permit.expiryDate!).split(',')[0]}
          </span>
          <span className="text-gray-900 font-medium">${permit.totalFee?.toFixed(2)}</span>
        </div>

        {/* Expanded details */}
        {isExpanded && (
          <div className="space-y-3 mt-3 pt-3 border-t border-gray-100">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Fee Breakdown</div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Permit Fee</span>
                  <span className="text-gray-900">${permit.fee?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="text-gray-900">${permit.processingFee?.toFixed(2)}</span>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${permit.totalFee?.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Payment</div>
              <div className="flex items-center gap-2 text-xs">
                <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-900">
                  {permit.paymentMethod} ending in {permit.lastFourDigits}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full h-8 text-xs">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download Permit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Option 3: Information-Rich
function InformationRichCard({ permit }: { permit: PermitState }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-gray-100 shadow-sm overflow-hidden">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
              {permit.code}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">{permit.name}</span>
                <Badge variant="outline" className={`text-[10px] h-5 px-1.5 ${getStatusColor(permit.status)}`}>
                  {permit.status}
                </Badge>
              </div>
              <div className="text-xs text-gray-500">Permit #{permit.permitNumber}</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="w-4 h-4" />
          </Button>
        </div>

        {/* Always visible info */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500">Valid Period</span>
            <span className="text-gray-900 ml-auto">
              {formatDate(permit.effectiveDate!)} → {formatDate(permit.expiryDate!)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <DollarSign className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500">Permit Fee</span>
            <span className="text-gray-900 ml-auto">${permit.fee?.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500 ml-6">Processing Fee</span>
            <span className="text-gray-900 ml-auto">${permit.processingFee?.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-gray-900 ml-6">Total Paid</span>
            <span className="text-gray-900 ml-auto">${permit.totalFee?.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CreditCard className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500">Payment Method</span>
            <span className="text-gray-900 ml-auto">
              {permit.paymentMethod} ••{permit.lastFourDigits}
            </span>
          </div>
        </div>

        {/* Optional expand for even more details */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Additional Information</div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Issue Date</span>
                <span className="text-gray-900">{formatDate(permit.effectiveDate!)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Authority</span>
                <span className="text-gray-900">Oregon DOT</span>
              </div>
            </div>
          </div>
        )}

        {/* Expand toggle at bottom */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-center text-[10px] text-gray-500 mt-3 pt-3 border-t border-gray-100 hover:text-gray-700"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </CardContent>
    </Card>
  );
}

export default function PermitCardOptions({ onBack, onNavigate }: PermitCardOptionsProps) {
  return (
    <div className="min-h-screen bg-[#f6f6f6] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-9 w-9 text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-base font-semibold text-gray-900">Choose Permit Card Design</h1>
            <p className="text-xs text-gray-500">Select your preferred layout</p>
          </div>
        </div>
      </div>

      {/* Options Grid */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Option 1: Ultra-Compact */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Option 1: Ultra-Compact</h2>
              <p className="text-xs text-gray-500 mt-0.5">Minimal upfront, expand for details</p>
              <p className="text-[10px] text-gray-400 mt-1">✓ Most space-efficient • Best for scanning many permits</p>
            </div>
          </div>
          <UltraCompactCard permit={samplePermit} />
          <Button
            onClick={() => onNavigate?.('ultra-compact')}
            className="w-full bg-[#F89823] hover:bg-[#e08920] text-[#1a1a1a] h-9 text-sm"
          >
            Select Ultra-Compact
          </Button>
        </div>

        <Separator className="my-6" />

        {/* Option 2: Balanced Compact */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Option 2: Balanced Compact ⭐</h2>
              <p className="text-xs text-gray-500 mt-0.5">Key info visible, details expandable</p>
              <p className="text-[10px] text-gray-400 mt-1">✓ Current design • Good balance • Recommended</p>
            </div>
          </div>
          <BalancedCompactCard permit={samplePermit} />
          <Button
            onClick={() => onNavigate?.('balanced')}
            className="w-full bg-[#F89823] hover:bg-[#e08920] text-[#1a1a1a] h-9 text-sm"
          >
            Select Balanced (Current)
          </Button>
        </div>

        <Separator className="my-6" />

        {/* Option 3: Information-Rich */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Option 3: Information-Rich</h2>
              <p className="text-xs text-gray-500 mt-0.5">More details upfront, less expanding</p>
              <p className="text-[10px] text-gray-400 mt-1">✓ Easier scanning • More vertical space • Complete info</p>
            </div>
          </div>
          <InformationRichCard permit={samplePermit} />
          <Button
            onClick={() => onNavigate?.('information-rich')}
            className="w-full bg-[#F89823] hover:bg-[#e08920] text-[#1a1a1a] h-9 text-sm"
          >
            Select Information-Rich
          </Button>
        </div>
      </div>
    </div>
  );
}