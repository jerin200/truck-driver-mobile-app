import { ArrowLeft } from 'lucide-react';
import Header from './Header';
import SegmentedTabControl from './SegmentedTabControl';

export default function JobDetailsPageSkeleton() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header with skeleton */}
      <Header 
        title={
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center w-[44px] h-[44px] rounded-[12px] hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        }
      />

      {/* Status Bar Skeleton */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        <div className="px-4 py-4">
          {/* Tab Control Skeleton */}
          <div className="mb-4">
            <div className="bg-gray-100 rounded-xl p-1 flex gap-1">
              <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="space-y-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                
                <div className="pt-3 border-t border-gray-100 space-y-3">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="space-y-4">
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                
                <div className="pt-3 border-t border-gray-100 space-y-3">
                  <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="space-y-4">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - Wider content */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
                
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}