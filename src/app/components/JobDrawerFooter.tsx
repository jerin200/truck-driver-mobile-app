import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { DrawerClose } from './ui/drawer';
import { Users, Megaphone } from 'lucide-react';

interface JobDrawerFooterProps {
  activeJob: {
    id: string;
    origin: string;
    destination: string;
    status: string;
    bids: any[];
    requestedPilotCarIds?: string[];
    jobSource?: 'OPEN' | 'REQUESTED';
  } | null;
  onAssign: () => void;
  onEndBidding?: () => void;
  onRequestPilotCars?: () => void;
  onPostToAll?: () => void;
}

export default function JobDrawerFooter({ activeJob, onAssign, onEndBidding, onRequestPilotCars, onPostToAll }: JobDrawerFooterProps) {
  const [endBiddingDialogOpen, setEndBiddingDialogOpen] = useState(false);
  const [postConfirmOpen, setPostConfirmOpen] = useState(false);

  // Source-derived labels
  const isRequested = activeJob?.jobSource === 'REQUESTED';
  const bidNoun = isRequested ? 'Quote' : 'Bid';
  const bidNounPlural = isRequested ? 'Quotes' : 'Bids';

  const handleEndBiddingConfirm = () => {
    if (activeJob) {
      console.log('End bidding confirmed for job:', activeJob.id);
      onEndBidding?.();
      setEndBiddingDialogOpen(false);
    }
  };

  const handlePostConfirm = () => {
    onPostToAll?.();
    setPostConfirmOpen(false);
  };

  // Count actual bids with amounts (not just request placeholders)
  const actualBids = activeJob?.bids.filter((b: any) => b.amount > 0) || [];
  const hasResponses = actualBids.length > 0;
  const requestedCount = activeJob?.requestedPilotCarIds?.length || 0;

  return (
    <>
      {/* Open status with NO bids and NO requests = show both Post and Request options */}
      {activeJob?.status === 'Open' && activeJob.bids.length === 0 && requestedCount === 0 && (
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-2 w-full">
            <Button
              onClick={() => setPostConfirmOpen(true)}
              className="flex-1 bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold rounded-lg"
            >
              <Megaphone className="w-4 h-4 mr-1.5" />
              Post to All
            </Button>
            <Button
              variant="outline"
              onClick={() => onRequestPilotCars?.()}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Users className="w-4 h-4 mr-1.5" />
              Request Specific
            </Button>
          </div>
        </div>
      )}

      {/* Open status WITH bids = show Review & Assign + End Bidding */}
      {activeJob?.status === 'Open' && activeJob.bids.length > 0 && (
        <div className="flex items-center gap-2 w-full">
          {hasResponses && (
            <Button
              onClick={onAssign}
              className="flex-1 bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold rounded-lg"
            >
              Review & Assign
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => setEndBiddingDialogOpen(true)}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            End Bidding
          </Button>
        </div>
      )}

      {/* Requested status = show Request More + View Bids */}
      {activeJob?.status === 'Requested' && (
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-2 w-full">
            {hasResponses ? (
              <Button
                onClick={onAssign}
                className="flex-1 bg-[#F89823] text-[#1a1a1a] hover:bg-[#e8880d] font-semibold rounded-lg"
              >
                View {bidNounPlural} ({actualBids.length})
              </Button>
            ) : (
              <Button
                disabled
                className="flex-1 bg-gray-200 text-gray-500 cursor-not-allowed rounded-lg"
                title={`No ${bidNounPlural.toLowerCase()} received yet`}
              >
                No {bidNounPlural} Yet
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => onRequestPilotCars?.()}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Users className="w-4 h-4 mr-1.5" />
              Request More
            </Button>
          </div>
        </div>
      )}

      {/* Close Button */}
      <DrawerClose asChild>
        <Button variant="ghost" className="w-full">Close</Button>
      </DrawerClose>

      {/* Post to All Confirmation Dialog */}
      <Dialog open={postConfirmOpen} onOpenChange={setPostConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Post to Marketplace?</DialogTitle>
            <DialogDescription>
              This will broadcast the job to all qualified pilot cars on the marketplace. Any pilot car can submit a bid.
            </DialogDescription>
          </DialogHeader>
          {activeJob && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 my-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{activeJob.id}</p>
                  <p className="text-xs text-gray-500">{activeJob.origin} → {activeJob.destination}</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-semibold">
                  Open for Bidding
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setPostConfirmOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePostConfirm}
              className="flex-1 bg-[#F89823] hover:bg-[#e08820] text-[#1a1a1a] font-semibold"
            >
              Post to All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* End Bidding Confirmation Dialog */}
      <Dialog open={endBiddingDialogOpen} onOpenChange={setEndBiddingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>End Bidding</DialogTitle>
            <DialogDescription>
              Are you sure you want to close bidding for this job? No new bids will be accepted after this action.
            </DialogDescription>
          </DialogHeader>
          {activeJob && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 my-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{activeJob.id}</p>
                  <p className="text-xs text-gray-500">{activeJob.origin} → {activeJob.destination}</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-semibold">
                  {activeJob.bids.length} {activeJob.bids.length === 1 ? bidNoun : bidNounPlural}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setEndBiddingDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEndBiddingConfirm}
              className="flex-1 bg-[#F89823] hover:bg-[#e08820] text-[#1a1a1a] font-semibold"
            >
              End Bidding
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}