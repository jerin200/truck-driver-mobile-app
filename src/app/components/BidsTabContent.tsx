import { useState, useMemo } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Star, 
  CheckCircle, 
  Award, 
  TrendingDown,
  Clock,
  FileText,
  Phone,
  Mail,
  Users,
  Megaphone,
  Search,
  ChevronDown,
  ChevronRight,
  User
} from 'lucide-react';

interface Bid {
  id: string;
  companyName: string;
  amount: number;
  rating: number;
  vehicleType: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  driverName?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  companyEmail?: string;
  jobStatus?: 'Not Started' | 'In Progress' | 'Completed';
  startTime?: string;
  endTime?: string;
  invoiceApproved?: boolean;
  distanceMiles?: number;
  availableNow?: boolean;
  compliant?: boolean;
  capabilities?: string[];
  permits?: string[];
  submittedAt?: string;
  responseTime?: string;
  yearsExperience?: number;
  totalTrips?: number;
}

interface BidsTabContentProps {
  bids: Bid[];
  selectedBidId: string | null;
  onSelectBid: (bidId: string) => void;
  onAssignPilot: () => void;
  jobStatus: string;
  biddingModel: 'OPEN_MARKET' | 'INVITED_ONLY';
  onRequestPilotCars?: () => void;
  onPostToAll?: () => void;
}

