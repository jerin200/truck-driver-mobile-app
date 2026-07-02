import { useState } from "react";
import { ArrowLeft, Download, FileText, Share2, Eye, AlertTriangle } from "lucide-react";
import { AlertBanner } from "./ui/alert";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useSnackbar } from "../contexts/SnackbarContext";

interface AlertSnackbarDemoProps {
  onBack: () => void;
}

export default function AlertSnackbarDemo({ onBack }: AlertSnackbarDemoProps) {
  const { showSnackbar } = useSnackbar();
  const [showPermitExpiryAlert, setShowPermitExpiryAlert] = useState(true);
  const [showMissingDataAlert, setShowMissingDataAlert] = useState(true);
  const [showAvailableJobsAlert, setShowAvailableJobsAlert] = useState(true);

  // Snackbar Triggers
  const handleDownloadPermit = () => {
    // Simulate download
    setTimeout(() => {
      showSnackbar("Permit downloaded successfully", "success", 3000);
    }, 500);
  };

  const handleDownloadError = () => {
    showSnackbar(
      "Failed to download permit",
      "error",
      4000,
      "Retry",
      () => {
        console.log("Retry download");
        handleDownloadPermit();
      }
    );
  };

  const handleSharePermit = () => {
    setTimeout(() => {
      showSnackbar("Permit shared successfully", "success", 3000);
    }, 300);
  };

  const handleSaveChanges = () => {
    setTimeout(() => {
      showSnackbar("Changes saved", "info", 2000);
    }, 400);
  };

  const handleNoPilotCars = () => {
    showSnackbar("No pilot cars selected", "warning", 3000);
  };

  return (
    <div className="h-[100dvh] w-full bg-[#f6f6f6] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">
          Alerts & Snackbar Demo
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Alert Examples Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Alert Examples (Persistent)
            </h2>

            {/* Warning Alert - Permit Expiring */}
            {showPermitExpiryAlert && (
              <AlertBanner
                type="warning"
                title="Permit expires in 1 day"
                message="Review expiration dates before continuing"
                ctaLabel="View"
                onCtaClick={() => console.log("View permit details")}
                dismissible
                onDismiss={() => setShowPermitExpiryAlert(false)}
              />
            )}

            {/* Error Alert - Missing Data */}
            {showMissingDataAlert && (
              <AlertBanner
                type="error"
                title="Missing required data"
                message="Complete all required fields to submit your application"
                ctaLabel="Fix Now"
                onCtaClick={() => console.log("Fix missing data")}
                dismissible
                onDismiss={() => setShowMissingDataAlert(false)}
              />
            )}

            {/* Info Alert - Available Jobs */}
            {showAvailableJobsAlert && (
              <AlertBanner
                type="info"
                title="New pilot car jobs available"
                message="3 pilot car jobs are available in your area"
                ctaLabel="View Jobs"
                onCtaClick={() => console.log("View jobs")}
                dismissible
                onDismiss={() => setShowAvailableJobsAlert(false)}
              />
            )}

            {/* Success Alert */}
            <AlertBanner
              type="success"
              message="Job posted successfully"
              dismissible
            />
          </div>

          {/* Snackbar Trigger Examples */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Snackbar Examples (Temporary Feedback)
            </h2>

            <Card className="p-4 space-y-3">
              <h3 className="text-sm font-medium text-gray-900">
                Success Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadPermit}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSharePermit}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveChanges}
                  className="col-span-2"
                >
                  Save Changes
                </Button>
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <h3 className="text-sm font-medium text-gray-900">
                Error Actions
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadError}
                  className="flex items-center gap-2 text-red-600 border-red-300"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Trigger Download Error
                </Button>
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <h3 className="text-sm font-medium text-gray-900">
                Warning Actions
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNoPilotCars}
                  className="flex items-center gap-2 text-amber-600 border-amber-300"
                >
                  <AlertTriangle className="w-4 h-4" />
                  No Pilot Cars Selected
                </Button>
              </div>
            </Card>
          </div>

          {/* Guidelines Card */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              📌 Usage Guidelines
            </h3>
            <div className="space-y-2 text-xs text-blue-700">
              <div>
                <strong>Alerts (Persistent):</strong>
                <ul className="list-disc list-inside ml-2 mt-1">
                  <li>Critical or actionable information</li>
                  <li>Stays until dismissed or resolved</li>
                  <li>Can include CTA buttons</li>
                </ul>
              </div>
              <div>
                <strong>Snackbar (Temporary):</strong>
                <ul className="list-disc list-inside ml-2 mt-1">
                  <li>Quick feedback after actions</li>
                  <li>Auto-dismisses (2-4 seconds)</li>
                  <li>Optional action button</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Reset Alerts Button */}
          <Button
            onClick={() => {
              setShowPermitExpiryAlert(true);
              setShowMissingDataAlert(true);
              setShowAvailableJobsAlert(true);
              showSnackbar("Alerts reset successfully", "info", 2000);
            }}
            className="w-full bg-[#F89823] text-[#1a1a1a] hover:bg-[#e08820]"
          >
            Reset All Alerts
          </Button>

          {/* Padding at bottom for safe area */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}