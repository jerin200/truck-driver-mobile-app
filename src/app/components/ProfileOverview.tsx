import { ChevronRight, User, Shield, Settings, HelpCircle, Edit2, Truck, LogOut } from 'lucide-react';
import Header from './Header';
import DriverRatingDisplay from './DriverRatingDisplay';

type Screen = 'overview' | 'security' | 'preferences' | 'support' | 'reset-password' | '2fa' | 'help-center' | 'contact-support';

interface ProfileOverviewProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export default function ProfileOverview({ onNavigate, onLogout }: ProfileOverviewProps) {
  const sections = [
    {
      id: 'security' as Screen,
      icon: Shield,
      title: 'Security & Account',
      description: 'Password, 2FA, and settings',
    },
    {
      id: 'preferences' as Screen,
      icon: Settings,
      title: 'App Preferences',
      description: 'Notifications, currency, and policies',
    },
    {
      id: 'support' as Screen,
      icon: HelpCircle,
      title: 'Support',
      description: 'Help center, FAQs, and contact',
    },
  ];

  return (
    <div className="flex flex-col w-full flex-1 bg-[#f6f6f6] overflow-hidden">
      <div className="flex-none">
        <Header 
          title="Profile" 
          onNotificationClick={() => onNavigate('notifications')}
          onProfileClick={() => onNavigate('overview')}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 w-full pb-8 rounded-tl-[20px] rounded-tr-[20px] bg-[#f6f6f6] relative z-20">
          {/* Profile Information + Rating Card - Improved Compact Design */}
          <div className="bg-white rounded-2xl border border-gray-100 px-4 py-5 mx-4 mt-4">
            <div className="flex flex-col items-center text-center">
              {/* Profile Picture - Clickable for Edit */}
              <div className="mb-3 flex justify-center">
                <button className="relative group">
                  <div className="w-20 h-20 rounded-full bg-[#0066cc] flex items-center justify-center">
                    <span className="text-white text-[32px] font-semibold">J</span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <Edit2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              </div>

              {/* User Information */}
              <h2 className="text-lg font-semibold text-gray-900">John Davis</h2>
              <p className="text-sm text-gray-500 mt-1">john.davis@overwizeconnect.com</p>
              <p className="text-sm text-gray-500 mt-1">+1 (555) 234-5678</p>
              
              {/* Account Type Inline */}
              <p className="text-sm text-gray-600 mt-2">
                Truck Driver <span className="text-gray-400">•</span>{" "}
                <span className="text-green-600 font-medium">Active</span>
              </p>

              {/* Divider Before Rating */}
              <div className="border-t border-gray-100 my-3 w-full" />

              {/* Rating Section - Compact Single Line */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="text-lg font-semibold text-gray-900">4.3</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">124 ratings</span>
              </div>
            </div>
          </div>

          {/* Account Settings Card */}
          <div className="flex flex-col gap-3 px-4">
            <h3 className="text-sm font-medium text-gray-900 px-1">Account Settings</h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => onNavigate(section.id)}
                    className="flex items-center w-full justify-between py-3.5 px-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-400" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-black">{section.title}</p>
                        <p className="text-xs text-gray-500">{section.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={onLogout}
            className="text-sm text-red-600 font-medium mt-2 text-center w-full py-2 hover:text-red-700 transition-colors px-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}