import React from 'react';
import { useRef, useEffect } from 'react';

interface Tab {
  value: string;
  label: string;
  badge?: string | number;
}

interface SegmentedTabControlProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Tab[];
}

export default function SegmentedTabControl({ activeTab, onTabChange, tabs }: SegmentedTabControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Scroll active tab into view centered
  useEffect(() => {
    const activeButton = buttonRefs.current.get(activeTab);
    const container = containerRef.current;
    
    if (activeButton && container) {
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;
      const containerWidth = container.offsetWidth;
      
      // Calculate scroll position to center the button
      const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeTab]);

  return (
    <div 
      ref={containerRef}
      className="bg-white flex gap-0 w-full border-b border-gray-200 overflow-x-auto"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          ref={(el) => {
            if (el) {
              buttonRefs.current.set(tab.value, el);
            } else {
              buttonRefs.current.delete(tab.value);
            }
          }}
          onClick={() => onTabChange(tab.value)}
          className={`relative pb-3 pt-3 px-4 text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
             activeTab === tab.value 
               ? 'text-[#2563eb] border-[#2563eb]' 
               : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300'
          }`}
        >
          {tab.label} {tab.badge ? `(${tab.badge})` : ''}
        </button>
      ))}
    </div>
  );
}