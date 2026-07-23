import { useState } from 'react';
import { SnackbarProvider } from './contexts/SnackbarContext';
import ProfileOverview from './components/ProfileOverview';
import SecurityAccount from './components/SecurityAccount';
import AppPreferences from './components/AppPreferences';
import Support from './components/Support';
import ResetPassword from './components/ResetPassword';
import TwoFactorAuth from './components/TwoFactorAuth';
import HelpCenter from './components/HelpCenter';
import ContactSupport from './components/ContactSupport';
import NotificationHistory from './components/NotificationHistory';
import DashboardOverview from './components/DashboardOverview';
import ManageTrips from './components/ManageTrips';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './components/ui/alert-dialog';
import { User, Home, FileText, Truck } from 'lucide-react';
import NewPermitApplication from './components/NewPermitApplication';
import ViewPermitRequest from './components/ViewPermitRequest';
import AddJob from './components/AddJob';
import AlertSnackbarDemo from './components/AlertSnackbarDemo';
import PermitsCompactView from './components/PermitsCompactView';
import PermitCardOptions from './components/PermitCardOptions';

type Screen = 'overview' | 'security' | 'preferences' | 'support' | 'reset-password' | '2fa' | 'help-center' | 'contact-support' | 'notifications' | 'dashboard' | 'permits' | 'new-permit-application' | 'view-permit-request' | 'add-job' | 'alert-demo' | 'permits-compact' | 'permit-card-options';

function BottomNav({ currentScreen, onNavigate }: { currentScreen: Screen, onNavigate: (screen: Screen) => void }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'permits', icon: Truck, label: 'Trips' },
  ];

  return (
    <div className="bg-white border-t border-[#e5e7eb] flex items-center w-full z-30 safe-area-inset-bottom">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = (item.id === 'home' && currentScreen === 'dashboard') ||
                         (item.id === 'permits' && currentScreen === 'permits');
        
        return (
          <button
            key={item.id}
            className={`flex-1 flex flex-col items-center gap-1 py-3 relative ${
              isActive ? 'text-blue-600' : 'text-gray-400'
            }`}
            onClick={() => {
              if (item.id === 'home') onNavigate('dashboard');
              if (item.id === 'permits') onNavigate('permits');
            }}
          >
            {/* Active indicator line */}
            {isActive && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
            <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedPermit, setSelectedPermit] = useState<any>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleNavigate = (screen: string, params?: any) => {
    if (params) {
      setSelectedPermit(params);
    }
    setCurrentScreen(screen as Screen);
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    // Logout logic here
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false);
    // Delete account logic here
  };

  // Define screens where footer should be hidden
  const hideFooterScreens: Screen[] = ['view-permit-request', 'new-permit-application', 'add-job', 'alert-demo', 'permits-compact', 'permit-card-options'];
  const showFooter = !hideFooterScreens.includes(currentScreen);

  return (
    <SnackbarProvider>
      <div className="bg-[#f6f6f6] flex flex-col items-center relative h-full max-w-[450px] mx-auto overflow-hidden">
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          {currentScreen === 'dashboard' && <DashboardOverview onNavigate={handleNavigate} />}
          {currentScreen === 'permits' && <ManageTrips onNavigate={handleNavigate} />}
          
          {currentScreen === 'add-job' && (
            <AddJob 
              onBack={() => setCurrentScreen('permits')}
              onSave={() => setCurrentScreen('permits')}
            />
          )}
          {currentScreen === 'new-permit-application' && (
            <NewPermitApplication 
              onNavigate={setCurrentScreen} 
              onBack={() => setCurrentScreen('permits')} 
            />
          )}
          {currentScreen === 'view-permit-request' && selectedPermit && (
            <ViewPermitRequest 
              permit={selectedPermit}
              onBack={() => setCurrentScreen('permits')}
            />
          )}
          {currentScreen === 'overview' && <ProfileOverview onNavigate={setCurrentScreen} onLogout={() => setShowLogoutDialog(true)} />}
          {currentScreen === 'security' && (
            <SecurityAccount 
              onNavigate={setCurrentScreen}
              onLogout={() => setShowLogoutDialog(true)}
              onDeleteAccount={() => setShowDeleteDialog(true)}
            />
          )}
          {currentScreen === 'preferences' && <AppPreferences onNavigate={setCurrentScreen} />}
          {currentScreen === 'support' && <Support onNavigate={setCurrentScreen} />}
          {currentScreen === 'reset-password' && <ResetPassword onNavigate={setCurrentScreen} />}
          {currentScreen === '2fa' && <TwoFactorAuth onNavigate={setCurrentScreen} />}
          {currentScreen === 'help-center' && <HelpCenter onNavigate={setCurrentScreen} />}
          {currentScreen === 'contact-support' && <ContactSupport onNavigate={setCurrentScreen} />}
          {currentScreen === 'notifications' && <NotificationHistory onNavigate={setCurrentScreen} />}
          {currentScreen === 'alert-demo' && <AlertSnackbarDemo onBack={() => setCurrentScreen('dashboard')} />}
          {currentScreen === 'permits-compact' && (
            <PermitsCompactView 
              onBack={() => setCurrentScreen('dashboard')}
              onNavigate={handleNavigate} 
            />
          )}
          {currentScreen === 'permit-card-options' && (
            <PermitCardOptions
              onBack={() => setCurrentScreen('dashboard')}
              onNavigate={handleNavigate}
            />
          )}
        </div>

        {showFooter && <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />}

        {/* Logout Confirmation Dialog */}
        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout from your account?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="bg-[#f89823] text-[#1a1a1a] hover:bg-[#e08820]">
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Account Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                <br /><br />
                <span className="text-[#d45153]">Note: Account deletion is restricted for company-invited users.</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount} className="bg-[#d45153] text-white hover:bg-[#c04145]">
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SnackbarProvider>
  );
}