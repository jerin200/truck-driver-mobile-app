import { Label } from './ui/label';

interface InlineUnitSelectorProps {
  lengthUnit: 'ft' | 'm';
  weightUnit: 'lbs' | 'kg';
  onLengthUnitChange: (unit: 'ft' | 'm') => void;
  onWeightUnitChange: (unit: 'lbs' | 'kg') => void;
}

export function InlineUnitSelector({
  lengthUnit,
  weightUnit,
  onLengthUnitChange,
  onWeightUnitChange,
}: InlineUnitSelectorProps) {
  return (
    <div className="sticky top-0 z-30 bg-[#f6f6f6] -mx-4 px-4 pt-2 pb-3">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        
        
        <div className="grid grid-cols-2 gap-4">
          {/* Length Unit Toggle */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-600 font-medium">Length</Label>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => onLengthUnitChange('ft')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  lengthUnit === 'ft'
                    ? 'bg-[#0066cc] text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                ft
              </button>
              <button
                type="button"
                onClick={() => onLengthUnitChange('m')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  lengthUnit === 'm'
                    ? 'bg-[#0066cc] text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                m
              </button>
            </div>
          </div>

          {/* Weight Unit Toggle */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-600 font-medium">Weight</Label>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => onWeightUnitChange('lbs')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  weightUnit === 'lbs'
                    ? 'bg-[#0066cc] text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                lbs
              </button>
              <button
                type="button"
                onClick={() => onWeightUnitChange('kg')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  weightUnit === 'kg'
                    ? 'bg-[#0066cc] text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                kg
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}