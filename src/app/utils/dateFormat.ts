/**
 * Centralized date & time formatting utilities for the Overwize Connect app.
 * - Dates: MM/DD/YYYY
 * - Times: 24-hour format (no AM/PM)
 */

/** Format a Date object or date string as MM/DD/YYYY */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

/** Format a Date object or date string as HH:MM (24-hour) */
export function formatTime24h(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

/** Format a Date object or date string as MM/DD/YYYY HH:MM */
export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} ${formatTime24h(date)}`;
}

/** Format a Date object or date string as MM/DD/YYYY • HH:MM */
export function formatDateTimeBullet(date: Date | string): string {
  return `${formatDate(date)} • ${formatTime24h(date)}`;
}

/**
 * Convert a 12-hour time string (e.g. "08:00 AM", "02:00 PM") to 24-hour format.
 * Returns the time in "HH:MM" format.
 */
export function convertTo24h(timeStr: string): string {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return timeStr; // Return as-is if not AM/PM format
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toUpperCase();
  if (period === 'AM' && hours === 12) hours = 0;
  if (period === 'PM' && hours !== 12) hours += 12;
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

/**
 * Convert a "Month DD, YYYY" date string to "MM/DD/YYYY" format.
 * e.g. "Feb 15, 2026" → "02/15/2026"
 */
export function convertDateStr(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return formatDate(d);
}
