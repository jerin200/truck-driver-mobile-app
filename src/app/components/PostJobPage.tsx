import { useState } from "react";
import AddJob from "./AddJob";
import PilotCarAllocation, { AllocationResult } from "./PilotCarAllocation";
import type { LoadInfo } from "./CreateTripPage";

interface PostJobPageProps {
  onBack: () => void;
  onSave: (jobData: any) => void;
  loadInfo?: LoadInfo;
  tripId?: string;
  routeOrigin?: string;
  routeDestination?: string;
  routeStartDate?: string;
  routeStates?: string[];
  tripPermits?: Array<{ id: string; name: string; state: string }>;
  /** Role-based access — user must be able to create & post jobs. Defaults to true. */
  canPostJobs?: boolean;
}

export default function PostJobPage({
  onBack,
  onSave,
  loadInfo,
  tripId,
  routeOrigin,
  routeDestination,
  routeStates = [],
  tripPermits = [],
  canPostJobs = true,
}: PostJobPageProps) {
  const [showAllocation, setShowAllocation] = useState(false);
  const [jobData, setJobData] = useState<any>(null);

  const handleJobSave = (data: any) => {
    // Store job config and move to the pilot car allocation step.
    setJobData(data);
    setShowAllocation(true);
  };

  const handleAllocationConfirm = (allocation: AllocationResult) => {
    const finalJobData = {
      type: "pilot-car",
      status: "open",
      createdDate: new Date().toISOString(),
      title: jobData?.jobTitle || "",
      jobData,
      allocation,
    };

    onSave(finalJobData);
  };

  const handleBackFromAllocation = () => {
    setShowAllocation(false);
  };

  // Pilot Car Allocation step — shown after all states are configured & job posted.
  if (showAllocation) {
    return (
      <PilotCarAllocation
        onBack={handleBackFromAllocation}
        onConfirm={handleAllocationConfirm}
        jobTitle={jobData?.jobTitle}
        stateCount={jobData?.selectedStates?.length}
        canPostJobs={canPostJobs}
      />
    );
  }

  // Prepare trip data for AddJob component
  const tripData = {
    id: tripId || 'TRP-2024-010',
    origin: routeOrigin || 'Sacramento, CA',
    destination: routeDestination || 'Phoenix, AZ',
    states: routeStates.length > 0 ? routeStates : ['CA', 'OR', 'NV', 'AZ', 'UT', 'NM', 'TX'],
    distance: '1846',
    load: {
      commodityType: loadInfo?.commodityType || 'Standard',
      weight: loadInfo?.loadWeight || '80000',
      height: loadInfo?.overHeight || "13'6\"",
      width: loadInfo?.overWidth || "8'6\"",
      length: loadInfo?.loadLength || "53'",
      grossVehicleWeight: loadInfo?.grossVehicleWeight || '80000',
    },
  };

  return (
    <AddJob
      onClose={onBack}
      onSave={handleJobSave}
      tripData={tripData}
    />
  );
}
