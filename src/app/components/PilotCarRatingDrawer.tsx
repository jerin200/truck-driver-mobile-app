import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "./ui/drawer";
import { StarRating } from "./StarRating";
import { PrimaryButton } from "./ui/primary-button";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { CheckCircle2 } from "lucide-react";
import { useSnackbar } from "../contexts/SnackbarContext";

interface RatingCategory {
  id: string;
  label: string;
  value: number;
}

interface PilotCarRatingDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripId: string;
  pilotCarId: string;
  pilotCarName: string;
  onSubmitSuccess?: (rating: SubmittedRating) => void;
}

export interface SubmittedRating {
  tripId: string;
  pilotCarId: string;
  overallRating: number;
  categories: RatingCategory[];
  comments: string;
  timestamp: string;
}

const getRatingLabel = (value: number): string => {
  if (value === 0) return "";
  if (value <= 2) return "Poor";
  if (value === 3) return "Average";
  if (value === 4) return "Good";
  return "Excellent";
};

export function PilotCarRatingDrawer({
  open,
  onOpenChange,
  tripId,
  pilotCarId,
  pilotCarName,
  onSubmitSuccess,
}: PilotCarRatingDrawerProps) {
  const { showSnackbar } = useSnackbar();
  const [submitted, setSubmitted] = useState(false);
  const [comments, setComments] = useState("");
  
  const [categories, setCategories] = useState<RatingCategory[]>([
    { id: "safety", label: "Safety", value: 0 },
    { id: "driving", label: "Driving & Compliance", value: 0 },
    { id: "communication", label: "Communication", value: 0 },
    { id: "professionalism", label: "Professionalism", value: 0 },
    { id: "vehicle", label: "Vehicle & Equipment", value: 0 },
    { id: "assetHealth", label: "Asset Health", value: 0 },
  ]);

  const updateCategory = (id: string, value: number) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, value } : cat))
    );
  };

  const allRated = categories.every((cat) => cat.value > 0);
  const ratedCount = categories.filter((cat) => cat.value > 0).length;
  const overallRating =
    categories.reduce((sum, cat) => sum + cat.value, 0) / categories.length;

  const handleSubmit = () => {
    if (!allRated) {
      showSnackbar("Please rate all categories", "error");
      return;
    }

    const rating: SubmittedRating = {
      tripId,
      pilotCarId,
      overallRating: Math.round(overallRating * 10) / 10,
      categories,
      comments,
      timestamp: new Date().toISOString(),
    };

    // Check if low rating (≤3) and trigger admin notification
    if (overallRating <= 3) {
      console.log("Low rating alert triggered for admin:", {
        title: "Low Rating Alert – Pilot Car",
        message: `Pilot Car ${pilotCarName} received a rating of ${overallRating.toFixed(1)}★ for Trip ${tripId}. Please review the feedback.`,
      });
    }

    // Show success state
    setSubmitted(true);
    
    // Call success callback
    if (onSubmitSuccess) {
      onSubmitSuccess(rating);
    }

    // Auto-close after showing success
    setTimeout(() => {
      onOpenChange(false);
      // Reset state after animation completes
      setTimeout(() => {
        setSubmitted(false);
        setCategories([
          { id: "safety", label: "Safety", value: 0 },
          { id: "driving", label: "Driving & Compliance", value: 0 },
          { id: "communication", label: "Communication", value: 0 },
          { id: "professionalism", label: "Professionalism", value: 0 },
          { id: "vehicle", label: "Vehicle & Equipment", value: 0 },
          { id: "assetHealth", label: "Asset Health", value: 0 },
        ]);
        setComments("");
      }, 300);
    }, 2000);
  };

  const handleClose = () => {
    if (!submitted) {
      onOpenChange(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[90vh]">
        {!submitted ? (
          <>
            {/* Header */}
            <DrawerHeader className="border-b border-gray-100 pb-4">
              <DrawerTitle className="text-lg font-semibold text-gray-900">
                Rate Pilot Car
              </DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500 mt-1">
                Trip #{tripId} • Buffalo, NY
              </DrawerDescription>
            </DrawerHeader>

            {/* Content */}
            <div className="overflow-y-auto px-4 py-4">
              {/* Progress Indicator */}
              {ratedCount > 0 && (
                <div className="mb-4 pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-500">
                    {ratedCount} of {categories.length} completed
                  </p>
                </div>
              )}

              {/* Rating Categories */}
              <div className="space-y-0">
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    className={`py-3 ${
                      index < categories.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Label
                        htmlFor={category.id}
                        className="text-sm font-normal text-gray-700 flex-shrink-0"
                      >
                        {category.label}
                      </Label>
                      <div className="flex flex-col items-end gap-1">
                        <StarRating
                          value={category.value}
                          onChange={(value) => updateCategory(category.id, value)}
                          size="md"
                        />
                        {category.value > 0 && (
                          <span className="text-xs text-gray-400">
                            {getRatingLabel(category.value)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comments Section */}
            </div>

            {/* Footer */}
            <DrawerFooter className="border-t border-gray-100 pt-4 pb-6">
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 h-11 font-medium"
                >
                  Maybe Later
                </Button>
                <PrimaryButton
                  onClick={handleSubmit}
                  disabled={!allRated}
                  className="flex-1 h-11 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                >
                  Submit Rating
                </PrimaryButton>
              </div>
            </DrawerFooter>
          </>
        ) : (
          /* Success State */
          <div className="py-12 px-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Thank You!
            </h3>
            <p className="text-sm text-gray-600">
              Your rating has been submitted successfully
            </p>
            <div className="mt-4 flex justify-center">
              <StarRating
                value={overallRating}
                readonly
                size="lg"
                showValue
              />
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
