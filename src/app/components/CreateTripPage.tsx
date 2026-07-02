// Type definitions for trip creation and job posting
// This file exports shared types used across trip and job components

export interface LoadInfo {
  type: string;
  description: string;
  width: string;
  height: string;
  length: string;
  weight: string;
  commodityType?: string;
  specialHandling?: string;
  trailerLength?: string;
  loadLength?: string;
  loadWeight?: string;
}

export interface PilotCarJobInfo {
  // 1. Job Overview
  jobTitle: string;
  jobType: string;
  startDate: string;
  endDate: string;
  associatedPermit: string;
  
  // 2. Load Details
  loadType: string;
  loadDescription: string;
  commodityType: string;
  specialHandling: string;
  
  // 3. Dimensions
  overHeight: string;
  overWidth: string;
  overLength: string;
  trailerLength: string;
  loadLength: string;
  
  // 4. Weight Information
  grossVehicleWeight: string;
  loadWeight: string;
  
  // 5. Load Image
  loadImage?: File | null;
  
  // 6. Route Information
  origin: string;
  destination: string;
  statesProvinces: string[];
  requestedRoute?: string;
  specialInstructions?: string;
  
  // 7. Pilot Car Requirements
  pilotCarTypes: {
    [key: string]: {
      selected: boolean;
      count: number;
    };
  };

  // 8. Schedule & Contact
  startTime?: string;
  timeZone?: string;
  multiDayJob?: boolean;
  estimatedDuration?: string;
  meetAtJobStart?: string;
  meetingLocation?: string;
  meetingInstructions?: string;
  contactName?: string;
  contactPhone?: string;
  estCompletionDate?: string;

  // 9. Pricing
  pricingType?: string;
  baseRate?: string;
  costPerMile?: string;
  costPerHour?: string;
  minimumDailyRate?: string;
  waitingRate?: string;
  gracePeriod?: string;
  overtimeRate?: string;
  layoverCost?: string;
}