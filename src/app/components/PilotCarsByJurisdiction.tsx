import { MapIcon, Navigation, Star, Phone, Info, Mail } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface Bid {
  id: string;
  companyName: string;
  amount: number;
  rating: number;
  vehicleType: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
}

interface PilotJob {
  id: string;
  tripId: string;
  vehicleType: string;
  numberOfVehicles: number;
  status: 'Open' | 'Assigned' | 'Completed';
  bids: Bid[];
  notes: string;
  jurisdictions?: string[];
}

interface PilotCarsByJurisdictionProps {
  jobs: PilotJob[];
}

export default function PilotCarsByJurisdiction({ jobs }: PilotCarsByJurisdictionProps) {
  const activeJobs = jobs.filter(job => job.status === 'Assigned' || job.status === 'Completed' || job.status === 'Open');
  
  // Get all unique states in order
  const allStates: string[] = [];
  activeJobs.forEach(job => {
    if (job.jurisdictions) {
      job.jurisdictions.forEach(state => {
        if (!allStates.includes(state)) {
          allStates.push(state);
        }
      });
    }
  });

  return (
    <div className="space-y-3">
      {/* Group by Job (which covers multiple jurisdictions) */}
      <div className="space-y-2">
        {activeJobs.map((job) => {
          const assignedBid = job.bids.find(bid => bid.status === 'Accepted');
          const isOpen = job.status === 'Open';
          
          const stateLabel = job.jurisdictions && job.jurisdictions.length > 0
            ? job.jurisdictions.length === 1 
              ? job.jurisdictions[0]
              : `${job.jurisdictions[0]} → ${job.jurisdictions[job.jurisdictions.length - 1]}`
            : 'Full Route';
          
          return (
            <div key={job.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapIcon className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-900">{stateLabel}</span>
                </div>
                <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                  {job.vehicleType}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-3">
                {isOpen ? (
                  // Open job - show bid count
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Accepting Bids</p>
                      <p className="text-xs text-gray-600">{job.bids.length} {job.bids.length === 1 ? 'bid' : 'bids'} • {job.numberOfVehicles}x Vehicle</p>
                    </div>
                    <Badge className="bg-green-600 text-white border-0 text-xs">
                      Open
                    </Badge>
                  </div>
                ) : assignedBid ? (
                  // Assigned job - show company with contact info
                  <>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{assignedBid.companyName}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-gray-700">{assignedBid.rating}</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span className="text-xs text-gray-600">{job.numberOfVehicles}x Vehicle</span>
                        </div>
                      </div>
                      <p className="font-bold text-sm text-gray-900">${assignedBid.amount.toLocaleString()}</p>
                    </div>

                    {/* Contact Information - Simplified */}
                    {(assignedBid.contactPerson || assignedBid.contactPhone) && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mb-2">
                        {assignedBid.contactPerson && (
                          <span>{assignedBid.contactPerson}</span>
                        )}
                        {assignedBid.contactPhone && (
                          <a href={`tel:${assignedBid.contactPhone}`} className="text-blue-600 font-medium">
                            {assignedBid.contactPhone}
                          </a>
                        )}
                      </div>
                    )}

                    {/* Single Call Button */}
                    {assignedBid.contactPhone && (
                      <Button 
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs"
                        asChild
                      >
                        <a href={`tel:${assignedBid.contactPhone}`}>
                          <Phone className="w-3.5 h-3.5 mr-1.5" />
                          Call
                        </a>
                      </Button>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}