import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Upload, X, FileText, Image as ImageIcon, CheckCircle } from "lucide-react";
import { useSnackbar } from "../contexts/SnackbarContext";

interface RaiseDisputeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  onDisputeSubmitted: (disputeData: DisputeData) => void;
}

export interface DisputeData {
  reason: string;
  description: string;
  evidence: File[];
  submittedOn: string;
}

const DISPUTE_REASONS = [
  "Incorrect amount",
  "Extra charges",
  "Service not completed",
  "Duplicate charge",
  "Other",
];

export default function RaiseDisputeSheet({
  open,
  onOpenChange,
  jobId,
  onDisputeSubmitted,
}: RaiseDisputeSheetProps) {
  const [reason, setReason] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [evidence, setEvidence] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) => {
        const isValidType =
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "application/pdf";
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

        if (!isValidType) {
          showSnackbar("Only JPG, PNG, and PDF files are allowed", "error");
          return false;
        }
        if (!isValidSize) {
          showSnackbar("File size must be less than 10MB", "error");
          return false;
        }
        return true;
      });

      setEvidence((prev) => [...prev, ...validFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setEvidence((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!reason || !description.trim()) {
      showSnackbar("Please complete all required fields", "error");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      const disputeData: DisputeData = {
        reason,
        description,
        evidence,
        submittedOn: new Date().toISOString(),
      };

      onDisputeSubmitted(disputeData);
      showSnackbar(
        "Dispute submitted successfully. The invoice is now under review.",
        "success"
      );

      // Reset form
      setReason("");
      setDescription("");
      setEvidence([]);
      setIsSubmitting(false);
      onOpenChange(false);

      // Show notification feedback
      setTimeout(() => {
        showSnackbar("Pilot car driver has been notified.", "info");
      }, 1500);
    }, 1000);
  };

  const isFormValid = reason && description.trim();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] rounded-t-3xl p-0 flex flex-col"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
          <SheetTitle className="text-xl font-bold text-gray-900">
            Raise Dispute
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600">
            Provide details about the issue with this invoice
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Dispute Reason */}
          <div className="space-y-2">
            <Label htmlFor="dispute-reason" className="text-sm font-semibold text-gray-700">
              Dispute Reason <span className="text-red-500">*</span>
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger
                id="dispute-reason"
                className="h-12 bg-white border-gray-300"
              >
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {DISPUTE_REASONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dispute Description */}
          <div className="space-y-2">
            <Label htmlFor="dispute-description" className="text-sm font-semibold text-gray-700">
              Dispute Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="dispute-description"
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] resize-none bg-white border-gray-300"
            />
            <p className="text-xs text-gray-500">
              {description.length}/500 characters
            </p>
          </div>

          {/* Upload Evidence */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Supporting Evidence <span className="text-gray-400">(Optional)</span>
            </Label>
            <p className="text-xs text-gray-500 mb-3">
              Supported formats: JPG, PNG, PDF (Max 10MB each)
            </p>

            {/* Upload Button */}
            <label
              htmlFor="evidence-upload"
              className="flex items-center justify-center gap-2 h-12 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">
                Add Evidence
              </span>
              <input
                id="evidence-upload"
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Uploaded Files List */}
            {evidence.length > 0 && (
              <div className="space-y-2 mt-4">
                {evidence.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {file.type.startsWith("image/") ? (
                      <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <FileText className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Submit Button */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="w-full h-12 bg-[#F89823] hover:bg-[#E08515] text-[#1a1a1a] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit Dispute
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
