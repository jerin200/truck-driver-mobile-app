import { useState } from "react";
import AddJob from "./AddJob";
import ListPilotCarsPage from "./ListPilotCarsPage";
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
}: PostJobPageProps) {
  const [showListPilotCars, setShowListPilotCars] = useState(false);
  const [jobData, setJobData] = useState<any>(null);

  const handleJobSave = (data: any) => {
    // Store job data and navigate to pilot cars list
    setJobData(data);
    setShowListPilotCars(true);
  };

  const handlePilotCarsSubmit = (selectedPilotCars: any[]) => {
    const finalJobData = {
      type: "pilot-car",
      status: "open",
      createdDate: new Date().toISOString(),
      title: jobData?.jobTitle || "",
      jobData: jobData,
      selectedPilotCars: selectedPilotCars,
    };
    
    onSave(finalJobData);
  };

  const handleBackFromPilotCars = () => {
    setShowListPilotCars(false);
  };

  // If showing pilot cars list, render that page
  if (showListPilotCars) {
    return (
      <ListPilotCarsPage
        onBack={handleBackFromPilotCars}
        onSubmit={handlePilotCarsSubmit}
        jobData={{
          type: "pilot-car",
          pilotCarJobInfo: jobData,
        }}
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
