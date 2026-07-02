import { Clock, Timer, Play, Square } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface TimeTrackingSectionProps {
  breakTimeActive: boolean;
  setBreakTimeActive: (active: boolean) => void;
  breakStartTime: Date | null;
  setBreakStartTime: (time: Date | null) => void;
  totalBreakTime: number;
  setTotalBreakTime: (time: number) => void;
  waitingTimeActive: boolean;
  setWaitingTimeActive: (active: boolean) => void;
  waitingStartTime: Date | null;
  setWaitingStartTime: (time: Date | null) => void;
  totalWaitingTime: number;
  setTotalWaitingTime: (time: number) => void;
}

export function TimeTrackingSection({
  breakTimeActive,
  setBreakTimeActive,
  breakStartTime,
  setBreakStartTime,
  totalBreakTime,
  setTotalBreakTime,
  waitingTimeActive,
  setWaitingTimeActive,
  waitingStartTime,
  setWaitingStartTime,
  totalWaitingTime,
  setTotalWaitingTime,
}: TimeTrackingSectionProps) {
  const [currentBreakTime, setCurrentBreakTime] = useState(0);
  const [currentWaitingTime, setCurrentWaitingTime] = useState(0);

  // Helper function to format milliseconds to HH:MM:SS
  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Update break time counter
  useEffect(() => {
    if (!breakTimeActive || !breakStartTime) {
      setCurrentBreakTime(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentBreakTime(new Date().getTime() - breakStartTime.getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [breakTimeActive, breakStartTime]);

  // Update waiting time counter
  useEffect(() => {
    if (!waitingTimeActive || !waitingStartTime) {
      setCurrentWaitingTime(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentWaitingTime(new Date().getTime() - waitingStartTime.getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [waitingTimeActive, waitingStartTime]);

  const handleBreakToggle = () => {
    if (!breakTimeActive) {
      // Start break
      setBreakTimeActive(true);
      setBreakStartTime(new Date());
    } else {
      // Stop break
      if (breakStartTime) {
        const elapsed = new Date().getTime() - breakStartTime.getTime();
        setTotalBreakTime(totalBreakTime + elapsed);
      }
      setBreakTimeActive(false);
      setBreakStartTime(null);
      setCurrentBreakTime(0);
    }
  };

  const handleWaitingToggle = () => {
    if (!waitingTimeActive) {
      // Start waiting
      setWaitingTimeActive(true);
      setWaitingStartTime(new Date());
    } else {
      // Stop waiting
      if (waitingStartTime) {
        const elapsed = new Date().getTime() - waitingStartTime.getTime();
        setTotalWaitingTime(totalWaitingTime + elapsed);
      }
      setWaitingTimeActive(false);
      setWaitingStartTime(null);
      setCurrentWaitingTime(0);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-amber-50 px-4 py-3 border-b border-amber-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-600">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900">Time Tracking</h3>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {/* Break Time */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Break Time</p>
                <p className="text-xs text-gray-500">Driver rest periods</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase mb-0.5">Total</p>
              <p className="text-lg font-bold text-gray-900 tabular-nums">
                {formatTime(totalBreakTime + currentBreakTime)}
              </p>
            </div>
          </div>
          <Button
            onClick={handleBreakToggle}
            className={
              breakTimeActive
                ? "w-full bg-red-600 hover:bg-red-700 text-white"
                : "w-full bg-green-600 hover:bg-green-700 text-white"
            }
          >
            {breakTimeActive ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                End Break
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Break
              </>
            )}
          </Button>
        </div>

        {/* Waiting Time */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Waiting Time</p>
                <p className="text-xs text-gray-500">Loading, delays, etc.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase mb-0.5">Total</p>
              <p className="text-lg font-bold text-blue-900 tabular-nums">
                {formatTime(totalWaitingTime + currentWaitingTime)}
              </p>
            </div>
          </div>
          <Button
            onClick={handleWaitingToggle}
            className={
              waitingTimeActive
                ? "w-full bg-red-600 hover:bg-red-700 text-white"
                : "w-full bg-blue-600 hover:bg-blue-700 text-white"
            }
          >
            {waitingTimeActive ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                End Waiting
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Waiting
              </>
            )}
          </Button>
        </div>

        {/* Time Summary */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg text-white">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-2">
            Billable Time Summary
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs opacity-75">Break Time</p>
              <p className="text-sm font-bold tabular-nums">
                {formatTime(totalBreakTime + currentBreakTime)}
              </p>
            </div>
            <div>
              <p className="text-xs opacity-75">Waiting Time</p>
              <p className="text-sm font-bold tabular-nums">
                {formatTime(totalWaitingTime + currentWaitingTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
