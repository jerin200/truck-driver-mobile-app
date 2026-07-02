import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp, CreditCard } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { formatDate } from '../utils/dateFormat';

interface PermitState {
  code: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Expired' | 'Not Applied';
  permitNumber?: string;
  effectiveDate?: string;
  expiryDate?: string;
  downloadUrl?: string;
  fee?: number;
  processingFee?: number;
  totalFee?: number;
  paymentMethod?: string;
  lastFourDigits?: string;
}

interface CompactPermitCardProps {
  state: PermitState;
  stateName: string;
  onDownload?: () => void;
}

export function CompactPermitCard({ state, stateName, onDownload }: CompactPermitCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-[#ecfdf3] text-[#027a48] border-[#abefc6]';
      case 'Pending':
        return 'bg-[#fffaeb] text-[#b54708] border-[#fedf89]';
      case 'Rejected':
        return 'bg-[#fef3f2] text-[#b42318] border-[#fecdca]';
      case 'Expired':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Calculate validity duration in days
  const getValidityDuration = () => {
    if (!state.effectiveDate || !state.expiryDate) return null;
    const start = new Date(state.effectiveDate);
    const end = new Date(state.expiryDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const validityDays = getValidityDuration();

  // Mock fee data if not provided
  const fee = state.fee || 285.0;
  const processingFee = state.processingFee || 15.0;
  const totalFee = state.totalFee || fee + processingFee;
  const paymentMethod = state.paymentMethod || 'Visa';
  const lastFourDigits = state.lastFourDigits || '4242';

  return (
    <Card className="border-gray-100 shadow-sm overflow-hidden">
      <CardContent className="p-3">
        {/* Header with key info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 flex-1">
            <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
              {state.code}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-sm font-medium text-gray-900">{stateName}</span>
                <Badge variant="outline" className={`text-[10px] h-5 px-1.5 ${getStatusColor(state.status)}`}>
                  {state.status}
                </Badge>
              </div>
              {state.status === 'Approved' && state.permitNumber && (
                <div className="text-[10px] text-gray-500 flex items-center gap-1.5">
                  <span>#{state.permitNumber}</span>
                  {validityDays && (
                    <>
                      <span>•</span>
                      <span>Valid {validityDays} days</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          {state.status === 'Approved' && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 ml-1"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          )}
        </div>

        {/* Inline summary for approved permits */}
        {state.status === 'Approved' && state.effectiveDate && state.expiryDate && (
          <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-gray-100">
            <span className="text-gray-500">
              {formatDate(state.effectiveDate).split(',')[0]} → {formatDate(state.expiryDate).split(',')[0]}
            </span>
            <span className="text-gray-900 font-medium">${totalFee.toFixed(2)}</span>
          </div>
        )}

        {/* Pending/Rejected status messages */}
        {state.status === 'Pending' && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">Awaiting approval from state authority</p>
          </div>
        )}
        {state.status === 'Rejected' && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-red-600">Application rejected. Review and resubmit.</p>
          </div>
        )}

        {/* Expanded details */}
        {isExpanded && state.status === 'Approved' && (
          <div className="space-y-3 mt-3 pt-3 border-t border-gray-100">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Fee Breakdown</div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Permit Fee</span>
                  <span className="text-gray-900">${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="text-gray-900">${processingFee.toFixed(2)}</span>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${totalFee.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Payment</div>
              <div className="flex items-center gap-2 text-xs">
                <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-900">
                  {paymentMethod} ending in {lastFourDigits}
                </span>
              </div>
            </div>
            {onDownload && (
              <Button variant="outline" size="sm" className="w-full h-8 text-xs" onClick={onDownload}>
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download Permit
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
