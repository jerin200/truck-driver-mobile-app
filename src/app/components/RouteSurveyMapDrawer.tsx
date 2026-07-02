import { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import {
  AlertTriangle,
  Calendar,
  Camera,
  CheckCircle2,
  Flag,
  Image as ImageIcon,
  MapPin,
  Ruler,
  StickyNote,
  X,
} from "lucide-react";
import trackingMapImage from "figma:asset/1f5cbd94e64bd6468d47d611846ed0c8a6eaf1a1.png";

// ── Shared route survey types ────────────────────────────────────────────────
// Observation types available to the pilot car driver during a route survey —
// no other categories exist
export interface SurveyObservationAttachment {
  id: string;
  name: string;
  source: "camera" | "gallery";
}

export interface SurveyObservation {
  id: string;
  type: "load-clearance" | "safety-hazard" | "custom";
  /** Observation title (driver-entered for Custom Observations) */
  title: string;
  /** GPS latitude auto-captured when the observation was created (read-only) */
  latitude: number;
  /** GPS longitude auto-captured when the observation was created (read-only) */
  longitude: number;
  /** Free-text description entered by the pilot car driver */
  description: string;
  /** Photos attached from the device camera or gallery */
  attachments?: SurveyObservationAttachment[];
  recordedAt: string;
}

export interface RouteSurveyInfo {
  status: "Completed";
  completedAt: string;
  surveyorName?: string;
  observations?: number;
  distanceMiles?: number;
  observationsList?: SurveyObservation[];
}

export interface RouteSurveyMapJob {
  id: string;
  pilotJobId?: string;
  state: string;
  stateCode: string;
  origin: string;
  destination: string;
  routeSurvey?: RouteSurveyInfo;
}

interface RouteSurveyMapDrawerProps {
  job: RouteSurveyMapJob | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock surveyed route drawn over the map image (percent coordinates)
const ROUTE_POINTS = [
  { x: 12, y: 86 },
  { x: 26, y: 74 },
  { x: 38, y: 62 },
  { x: 46, y: 50 },
  { x: 58, y: 42 },
  { x: 66, y: 30 },
  { x: 80, y: 20 },
  { x: 88, y: 12 },
];

// Point at fraction t (0..1) along the polyline
const pointAlongRoute = (t: number) => {
  const segments: number[] = [];
  let total = 0;
  for (let i = 0; i < ROUTE_POINTS.length - 1; i++) {
    const dx = ROUTE_POINTS[i + 1].x - ROUTE_POINTS[i].x;
    const dy = ROUTE_POINTS[i + 1].y - ROUTE_POINTS[i].y;
    const len = Math.sqrt(dx * dx + dy * dy);
    segments.push(len);
    total += len;
  }
  let target = t * total;
  for (let i = 0; i < segments.length; i++) {
    if (target <= segments[i]) {
      const f = segments[i] === 0 ? 0 : target / segments[i];
      return {
        x:
          ROUTE_POINTS[i].x +
          (ROUTE_POINTS[i + 1].x - ROUTE_POINTS[i].x) * f,
        y:
          ROUTE_POINTS[i].y +
          (ROUTE_POINTS[i + 1].y - ROUTE_POINTS[i].y) * f,
      };
    }
    target -= segments[i];
  }
  return ROUTE_POINTS[ROUTE_POINTS.length - 1];
};

// Styling per observation type — the only three categories in the survey workflow
const TYPE_STYLES: Record<
  SurveyObservation["type"],
  {
    icon: React.ComponentType<{ className?: string }>;
    marker: string;
    badge: string;
    label: string;
  }
> = {
  "load-clearance": {
    icon: Ruler,
    marker: "bg-amber-500 border-amber-600",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    label: "Load Clearance Issue",
  },
  "safety-hazard": {
    icon: AlertTriangle,
    marker: "bg-red-500 border-red-600",
    badge: "bg-red-50 text-red-700 border-red-200",
    label: "Safety & Hazard Concern",
  },
  custom: {
    icon: StickyNote,
    marker: "bg-blue-500 border-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    label: "Custom Observation",
  },
};

/** Format auto-captured GPS coordinates for the read-only Location / Landmark field */
export const formatGpsCoordinates = (
  latitude: number,
  longitude: number,
) =>
  `${Math.abs(latitude).toFixed(4)}° ${latitude >= 0 ? "N" : "S"}, ${Math.abs(longitude).toFixed(4)}° ${longitude >= 0 ? "E" : "W"}`;

const formatSurveyDateTime = (iso: string) => {
  const d = new Date(iso);
  const date = `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return { date, time };
};

export default function RouteSurveyMapDrawer({
  job,
  open,
  onOpenChange,
}: RouteSurveyMapDrawerProps) {
  const [selectedObsId, setSelectedObsId] = useState<
    string | null
  >(null);
  const listItemRefs = useRef<
    Record<string, HTMLButtonElement | null>
  >({});

  // Reset selection whenever a different job's survey is opened
  useEffect(() => {
    setSelectedObsId(null);
  }, [job?.id, open]);

  if (!job?.routeSurvey) return null;

  const survey = job.routeSurvey;
  const observations = survey.observationsList ?? [];
  const completed = formatSurveyDateTime(survey.completedAt);

  const handleMarkerClick = (obsId: string) => {
    setSelectedObsId(obsId);
    listItemRefs.current[obsId]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        style={{ height: "92vh", maxHeight: "92vh" }}
        className="max-w-[450px] mx-auto"
      >
        <div className="flex flex-col h-full overflow-hidden">
          <DrawerHeader className="text-left relative pb-2 shrink-0">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-8 w-8"
                aria-label="Close route survey map"
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
            <DrawerTitle className="text-[16px]">
              Route Survey Map
            </DrawerTitle>
            <DrawerDescription className="text-xs">
              {job.state} · {job.pilotJobId || job.id}
            </DrawerDescription>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[11px] font-semibold text-[#16A34A]">
                <CheckCircle2 className="h-3 w-3" />
                Survey Completed
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                <Calendar className="h-3 w-3 text-gray-400" />
                {completed.date} · {completed.time}
              </span>
            </div>
          </DrawerHeader>

          {/* Map with surveyed route + observation markers */}
          <div className="relative mx-4 h-[280px] shrink-0 rounded-xl overflow-hidden border border-gray-200 bg-gray-200">
            <img
              src={trackingMapImage}
              alt={`Surveyed route map for ${job.state}`}
              className="w-full h-full object-cover"
            />

            {/* Surveyed route polyline */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polyline
                points={ROUTE_POINTS.map(
                  (p) => `${p.x},${p.y}`,
                ).join(" ")}
                fill="none"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                opacity="0.9"
              />
              <polyline
                points={ROUTE_POINTS.map(
                  (p) => `${p.x},${p.y}`,
                ).join(" ")}
                fill="none"
                stroke="#16A34A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Start pin */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{
                left: `${ROUTE_POINTS[0].x}%`,
                top: `${ROUTE_POINTS[0].y}%`,
              }}
            >
              <div className="w-5 h-5 rounded-full bg-white border-2 border-[#16A34A] flex items-center justify-center shadow">
                <MapPin className="h-3 w-3 text-[#16A34A]" />
              </div>
              <span className="mt-0.5 px-1.5 py-px rounded bg-white/90 text-[9px] font-semibold text-gray-700 shadow whitespace-nowrap">
                {job.origin}
              </span>
            </div>

            {/* End pin */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{
                left: `${ROUTE_POINTS[ROUTE_POINTS.length - 1].x}%`,
                top: `${ROUTE_POINTS[ROUTE_POINTS.length - 1].y}%`,
              }}
            >
              <div className="w-5 h-5 rounded-full bg-[#16A34A] border-2 border-white flex items-center justify-center shadow">
                <Flag className="h-3 w-3 text-white" />
              </div>
              <span className="mt-0.5 px-1.5 py-px rounded bg-white/90 text-[9px] font-semibold text-gray-700 shadow whitespace-nowrap">
                {job.destination}
              </span>
            </div>

            {/* Observation markers along the surveyed route */}
            {observations.map((obs, index) => {
              const pos = pointAlongRoute(
                (index + 1) / (observations.length + 1),
              );
              const isSelected = selectedObsId === obs.id;
              return (
                <button
                  key={obs.id}
                  onClick={() => handleMarkerClick(obs.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center text-[10px] font-bold text-white transition-transform ${
                    TYPE_STYLES[obs.type].marker
                  } ${isSelected ? "scale-125 ring-2 ring-white z-10" : ""}`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                  aria-label={`Observation ${index + 1}: ${obs.title}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* Survey summary strip */}
          <div className="mx-4 mt-3 shrink-0 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5 text-center">
              <p className="text-[13px] font-semibold text-gray-900 tabular-nums">
                {survey.distanceMiles ?? "—"}
              </p>
              <p className="text-[10px] text-gray-500">
                Miles Surveyed
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5 text-center">
              <p className="text-[13px] font-semibold text-gray-900 tabular-nums">
                {survey.observations ?? observations.length}
              </p>
              <p className="text-[10px] text-gray-500">
                Observations
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5 text-center min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 truncate">
                {survey.surveyorName ?? "—"}
              </p>
              <p className="text-[10px] text-gray-500">
                Surveyed By
              </p>
            </div>
          </div>

          {/* Observations list */}
          <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 mt-1">
            <h4 className="text-[12px] font-semibold text-gray-700 mb-2">
              Survey Observations
            </h4>
            {observations.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500">
                  {(survey.observations ?? 0) > 0
                    ? "Observation details are not available for this survey"
                    : "No observations were recorded for this route"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {observations.map((obs, index) => {
                  const typeStyle = TYPE_STYLES[obs.type];
                  const Icon = typeStyle.icon;
                  const recorded = formatSurveyDateTime(
                    obs.recordedAt,
                  );
                  const isSelected = selectedObsId === obs.id;
                  return (
                    <button
                      key={obs.id}
                      ref={(el) => {
                        listItemRefs.current[obs.id] = el;
                      }}
                      onClick={() => setSelectedObsId(obs.id)}
                      className={`w-full text-left bg-white rounded-xl border p-3 transition-colors ${
                        isSelected
                          ? "border-[#16A34A] ring-1 ring-[#BBF7D0] bg-[#F0FDF4]/40"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow ${typeStyle.marker}`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          {/* Observation type + title */}
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[10px] font-medium ${typeStyle.badge}`}
                          >
                            <Icon className="h-3 w-3 shrink-0" />
                            {typeStyle.label}
                          </span>
                          <p className="text-[13px] font-medium text-gray-900 mt-1.5">
                            {obs.title}
                          </p>

                          {/* Location / Landmark — GPS auto-captured, read-only */}
                          <div className="mt-1.5">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                              Location / Landmark
                            </p>
                            <p className="text-[11px] text-gray-600 mt-0.5 flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400 shrink-0" />
                              <span className="tabular-nums">
                                {formatGpsCoordinates(
                                  obs.latitude,
                                  obs.longitude,
                                )}
                              </span>
                              <span className="px-1 py-px rounded bg-gray-100 text-[9px] text-gray-400 font-medium">
                                GPS
                              </span>
                            </p>
                          </div>

                          {/* Description */}
                          <div className="mt-1.5">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                              Description
                            </p>
                            <p className="text-[11px] text-gray-600 mt-0.5 bg-gray-50 border border-gray-100 rounded-lg px-2 py-1.5">
                              {obs.description}
                            </p>
                          </div>

                          {/* Attachments — photos from camera or gallery */}
                          {obs.attachments &&
                            obs.attachments.length > 0 && (
                              <div className="mt-1.5">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                  Attachments (
                                  {obs.attachments.length})
                                </p>
                                <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                                  {obs.attachments.map(
                                    (att) => (
                                      <span
                                        key={att.id}
                                        className="inline-flex items-center gap-1 px-1.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-[10px] text-gray-600"
                                      >
                                        {att.source ===
                                        "camera" ? (
                                          <Camera className="h-3 w-3 text-gray-400" />
                                        ) : (
                                          <ImageIcon className="h-3 w-3 text-gray-400" />
                                        )}
                                        {att.name}
                                      </span>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}

                          <p className="text-[10px] text-gray-400 mt-1.5">
                            Recorded {recorded.date}{" "}
                            {recorded.time}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