export function BidsTabContent({ 
  bids, 
  selectedBidId, 
  onSelectBid, 
  onAssignPilot, 
  jobStatus, 
  biddingModel,
  onRequestPilotCars, 
  onPostToAll
}: BidsTabContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const isOpenMarket = biddingModel === 'OPEN_MARKET';
  
  const pendingBids = bids.filter(b => b.status === 'Pending');
  const acceptedBid = bids.find(b => b.status === 'Accepted');

  // For OPEN_MARKET: only bids with amounts
  // For INVITED_ONLY: all invited drivers (with or without amounts)
  const displayBids = isOpenMarket 
    ? pendingBids.filter(b => b.amount > 0)
    : bids;

  // Normalize status
  const normalizedStatus = useMemo(() => {
    if (jobStatus === 'Assigned') return 'assigned';
    if (jobStatus === 'In Progress') return 'in_progress';
    if (jobStatus === 'Completed') return 'completed';
    if (jobStatus === 'Expired') return 'expired';
    
    if (isOpenMarket) {
      // OPEN_MARKET: show review if we have bids with amounts
      const bidsWithAmounts = pendingBids.filter(b => b.amount > 0);
      return bidsWithAmounts.length > 0 ? 'review' : 'waiting';
    } else {
      // INVITED_ONLY: show review if we have any invited drivers
      return bids.length > 0 ? 'review' : 'waiting';
    }
  }, [jobStatus, pendingBids, bids.length, isOpenMarket]);

  // OPEN_MARKET calculations
  const bidsWithAmounts = pendingBids.filter(b => b.amount > 0);
  
  const lowestBid = useMemo(() => {
    if (bidsWithAmounts.length === 0) return null;
    return bidsWithAmounts.reduce((min, bid) => bid.amount < min.amount ? bid : min, bidsWithAmounts[0]);
  }, [bidsWithAmounts]);

  const averageBid = useMemo(() => {
    if (bidsWithAmounts.length === 0) return 0;
    return Math.round(bidsWithAmounts.reduce((sum, bid) => sum + bid.amount, 0) / bidsWithAmounts.length);
  }, [bidsWithAmounts]);

  const highestBid = useMemo(() => {
    if (bidsWithAmounts.length === 0) return null;
    return bidsWithAmounts.reduce((max, bid) => bid.amount > max.amount ? bid : max, bidsWithAmounts[0]);
  }, [bidsWithAmounts]);

  const topRatedBid = useMemo(() => {
    if (bidsWithAmounts.length === 0) return null;
    return bidsWithAmounts.reduce((max, bid) => bid.rating > max.rating ? bid : max, bidsWithAmounts[0]);
  }, [bidsWithAmounts]);

  const bestValueBid = useMemo(() => {
    if (bidsWithAmounts.length === 0) return null;
    
    const scored = bidsWithAmounts.map(bid => ({
      bid,
      score: (bid.rating || 0) * 1000 - bid.amount
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.bid;
  }, [bidsWithAmounts]);

  // Search filter (OPEN_MARKET only)
  const searchFiltered = useMemo(() => {
    if (!isOpenMarket || !searchQuery) return displayBids;
    const query = searchQuery.toLowerCase();
    return displayBids.filter(bid => 
      bid.companyName.toLowerCase().includes(query) ||
      bid.driverName?.toLowerCase().includes(query) ||
      bid.vehicleType.toLowerCase().includes(query)
    );
  }, [displayBids, searchQuery, isOpenMarket]);

  // Sort bids
  const sortedBids = useMemo(() => {
    if (isOpenMarket) {
      // OPEN_MARKET: sort by best value, then price
      return [...searchFiltered].sort((a, b) => {
        if (a.id === bestValueBid?.id) return -1;
        if (b.id === bestValueBid?.id) return 1;
        return a.amount - b.amount;
      });
    } else {
      // INVITED_ONLY: sort by status (responded first), then by amount
      return [...searchFiltered].sort((a, b) => {
        // Responded (amount > 0) first
        if (a.amount > 0 && b.amount === 0) return -1;
        if (a.amount === 0 && b.amount > 0) return 1;
        // Then by amount if both responded
        if (a.amount > 0 && b.amount > 0) return a.amount - b.amount;
        // Keep original order for pending
        return 0;
      });
    }
  }, [searchFiltered, bestValueBid, isOpenMarket]);

  // OPEN_MARKET badges
  const getBadges = (bid: Bid) => {
    if (!isOpenMarket) return [];
    const badges = [];
    if (bid.id === bestValueBid?.id) badges.push({ label: 'Best Value', color: 'bg-green-100 text-green-700 border-green-200' });
    if (bid.id === topRatedBid?.id) badges.push({ label: 'Top Rated', color: 'bg-amber-100 text-amber-700 border-amber-200' });
    if (bid.id === lowestBid?.id) badges.push({ label: 'Lowest Bid', color: 'bg-blue-100 text-blue-700 border-blue-200' });
    return badges;
  };

  // Get status for INVITED_ONLY
  const getInvitedStatus = (bid: Bid) => {
    if (bid.status === 'Accepted') return { label: 'Accepted', color: 'bg-green-100 text-green-700 border-green-200' };
    if (bid.amount > 0) return { label: 'Responded', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    return { label: 'Pending', color: 'bg-amber-100 text-amber-700 border-amber-200' };
  };

  // ============================================
  // A. WAITING STATE - No bids yet
  // ============================================
  if (normalizedStatus === 'waiting') {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
        <FileText className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="font-semibold text-lg text-gray-600 mb-2">
          No {isOpenMarket ? 'bids' : 'responses'} received yet
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
          {isOpenMarket
            ? 'Post this job to the marketplace for qualified pilot cars to submit bids.'
            : 'Select pilot cars to request quotes from your preferred drivers.'}
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {isOpenMarket ? (
            <>
              <Button 
                className="bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold rounded-lg"
                onClick={() => onPostToAll?.()}
              >
                <Megaphone className="w-4 h-4 mr-1.5" />
                Post to Marketplace
              </Button>
              <Button 
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => onRequestPilotCars?.()}
              >
                <Users className="w-4 h-4 mr-1.5" />
                Request Specific
              </Button>
            </>
          ) : (
            <Button 
              className="bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold rounded-lg"
              onClick={() => onRequestPilotCars?.()}
            >
              <Users className="w-4 h-4 mr-1.5" />
              Request Pilot Cars
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ============================================
  // B. REVIEW STATE - OPEN_MARKET
  // ============================================
  if (normalizedStatus === 'review' && isOpenMarket) {
    return (
      <div className="space-y-4 pb-24">
        {/* Summary Card */}
        

        {/* Search and Filter */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by company or driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 bg-white border-gray-200 rounded-lg"
            />
          </div>
          <Button
            variant="outline"
            className="h-10 px-3 border-gray-200 rounded-lg"
          >
            <ChevronDown className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>

        {/* Bid Cards - New Design */}
        {sortedBids.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No results found
          </div>
        ) : (
          <div className="space-y-3">
            {sortedBids.map((bid) => {
              const badges = getBadges(bid);
              const isSelected = selectedBidId === bid.id;

              return (
                <div
                  key={bid.id}
                  onClick={() => onSelectBid(bid.id)}
                  className={`rounded-xl transition-all cursor-pointer p-4 ${
                    isSelected
                      ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                      : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Radio Button */}
                    <div className="flex items-center pt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                    </div>

                    {/* Center - Company Info */}
                    <div className="flex-1 min-w-0">
                      {/* Company Name */}
                      <h4 className="font-semibold text-base text-gray-900 mb-1">
                        {bid.companyName}
                      </h4>

                      {/* Rating + Vehicle Type Row */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900 font-medium">{bid.rating}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{bid.vehicleType || 'Lead Pilot Car'}</span>
                      </div>

                      {/* Tags - New Line */}
                      {badges.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap mb-2">
                          {badges.map((badge, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className={`text-xs font-medium border ${badge.color}`}
                            >
                              {badge.label}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Driver Name */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{bid.driverName || bid.contactPerson || 'Driver TBD'}</span>
                      </div>

                      {/* View Details Link */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDetails(showDetails === bid.id ? null : bid.id);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        View details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Right - Price */}
                    <div className="text-right flex-shrink-0 pl-3">
                      <p className="text-gray-900 tabular-nums text-[20px] font-bold">
                        ${bid.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {showDetails === bid.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                      {bid.capabilities && bid.capabilities.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1.5 font-medium">Capabilities</p>
                          <div className="flex flex-wrap gap-1.5">
                            {bid.capabilities.map((cap, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">{cap}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {bid.permits && bid.permits.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1.5 font-medium">Permits</p>
                          <div className="flex flex-wrap gap-1.5">
                            {bid.permits.map((permit, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">{permit}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {bid.totalTrips && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Total Trips</span>
                          <span className="font-medium text-gray-900">{bid.totalTrips}</span>
                        </div>
                      )}
                      {bid.distanceMiles && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Distance Away</span>
                          <span className="font-medium text-gray-900">{bid.distanceMiles} mi</span>
                        </div>
                      )}
                      {bid.responseTime && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Response Time</span>
                          <span className="font-medium text-gray-900">{bid.responseTime}</span>
                        </div>
                      )}
                      {bid.availableNow !== undefined && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Available Now</span>
                          <span className={`font-medium ${bid.availableNow ? 'text-green-600' : 'text-gray-500'}`}>
                            {bid.availableNow ? 'Yes' : 'No'}
                          </span>
                        </div>
                      )}
                      {bid.compliant !== undefined && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Compliant</span>
                          <span className={`font-medium ${bid.compliant ? 'text-green-600' : 'text-red-500'}`}>
                            {bid.compliant ? 'Yes' : 'No'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Selection Hint */}
        {!selectedBidId && sortedBids.length > 0 && (
          <div className="text-center py-2 text-gray-500 text-sm">
            👆 Select a bid to continue
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // C. REVIEW STATE - INVITED_ONLY
  // ============================================
  if (normalizedStatus === 'review' && !isOpenMarket) {
    const respondedCount = sortedBids.filter(b => b.amount > 0).length;
    const pendingCount = sortedBids.filter(b => b.amount === 0 && b.status === 'Pending').length;

    return (
      <div className="space-y-4 pb-24">
        {/* Status Summary */}
        {pendingCount > 0 && respondedCount > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">{respondedCount} of {sortedBids.length}</span> invited drivers responded
            </p>
          </div>
        )}

        {/* Single List - All Invited Drivers */}
        <div className="space-y-3">
          {sortedBids.map((bid) => {
            const statusInfo = getInvitedStatus(bid);
            const isSelected = selectedBidId === bid.id;
            const hasResponded = bid.amount > 0;
            const isAccepted = bid.status === 'Accepted';

            return (
              <div
                key={bid.id}
                onClick={hasResponded && !isAccepted ? () => onSelectBid(bid.id) : undefined}
                className={`rounded-xl transition-all p-4 ${
                  isAccepted 
                    ? 'bg-green-50 border-2 border-green-500' 
                    : hasResponded 
                      ? 'bg-white border border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow-sm'
                      : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar Circle */}
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <span className="text-gray-400 text-lg font-semibold">
                      {bid.companyName.charAt(0)}
                    </span>
                  </div>

                  {/* Center - Driver Info */}
                  <div className="flex-1 min-w-0">
                    {/* Company Name */}
                    <h4 className="font-semibold text-base text-gray-900 mb-1">
                      {bid.companyName}
                    </h4>

                    {/* Rating + Vehicle Type + Status Badge Row */}
                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      {bid.rating > 0 && (
                        <>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          <span className="text-sm text-gray-900 font-medium">{bid.rating}</span>
                          <span className="text-gray-400">•</span>
                        </>
                      )}
                      <span className="text-sm text-gray-400">{bid.vehicleType || 'Lead Pilot Car'}</span>
                      {hasResponded && (
                        <>
                          <span className="text-gray-400">•</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs border ${statusInfo.color}`}
                          >
                            {statusInfo.label}
                          </Badge>
                        </>
                      )}
                    </div>

                    {/* Driver Name */}
                    {bid.driverName && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{bid.driverName}</span>
                      </div>
                    )}

                    {/* Waiting message for pending */}
                    {!hasResponded && !isAccepted && (
                      <div className="mt-2 mb-3 flex items-center gap-1.5 text-xs text-amber-600">
                        <Clock className="w-3 h-3" />
                        <span>Waiting for quote...</span>
                      </div>
                    )}

                    {/* View Details Link - Only for responded quotes */}
                    {hasResponded && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDetails(showDetails === bid.id ? null : bid.id);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        View details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Right - Price or Action */}
                  {hasResponded && (
                    <div className="text-right flex-shrink-0 pl-3">
                      <p className="font-bold text-2xl text-gray-900 tabular-nums">
                        ${bid.amount.toLocaleString()}
                      </p>
                      {isAccepted && (
                        <div className="mt-2">
                          <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                {showDetails === bid.id && hasResponded && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    {bid.capabilities && bid.capabilities.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1.5 font-medium">Capabilities</p>
                        <div className="flex flex-wrap gap-1.5">
                          {bid.capabilities.map((cap, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">{cap}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {bid.permits && bid.permits.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1.5 font-medium">Permits</p>
                        <div className="flex flex-wrap gap-1.5">
                          {bid.permits.map((permit, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">{permit}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {bid.totalTrips && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Total Trips</span>
                        <span className="font-medium text-gray-900">{bid.totalTrips}</span>
                      </div>
                    )}
                    {bid.distanceMiles && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Distance Away</span>
                        <span className="font-medium text-gray-900">{bid.distanceMiles} mi</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Request More Button */}
        <Button
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
          onClick={() => onRequestPilotCars?.()}
        >
          <Users className="w-4 h-4 mr-1.5" />
          Request More Pilot Cars
        </Button>
      </div>
    );
  }

  // ============================================
  // D. ASSIGNED - Show selected pilot
  // ============================================
  if (normalizedStatus === 'assigned' && acceptedBid) {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-base text-green-900">Assigned to:</h3>
          </div>
          
          <div className="mb-4">
            <p className="font-bold text-xl text-gray-900">{acceptedBid.companyName}</p>
            {acceptedBid.driverName && (
              <p className="text-sm text-gray-700 mt-1">Driver: {acceptedBid.driverName}</p>
            )}
          </div>

          <div className="bg-white border border-green-200 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Amount</span>
              <span className="font-bold text-xl text-green-600">${acceptedBid.amount.toLocaleString()}</span>
            </div>
          </div>

          <Badge className="bg-green-600 text-white border-0 mb-4">
            Assigned
          </Badge>

          {/* Contact Info */}
          {(acceptedBid.contactPhone || acceptedBid.contactEmail) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <p className="text-xs font-semibold text-gray-700 uppercase mb-2">Contact Information</p>
              <div className="space-y-2">
                {acceptedBid.contactPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a href={`tel:${acceptedBid.contactPhone}`} className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      {acceptedBid.contactPhone}
                    </a>
                  </div>
                )}
                {acceptedBid.contactEmail && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a href={`mailto:${acceptedBid.contactEmail}`} className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      {acceptedBid.contactEmail}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50">
            View Assignment
          </Button>
        </div>
      </div>
    );
  }

  // ============================================
  // E. IN PROGRESS - Show active escort
  // ============================================
  if (normalizedStatus === 'in_progress' && acceptedBid) {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-500 rounded-xl p-5">
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1">Escorted by</p>
            <p className="font-bold text-xl text-gray-900">{acceptedBid.companyName}</p>
            {acceptedBid.driverName && (
              <p className="text-sm text-gray-700 mt-1">Driver: {acceptedBid.driverName}</p>
            )}
          </div>

          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 rounded-lg px-3 py-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-sm font-semibold">In Progress</span>
          </div>

          {acceptedBid.startTime && (
            <div className="bg-white border border-blue-200 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Started</span>
                <span className="font-medium text-gray-900">
                  {new Date(acceptedBid.startTime).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <Button className="w-full bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold">
            Track Escort
          </Button>
        </div>
      </div>
    );
  }

  // ============================================
  // F. COMPLETED
  // ============================================
  if (normalizedStatus === 'completed' && acceptedBid) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-base text-gray-900">Completed</h3>
          </div>
          
          <div className="mb-4">
            <p className="font-bold text-lg text-gray-900">{acceptedBid.companyName}</p>
            {acceptedBid.driverName && (
              <p className="text-sm text-gray-600 mt-1">Driver: {acceptedBid.driverName}</p>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Amount</span>
              <span className="font-bold text-lg text-gray-900">${acceptedBid.amount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="text-center py-8 text-gray-500 text-sm">
      No {isOpenMarket ? 'bids' : 'responses'} received yet
    </div>
  );
}