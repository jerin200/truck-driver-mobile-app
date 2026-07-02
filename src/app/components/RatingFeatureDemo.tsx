import React, { useState } from "react";
import { StarRating } from "./StarRating";
import { RatingPromptCard } from "./RatingPromptCard";
import { PilotCarRatingDrawer, SubmittedRating } from "./PilotCarRatingDrawer";
import { RatingDisplay } from "./RatingDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PrimaryButton } from "./ui/primary-button";

/**
 * Demo page showcasing all Pilot Car rating components
 * This is for testing/demonstration purposes only
 */
export default function RatingFeatureDemo() {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(4.5);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submittedRating, setSubmittedRating] = useState<SubmittedRating | null>(null);
  const [showPrompt, setShowPrompt] = useState(true);

  const handleRatingSubmit = (rating: SubmittedRating) => {
    setSubmittedRating(rating);
    setShowPrompt(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pilot Car Rating Feature Demo
          </h1>
          <p className="text-sm text-gray-600">
            Clean, minimal, and professional rating UI for Truck Driver flow
          </p>
        </div>

        {/* StarRating Component */}
        <Card>
          <CardHeader>
            <CardTitle>1. Star Rating Component</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Small (Interactive)</p>
              <StarRating 
                value={rating1} 
                onChange={setRating1} 
                size="sm" 
              />
              <p className="text-xs text-gray-500 mt-1">
                Current rating: {rating1 || "Not rated"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Medium (Interactive)</p>
              <StarRating 
                value={rating1} 
                onChange={setRating1} 
                size="md" 
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Large (Interactive)</p>
              <StarRating 
                value={rating1} 
                onChange={setRating1} 
                size="lg" 
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Read-only with Value</p>
              <StarRating 
                value={rating2} 
                readonly 
                size="md" 
                showValue 
              />
            </div>
          </CardContent>
        </Card>

        {/* RatingPromptCard Component */}
        <Card>
          <CardHeader>
            <CardTitle>2. Rating Prompt Card</CardTitle>
          </CardHeader>
          <CardContent>
            {showPrompt ? (
              <RatingPromptCard
                tripId="REQ-1015"
                pilotCarName="Rocky Mountain Escorts"
                onRateNow={() => setDrawerOpen(true)}
                onDismiss={() => setShowPrompt(false)}
              />
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-sm text-gray-500 mb-3">Prompt dismissed</p>
                <button
                  onClick={() => setShowPrompt(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Show prompt again
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* RatingDisplay Component */}
        <Card>
          <CardHeader>
            <CardTitle>3. Rating Display (Post-Submission)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {submittedRating ? (
              <div>
                <RatingDisplay rating={submittedRating.overallRating} />
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
                    Submitted Rating Details
                  </p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Trip ID:</strong> {submittedRating.tripId}</p>
                    <p><strong>Pilot Car ID:</strong> {submittedRating.pilotCarId}</p>
                    <p><strong>Overall Rating:</strong> {submittedRating.overallRating.toFixed(1)}★</p>
                    <p><strong>Submitted:</strong> {new Date(submittedRating.timestamp).toLocaleString()}</p>
                    {submittedRating.comments && (
                      <p><strong>Comments:</strong> {submittedRating.comments}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-sm text-gray-500">
                  No rating submitted yet. Click "Rate Now" above to test.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle>4. Test Scenarios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                ✅ Test: Submit a Rating
              </h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Click "Rate Now" in the prompt card above</li>
                <li>Rate all 6 categories (required)</li>
                <li>Optionally add comments</li>
                <li>Click "Submit Rating"</li>
                <li>See success confirmation</li>
                <li>Drawer closes, rating display appears</li>
              </ol>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="text-sm font-semibold text-yellow-900 mb-2">
                ⚠️ Test: Low Rating Alert
              </h4>
              <p className="text-sm text-yellow-800 mb-2">
                Submit a rating with overall ≤ 3.0 to trigger admin notification
              </p>
              <p className="text-xs text-yellow-700">
                Check browser console for alert message
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-sm font-semibold text-green-900 mb-2">
                📱 Test: Mobile Responsiveness
              </h4>
              <p className="text-sm text-green-800">
                Resize browser to mobile width (~375px) to test mobile-first design
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <PrimaryButton
                onClick={() => setDrawerOpen(true)}
                className="w-full"
              >
                Open Rating Drawer
              </PrimaryButton>
              
              <button
                onClick={() => {
                  setSubmittedRating(null);
                  setShowPrompt(true);
                  setRating1(0);
                }}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset Demo
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Design Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>5. Design Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Visual Style</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Minimal & clean design</li>
                  <li>Low visual weight</li>
                  <li>Subtle shadows only</li>
                  <li>Compact spacing</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Colors</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Primary: #F89823 (orange)</li>
                  <li>Text: #1a1a1a (dark)</li>
                  <li>Gray scale for UI</li>
                  <li>Green for success states</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Typography</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Font: Inter only</li>
                  <li>Clear hierarchy</li>
                  <li>Readable sizing</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Accessibility</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>WCAG AA compliant</li>
                  <li>ARIA labels on stars</li>
                  <li>Keyboard navigation</li>
                  <li>Clear visual feedback</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Drawer */}
      <PilotCarRatingDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        tripId="REQ-1015"
        pilotCarId="BID-301-1"
        pilotCarName="Rocky Mountain Escorts"
        onSubmitSuccess={handleRatingSubmit}
      />
    </div>
  );
}
