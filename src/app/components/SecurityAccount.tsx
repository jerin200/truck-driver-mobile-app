import { ChevronRight, Lock, Shield, Trash2, LogOut } from 'lucide-react';
import Header from './Header';
import { useRef } from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';

type Screen = 'overview' | 'security' | 'preferences' | 'support' | 'reset-password' | '2fa' | 'help-center' | 'contact-support';

interface SecurityAccountProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export default function SecurityAccount({ onNavigate, onLogout, onDeleteAccount }: SecurityAccountProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useScrollDirection(scrollRef);
  
  const securityItems = [
    {
      id: 'reset-password',
      icon: Lock,
      title: 'Reset Password',
      description: 'Change your account password',
      onClick: () => {
        onNavigate('reset-password');
      },
    },
    {
      id: '2fa',
      icon: Shield,
      title: 'Two-Factor Authentication',
      description: 'Enable/Disable 2FA for added security',
      onClick: () => {
        onNavigate('2fa');
      },
    },
    {
      id: 'delete',
      icon: Trash2,
      title: 'Delete Account',
      description: 'Permanently delete your account',
      onClick: onDeleteAccount,
      danger: true,
      restricted: true,
    },
    {
      id: 'logout',
      icon: LogOut,
      title: 'Logout',
      description: 'Sign out of your account',
      onClick: onLogout,
    },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-[#f6f6f6]">
      <div className="flex-none">
        <Header title="Security & Account" onBack={() => onNavigate('overview')} showBackButton isVisible={isHeaderVisible} />
      </div>
      <div className="flex-1 overflow-y-auto" ref={scrollRef}>
        <div className="flex flex-col gap-4 p-4 w-full pb-8 pt-6 rounded-tl-[20px] rounded-tr-[20px] bg-[#f6f6f6] relative z-20">
          {/* Section Header */}
          <div className="px-1">
            <p className="text-sm text-gray-500">Manage your security settings and account options</p>
          </div>

          {/* Security Items Card */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {securityItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className="flex items-center justify-between py-3.5 px-4 w-full hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${item.danger ? 'text-red-500' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <p className={`text-sm font-medium ${item.danger ? 'text-red-600' : 'text-black'}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                      {item.restricted && (
                        <p className="text-xs text-[#f89823] mt-0.5">
                          Restricted for company-invited users
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-blue-700 mb-2">Security Tips</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Use a strong, unique password</li>
              <li>• Enable two-factor authentication</li>
              <li>• Never share your password with anyone</li>
              <li>• Review login activity regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}