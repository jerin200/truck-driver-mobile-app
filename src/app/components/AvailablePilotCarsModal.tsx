import { useState } from 'react';
import { X, CheckCircle2, Search, Star, Shield, MapPin, User, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from './ui/drawer';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface PilotCar {
  id: string;
  company: string;
  driver: string;
  type: string;
  experience: number;
  rating: number;
  jurisdictions: string[];
  availability: boolean;
  certifications: string[];
  totalTrips: number;
}

interface AvailablePilotCarsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pilotCars: PilotCar[];
  jobId?: string;
  allocationMode: 'all' | 'pc-group';
  groupName?: string;
  onQuoteRequested: (jobStatus: string, requestedPilotCars: PilotCar[]) => void;
}

export default function AvailablePilotCarsModal({
  isOpen,
  onClose,
  pilotCars,
  jobId = 'JOB-NEW',
  allocationMode,
  groupName,
  onQuoteRequested
}: AvailablePilotCarsModalProps) {
  const [selectedPCs, setSelectedPCs] = useState<string[]>([]);
  const [requestedPCs, setRequestedPCs] = useState<string[]>([]);
  const [failedPCs, setFailedPCs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle individual pilot car selection
  const toggleSelection = (pcId: string) => {
    if (requestedPCs.includes(pcId)) return; // Don't allow deselecting already requested
    
    setSelectedPCs(prev =>
      prev.includes(pcId)
        ? prev.filter(id => id !== pcId)
        : [...prev, pcId]
    );
  };

  // Select/Deselect all
  const toggleSelectAll = () => {
    const availablePCs = pilotCars.filter(pc => !requestedPCs.includes(pc.id));
    if (selectedPCs.length === availablePCs.length) {
      setSelectedPCs([]);
    } else {
      setSelectedPCs(availablePCs.map(pc => pc.id));
    }
  };

  // Request quote for single pilot car
  const requestQuoteSingle = async (pcId: string) => {
    // Prevent duplicate requests
    if (requestedPCs.includes(pcId)) {
      toast.error('Quote already requested', {
        description: 'You cannot request duplicate quotes for the same job'
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate random failure (10% chance for demo)
      const shouldFail = Math.random() < 0.1;
      
      if (shouldFail) {
        throw new Error('Quote request failed');
      }

      setRequestedPCs(prev => [...prev, pcId]);
      
      const pc = pilotCars.find(p => p.id === pcId);
      toast.success('Quote requested successfully', {
        description: `Request sent to ${pc?.driver} - ${pc?.company}`
      });

      // Update job status to "Requested" with all currently requested PCs
      const allRequestedPCs = pilotCars.filter(p => [...requestedPCs, pcId].includes(p.id));
      onQuoteRequested('Requested', allRequestedPCs);
      
    } catch (error) {
      setFailedPCs(prev => [...prev, pcId]);
      toast.error('Quote request failed', {
        description: 'Please try again or contact support'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Request quotes for all selected pilot cars (bulk)
  const requestQuoteBulk = async () => {
    if (selectedPCs.length === 0) {
      toast.error('No pilot cars selected', {
        description: 'Please select at least one pilot car to request quotes'
      });
      return;
    }

    // Filter out already requested PCs
    const newPCs = selectedPCs.filter(id => !requestedPCs.includes(id));
    
    if (newPCs.length === 0) {
      toast.error('All selected pilot cars already requested', {
        description: 'Please select different pilot cars'
      });
      return;
    }

    setIsProcessing(true);
    const successfulRequests: string[] = [];
    const failedRequests: string[] = [];

    try {
      // Process each request
      for (const pcId of newPCs) {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Simulate random failure (10% chance)
          const shouldFail = Math.random() < 0.1;
          
          if (shouldFail) {
            throw new Error('Failed');
          }
          
          successfulRequests.push(pcId);
        } catch {
          failedRequests.push(pcId);
        }
      }

      // Update state
      setRequestedPCs(prev => [...prev, ...successfulRequests]);
      setFailedPCs(prev => [...prev, ...failedRequests]);

      // Show results
      if (successfulRequests.length > 0) {
        toast.success(`Quote requested successfully`, {
          description: `${successfulRequests.length} pilot car${successfulRequests.length !== 1 ? 's' : ''} notified`
        });

        // Update job status to "Requested" with all currently requested PCs
        const allRequestedIds = [...requestedPCs, ...successfulRequests];
        const allRequestedPCsList = pilotCars.filter(pc => allRequestedIds.includes(pc.id));
        onQuoteRequested('Requested', allRequestedPCsList);
      }

      if (failedRequests.length > 0) {
        toast.error(`${failedRequests.length} request${failedRequests.length !== 1 ? 's' : ''} failed`, {
          description: 'Some quote requests could not be processed'
        });
      }

      // Clear selection after bulk request
      setSelectedPCs([]);

    } finally {
      setIsProcessing(false);
    }
  };

  // View pilot car profile
  const viewProfile = (pcId: string) => {
    const pc = pilotCars.find(p => p.id === pcId);
    toast.info('Profile view', {
      description: `Opening profile for ${pc?.driver}`
    });
  };

  // Handle Done action
  const handleDone = () => {
    if (requestedPCs.length === 0) {
      toast.warning('No quotes requested', {
        description: 'Request at least one quote before closing'
      });
      return;
    }
    
    onClose();
  };

  // Filter pilot cars by search query
  const filteredPilotCars = pilotCars.filter(pc => {
    const query = searchQuery.toLowerCase();
    return (
      pc.driver.toLowerCase().includes(query) ||
      pc.company.toLowerCase().includes(query) ||
      pc.type.toLowerCase().includes(query) ||
      pc.id.toLowerCase().includes(query)
    );
  });

  const allSelected = selectedPCs.length === filteredPilotCars.filter(pc => !requestedPCs.includes(pc.id)).length && filteredPilotCars.length > 0;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[95vh] max-h-[95vh]">
        <DrawerTitle className="sr-only">Available Pilot Cars</DrawerTitle>
        <DrawerDescription className="sr-only">
          Select pilot cars and request quotes for your job
        </DrawerDescription>

        {/* Header */}
        <div className="flex-none p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Available Pilot Cars</h2>
              <p className="text-xs text-gray-500">Job ID: {jobId}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
              {allocationMode === 'all' ? (
                <>
                  <Search className="w-3 h-3 mr-1" />
                  All Qualified
                </>
              ) : (
                <>
                  <User className="w-3 h-3 mr-1" />
                  Group: {groupName}
                </>
              )}
            </Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs">
              {filteredPilotCars.length} Found
            </Badge>
            {requestedPCs.length > 0 && (
              <Badge className="bg-green-500 text-white text-xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {requestedPCs.length} Requested
              </Badge>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by driver, company, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-9 text-sm"
            />
          </div>
        </div>

        {/* Bulk Action Bar (Sticky) */}
        {selectedPCs.length > 0 && (
          <div className="flex-none px-4 py-3 bg-blue-50 border-b border-blue-100 sticky top-[176px] z-10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">
                  {selectedPCs.length} Selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPCs([])}
                  className="h-8 text-xs text-blue-700 hover:bg-blue-100"
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  onClick={requestQuoteBulk}
                  disabled={isProcessing}
                  className="h-8 text-xs bg-[#0066cc] hover:bg-blue-700 text-white px-4"
                >
                  {isProcessing ? 'Processing...' : `Request Quote (${selectedPCs.length})`}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Select All Bar */}
        {filteredPilotCars.length > 0 && (
          <div className="flex-none px-4 py-2 bg-gray-50 border-b border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={allSelected}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm text-gray-700 font-medium">
                Select All ({filteredPilotCars.filter(pc => !requestedPCs.includes(pc.id)).length})
              </span>
            </label>
          </div>
        )}

        {/* Pilot Cars List */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {filteredPilotCars.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-900">No pilot cars found</p>
              <p className="text-sm text-gray-500 mt-1">
                {searchQuery ? 'Try a different search term' : 'Try adjusting your job requirements'}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredPilotCars.map((pc) => {
                const isSelected = selectedPCs.includes(pc.id);
                const isRequested = requestedPCs.includes(pc.id);
                const isFailed = failedPCs.includes(pc.id);

                return (
                  <div
                    key={pc.id}
                    className={`bg-white rounded-xl border-2 transition-all ${
                      isSelected ? 'border-blue-500 shadow-sm' : 
                      isRequested ? 'border-green-200 bg-green-50/30' : 
                      isFailed ? 'border-red-200 bg-red-50/30' :
                      'border-gray-200'
                    }`}
                  >
                    {/* Card Header with Checkbox */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelection(pc.id)}
                          disabled={isRequested}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-sm">{pc.driver}</h3>
                              <p className="text-xs text-gray-500 mt-0.5">{pc.company}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{pc.id}</p>
                            </div>
                            <Badge className="bg-[#0066cc] text-white text-xs font-semibold shrink-0">
                              {pc.type}
                            </Badge>
                          </div>

                          {/* Stats Row */}
                          <div className="grid grid-cols-3 gap-3 mt-3">
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-500 mb-0.5">Experience</p>
                              <p className="text-sm font-bold text-gray-900">{pc.experience} yrs</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-500 mb-0.5">Rating</p>
                              <div className="flex items-center justify-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                <p className="text-sm font-bold text-gray-900">{pc.rating.toFixed(1)}</p>
                              </div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-500 mb-0.5">Trips</p>
                              <p className="text-sm font-bold text-gray-900">{pc.totalTrips}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3">
                      {/* Jurisdictions */}
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">Licensed in</p>
                          <div className="flex flex-wrap gap-1">
                            {pc.jurisdictions.map((jurisdiction, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs px-2 py-0">
                                {jurisdiction}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">Certifications</p>
                          <div className="flex flex-wrap gap-1">
                            {pc.certifications.map((cert, idx) => (
                              <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-0">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-4 pt-0">
                      {isRequested ? (
                        <div className="flex items-center justify-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-700">Quote Requested</span>
                        </div>
                      ) : isFailed ? (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center justify-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg col-span-2">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-xs font-semibold text-red-700">Request Failed</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewProfile(pc.id)}
                            className="h-9 text-xs border-gray-300"
                          >
                            View Profile
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setFailedPCs(prev => prev.filter(id => id !== pc.id));
                              requestQuoteSingle(pc.id);
                            }}
                            className="h-9 text-xs bg-red-600 hover:bg-red-700 text-white"
                          >
                            Retry
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewProfile(pc.id)}
                            className="h-9 text-xs border-gray-300"
                          >
                            View Profile
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => requestQuoteSingle(pc.id)}
                            disabled={isProcessing}
                            className="h-9 text-xs bg-[#0066cc] hover:bg-blue-700 text-white"
                          >
                            Request Quote
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer (Sticky) */}
        <div className="flex-none p-4 bg-white border-t border-gray-200 sticky bottom-0">
          {requestedPCs.length > 0 ? (
            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-green-900">
                    Job status will be updated to "Requested"
                  </p>
                  <p className="text-xs text-green-700 mt-0.5">
                    {requestedPCs.length} pilot car{requestedPCs.length !== 1 ? 's' : ''} will receive quote requests
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800 text-center">
                Request at least one quote to activate bidding
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="h-12 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDone}
              disabled={requestedPCs.length === 0}
              className="h-12 bg-[#0066cc] hover:bg-blue-700 text-white font-semibold"
            >
              Done
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}