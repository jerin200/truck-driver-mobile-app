import { Sheet, SheetContent, SheetDescription, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Home, User, LogOut, LayoutDashboard, FileText, Settings, Bell, Menu, Truck } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';

interface AppSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (screen: string) => void;
}

export default function AppSidebar({ open, onOpenChange, onNavigate }: AppSidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard');
  
  const handleNavigate = (screen: string, itemId: string) => {
    setActiveItem(itemId);
    onNavigate(screen);
    onOpenChange(false);
  };

  const menuItems = [
    { id: 'dashboard', screen: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'trips', screen: 'permits', icon: Truck, label: 'Trips' },
    { id: 'profile', screen: 'overview', icon: User, label: 'Profile' },
  ];

  const settingsItems = [
    { id: 'settings', screen: 'preferences', icon: Settings, label: 'Settings' },
    { id: 'notifications', screen: 'notifications', icon: Bell, label: 'Notifications', badge: 23 },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] p-0 bg-white border-none">
        {/* Visually hidden title and description for accessibility */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">Main navigation links for the Overwize Connect app.</SheetDescription>
        
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-4 pb-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F89823] to-[#e67e11] flex items-center justify-center shadow-lg">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <button 
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-lg font-semibold overflow-hidden">
              <User className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-bold text-gray-900">John Davis</span>
              <span className="text-[13px] text-gray-500">Driver Account</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-2">
          {/* Main Menu Items */}
          <div className="px-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.screen, item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-[#F89823] text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className={`text-[15px] font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Settings Section */}
          <div className="px-3 mt-6 space-y-1">
            {settingsItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.screen, item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                    isActive 
                      ? 'bg-[#F89823] text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className={`text-[15px] font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[24px] text-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Logout */}
          <div className="px-3 mt-auto pt-6">
            <button
              onClick={() => {}}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[15px] font-medium">Logout</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}