import { useState } from 'react';
import { X, MapPin, Clock, AlertCircle, Upload } from 'lucide-react';
import { Textarea } from './ui/textarea';

interface ReportIncidentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportIncidentDrawer({ isOpen, onClose }: ReportIncidentDrawerProps) {
  const [formData, setFormData] = useState({
    incidentType: '',
    severity: 'Medium',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Incident Report:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-[20px] shadow-lg max-h-[90dvh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#e5e7eb]">
          <h2 className="text-lg font-semibold text-[#0f172a]">Report Incident</h2>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="size-5 text-[#6b7280]" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Location & Time */}
            <div className="flex items-center gap-3 p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
              <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-4 text-[#3b82f6]" />
                <span className="text-sm text-[#64748b]">40.7128, -74.0060</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-[#f59e0b]" />
                <span className="text-sm text-[#64748b]">15:13</span>
              </div>
            </div>

            {/* Incident Type & Severity Row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Incident Type */}
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-2">
                  Incident Type <span className="text-[#e53935]">*</span>
                </label>
                <select
                  value={formData.incidentType}
                  onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[#e5e7eb] rounded-lg text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#F89823] focus:border-transparent bg-white"
                  required
                >
                  <option value="">Select type</option>
                  <option value="accident">Accident</option>
                  <option value="breakdown">Breakdown</option>
                  <option value="road-closure">Road Closure</option>
                  <option value="weather">Weather</option>
                  <option value="traffic">Traffic Delay</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-2">
                  Severity <span className="text-[#e53935]">*</span>
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[#e5e7eb] rounded-lg text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#F89823] focus:border-transparent bg-white"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-2">
                Description <span className="text-[#e53935]">*</span>
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Include specific details like landmarks, mile markers, or cross streets to help locate the incident accurately."
                required
                className="min-h-32"
              />
            </div>

            {/* Quick Tip */}
            <div className="bg-[#fffbeb] border border-[#fde68a] rounded-lg p-3 flex gap-2">
              <AlertCircle className="size-4 text-[#f59e0b] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-[#92400e] mb-1">Quick Tip</p>
                <p className="text-xs text-[#b45309] leading-relaxed">
                  Include specific details like landmarks, mile markers, or cross streets to help locate the incident accurately.
                </p>
              </div>
            </div>

            {/* Photos Upload */}
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-2">
                Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-[#e5e7eb] rounded-lg p-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="size-12 bg-[#f8fafc] rounded-full flex items-center justify-center">
                    <Upload className="size-6 text-[#94a3b8]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#0f172a]">
                      <button type="button" className="text-[#3b82f6] hover:underline font-medium">
                        Click to upload
                      </button>
                      <span className="text-[#64748b]"> or drag and drop</span>
                    </p>
                    <p className="text-xs text-[#94a3b8] mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="border-t border-[#e5e7eb] p-4 bg-white">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#e5e7eb] rounded-lg text-sm font-medium text-[#0f172a] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-[#F89823] hover:bg-[#e8880f] rounded-lg text-sm font-semibold text-[#1a1a1a] transition-colors"
            >
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
}