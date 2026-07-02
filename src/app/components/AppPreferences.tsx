import { ChevronRight, Bell, Shield, FileText, ScrollText } from 'lucide-react';
import { useState } from 'react';
import Header from './Header';

type Screen = 'overview' | 'security' | 'preferences' | 'support' | 'reset-password' | '2fa' | 'help-center' | 'contact-support' | 'notifications';

interface AppPreferencesProps {
  onNavigate: (screen: Screen) => void;
}

export default function AppPreferences({ onNavigate }: AppPreferencesProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<'CAD' | 'USD'>('CAD');

  const preferenceItems = [
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notification History',
      description: 'View past notifications',
      onClick: () => {
        onNavigate('notifications');
      },
    },
  ];

  const legalItems = [
    {
      id: 'privacy',
      icon: Shield,
      title: 'Privacy Policy',
      description: 'How we protect your data',
      onClick: () => {
        // Navigate to privacy policy (placeholder)
      },
    },
    {
      id: 'terms',
      icon: FileText,
      title: 'Terms & Conditions',
      description: 'Terms of service',
      onClick: () => {
        // Navigate to terms (placeholder)
      },
    },
    {
      id: 'agreement',
      icon: ScrollText,
      title: 'User Service Agreement',
      description: 'Service usage agreement',
      onClick: () => {
        // Navigate to agreement (placeholder)
      },
    },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-[#f6f6f6]">
      <div className="flex-none">
        <Header title="App Preferences" onBack={() => onNavigate('overview')} showBackButton />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4 w-full pb-8 pt-6 rounded-tl-[20px] rounded-tr-[20px] bg-[#f6f6f6] relative z-20">
          {/* Section Header */}
          <div className="px-1">
            <p className="text-sm text-gray-500">Customize your app settings and preferences</p>
          </div>

          {/* Settings Card */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-gray-900 px-1">Settings</h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
              {preferenceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className="flex items-center justify-between py-3.5 px-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-400" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-black">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                );
              })}

              {/* Currency Selection */}
              <div className="flex items-center justify-between py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-400">$</span>
                  <div className="text-left">
                    <p className="text-sm font-medium text-black">Currency Type</p>
                    <p className="text-xs text-gray-500">Select your preferred currency</p>
                  </div>
                </div>
                <div className="relative bg-gray-100 rounded-lg p-1 flex-shrink-0">
                  <div 
                    className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-md shadow-sm transition-transform duration-200 ease-out"
                    style={{
                      transform: selectedCurrency === 'USD' ? 'translateX(calc(100% + 8px))' : 'translateX(0)'
                    }}
                  />
                  <div className="relative flex">
                    <button
                      onClick={() => setSelectedCurrency('CAD')}
                      className={`py-1.5 px-3 rounded-md transition-colors duration-200 relative z-10 ${
                        selectedCurrency === 'CAD'
                          ? 'text-black'
                          : 'text-gray-500'
                      }`}
                    >
                      <span className="font-semibold text-sm">CAD</span>
                    </button>
                    <button
                      onClick={() => setSelectedCurrency('USD')}
                      className={`py-1.5 px-3 rounded-md transition-colors duration-200 relative z-10 ${
                        selectedCurrency === 'USD'
                          ? 'text-black'
                          : 'text-gray-500'
                      }`}
                    >
                      <span className="font-semibold text-sm">USD</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal & Policies Card */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-gray-900 px-1">Legal & Policies</h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
              {legalItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className="flex items-center w-full justify-between py-3.5 px-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-400" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-black">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}