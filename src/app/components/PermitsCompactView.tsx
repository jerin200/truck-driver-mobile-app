import React from 'react';
import Header from './Header';
import { CompactPermitCard } from './CompactPermitCard';

interface PermitState {
  code: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Expired' | 'Not Applied';
  permitNumber?: string;
  effectiveDate?: string;
  expiryDate?: string;
  downloadUrl?: string;
}

const STATE_NAMES: Record<string, string> = {
  NY: 'New York',
  NJ: 'New Jersey',
  PA: 'Pennsylvania',
  MD: 'Maryland',
  VA: 'Virginia',
  NC: 'North Carolina',
  FL: 'Florida',
  CA: 'California',
  TX: 'Texas',
};

// Mock permit data
const MOCK_PERMITS: PermitState[] = [
  {
    code: 'NY',
    status: 'Approved',
    permitNumber: 'NY-8829',
    effectiveDate: '2024-12-05',
    expiryDate: '2025-06-30',
  },
  {
    code: 'NJ',
    status: 'Approved',
    permitNumber: 'NJ-4421',
    effectiveDate: '2024-12-01',
    expiryDate: '2024-12-28',
  },
  {
    code: 'PA',
    status: 'Pending',
  },
  {
    code: 'MD',
    status: 'Approved',
    permitNumber: 'MD-5591',
    effectiveDate: '2024-12-05',
    expiryDate: '2025-03-15',
  },
  {
    code: 'VA',
    status: 'Rejected',
  },
  {
    code: 'FL',
    status: 'Approved',
    permitNumber: 'FL-2024-78901',
    effectiveDate: '2024-12-14',
    expiryDate: '2025-03-14',
  },
];

interface PermitsCompactViewProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function PermitsCompactView({ onBack, onNavigate }: PermitsCompactViewProps) {
  const handleDownload = (state: PermitState) => {
    console.log(`Downloading permit for ${state.code}`);
    // Download logic here
  };

  // Group permits by status
  const approvedPermits = MOCK_PERMITS.filter((p) => p.status === 'Approved');
  const pendingPermits = MOCK_PERMITS.filter((p) => p.status === 'Pending');
  const rejectedPermits = MOCK_PERMITS.filter((p) => p.status === 'Rejected');

  return (
    <div className="flex flex-col w-full h-full bg-[#f6f6f6]">
      <div className="flex-none">
        <Header title="Trip Permits" showBackButton onBack={onBack} />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4 w-full pb-8 pt-6">
          {/* Trip Info Header */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500">Request ID</p>
                <p className="text-sm font-semibold text-gray-900">REQ-1001</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Route</p>
                <p className="text-sm font-medium text-gray-900">NY → FL</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <div className="flex-1">
                <p className="text-xs text-gray-500">Driver</p>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
              </div>
              <div className="flex-1 text-right">
                <p className="text-xs text-gray-500">Effective Date</p>
                <p className="text-sm font-medium text-gray-900">12/05/2024</p>
              </div>
            </div>
          </div>

          {/* Rejected Permits */}
          {rejectedPermits.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1 h-4 rounded-full bg-red-600" />
                <span className="text-[11px] text-red-600 uppercase tracking-wider font-semibold">
                  Action Required ({rejectedPermits.length})
                </span>
              </div>
              <div className="space-y-3">
                {rejectedPermits.map((permit) => (
                  <CompactPermitCard
                    key={permit.code}
                    state={permit}
                    stateName={STATE_NAMES[permit.code] || permit.code}
                    onDownload={() => handleDownload(permit)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pending Permits */}
          {pendingPermits.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1 h-4 rounded-full bg-blue-600" />
                <span className="text-[11px] text-blue-600 uppercase tracking-wider font-semibold">
                  Pending ({pendingPermits.length})
                </span>
              </div>
              <div className="space-y-3">
                {pendingPermits.map((permit) => (
                  <CompactPermitCard
                    key={permit.code}
                    state={permit}
                    stateName={STATE_NAMES[permit.code] || permit.code}
                    onDownload={() => handleDownload(permit)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Approved Permits */}
          {approvedPermits.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1 h-4 rounded-full bg-green-600" />
                <span className="text-[11px] text-green-600 uppercase tracking-wider font-semibold">
                  Approved ({approvedPermits.length})
                </span>
              </div>
              <div className="space-y-3">
                {approvedPermits.map((permit) => (
                  <CompactPermitCard
                    key={permit.code}
                    state={permit}
                    stateName={STATE_NAMES[permit.code] || permit.code}
                    onDownload={() => handleDownload(permit)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}