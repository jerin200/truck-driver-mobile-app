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
  CheckCircle2,
  CornerUpRight,
  Flag,
  MapPin,
  Route as RouteIcon,
  Ruler,
  TrafficCone,
  X,
  Zap,
} from "lucide-react";
import trackingMapImage from "figma:asset/1f5cbd94e64bd6468d47d611846ed0c8a6eaf1a1.png";

// ── Shared route survey types ────────────────────────────────────────────────
export interface SurveyObservation {
  id: string;
  type:
    | "clearance"
    | "construction"
    | "hazard"
    | "road"
    | "utility"
    | "turn";
  severity: "info" | "caution" | "critical";
  title: string;
  location: string;
  milepost?: string;
  recordedAt: string;
  note?: string;
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

const TYPE_ICONS: Record<
  SurveyObservation["type"],
  React.ComponentType<{ className?: string }>
> = {
  clearance: Ruler,
  construction: TrafficCone,
  hazard: AlertTriangle,
  road: RouteIcon,
  utility: Zap,
  turn: CornerUpRight,
};

const SEVERITY_STYLES: Record<
  SurveyObservation["severity"],
  { marker: string; badge: string; label: string }
> = {
  critical: {
    marker: "bg-red-500 border-red-600",
    badge: "bg-red-50 text-red-700 border-red-200",
    label: "Critical",
  },
  caution: {
    marker: "bg-amber-500 border-amber-600",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    label: "Caution",
  },
  info: {
    marker: "bg-blue-500 border-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    label: "Info",
  },
};

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
                    SEVERITY_STYLES[obs.severity].marker
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
                  const Icon = TYPE_ICONS[obs.type];
                  const severity =
                    SEVERITY_STYLES[obs.severity];
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
                          className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow ${severity.marker}`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[13px] font-medium text-gray-900 flex items-center gap-1.5">
                              <Icon className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                              {obs.title}
                            </span>
                            <span
                              className={`shrink-0 px-1.5 py-0.5 rounded-full border text-[10px] font-medium ${severity.badge}`}
                            >
                              {severity.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400 shrink-0" />
                            <span className="truncate">
                              {obs.location}
                            </span>
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {obs.milepost
                              ? `${obs.milepost} · `
                              : ""}
                            Recorded {recorded.date}{" "}
                            {recorded.time}
                          </p>
                          {obs.note && (
                            <p className="text-[11px] text-gray-600 mt-1.5 bg-gray-50 border border-gray-100 rounded-lg px-2 py-1.5">
                              {obs.note}
                            </p>
                          )}
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
