interface TripIdHeaderProps {
  tripId: string;
  status: 'Open' | 'In Transit' | 'Action Required' | 'Completed';
}

function Heading({ tripId }: { tripId: string }) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Heading 2">
      <p className="font-bold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[16px] text-nowrap">Trip - {tripId}</p>
    </div>
  );
}

function Container({ tripId }: { tripId: string }) {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Heading tripId={tripId} />
      </div>
    </div>
  );
}

function Badge({ status }: { status: string }) {
  // Updated status badge colors based on WCAG AA compliance and specific palette requirements
  // Using Tailwind-like colors for consistency with the requested style
  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
    'Open': { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' }, // blue-50, blue-700, blue-200
    'In Transit': { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' }, // orange-50, orange-700, orange-200
    'Action Required': { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' }, // red-50, red-700, red-200
    'Completed': { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' }, // green-50, green-700, green-200
    'Pending': { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' }, // blue-50, blue-700, blue-200 (same as Open/Pending in other components)
    'Approved': { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' }, // green-50, green-700, green-200
    'Rejected': { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' }, // red-50, red-700, red-200
    'Expired': { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' }, // orange-50, orange-700, orange-200
    'Not Applied': { bg: '#FEFCE8', text: '#A16207', border: '#FEF08A' }, // yellow-50, yellow-700, yellow-200
  };

  const colors = statusColors[status] || { bg: '#F9FAFB', text: '#374151', border: '#E5E7EB' }; // gray fallback

  return (
    <div 
      className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" 
      style={{ 
        backgroundColor: colors.bg, 
        borderColor: colors.border, 
        color: colors.text
      }} 
      data-name="Badge"
      role="status"
      aria-label={`Trip status: ${status}`}
    >
        <span className="text-nowrap">
          {status}
        </span>
    </div>
  );
}

function Container1({ tripId, status }: { tripId: string; status: string }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex items-start justify-between relative w-full">
          <Container tripId={tripId} />
          <Badge status={status} />
        </div>
      </div>
    </div>
  );
}

export default function TripIdHeader({ tripId, status }: TripIdHeaderProps) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full">
      <Container1 tripId={tripId} status={status} />
    </div>
  );
}