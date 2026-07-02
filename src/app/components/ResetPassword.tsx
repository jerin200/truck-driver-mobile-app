import { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle2, XCircle } from 'lucide-react';
import Header from './Header';
import { Input } from './ui/input';
import { Label } from './ui/label';

type Screen = 'overview' | 'security' | 'preferences' | 'support' | 'reset-password' | '2fa' | 'help-center' | 'contact-support';

interface ResetPasswordProps {
  onNavigate: (screen: Screen) => void;
}

export default function ResetPassword({ onNavigate }: ResetPasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== '';

  const allRequirementsMet = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allRequirementsMet && currentPassword) {
      // Handle password reset logic
      console.log('Password reset submitted');
      // Navigate back to security page
      onNavigate('security');
    }
  };

  const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 className="w-4 h-4 text-[#00a63e]" />
      ) : (
        <XCircle className="w-4 h-4 text-[#d45153]" />
      )}
      <span className={`text-[13px] ${met ? 'text-[#00a63e]' : 'text-[#6b7280]'}`}>{text}</span>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full bg-[#f6f6f6]">
      <div className="flex-none">
        <Header title="Reset Password" onBack={() => onNavigate('security')} showBackButton />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4 w-full pb-8 pt-6 rounded-tl-[20px] rounded-tr-[20px] bg-[#f6f6f6] relative z-20">
          {/* Section Header */}
          <div className="px-1">
            <p className="text-sm text-gray-500">Create a new password for your account</p>
          </div>

          {/* Password Reset Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Password Fields Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-4">
              {/* Current Password */}
              <div>
                <Label htmlFor="current-password" className="text-sm font-medium text-black mb-2 block">
                  Current Password
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <Label htmlFor="new-password" className="text-sm font-medium text-black mb-2 block">
                  New Password
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirm-password" className="text-sm font-medium text-black mb-2 block">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-black mb-3">Password Requirements</h3>
              <div className="flex flex-col gap-2">
                <RequirementItem met={hasMinLength} text="At least 8 characters" />
                <RequirementItem met={hasUpperCase} text="One uppercase letter" />
                <RequirementItem met={hasLowerCase} text="One lowercase letter" />
                <RequirementItem met={hasNumber} text="One number" />
                <RequirementItem met={hasSpecialChar} text="One special character (!@#$%^&*)" />
                {confirmPassword && (
                  <RequirementItem met={passwordsMatch} text="Passwords match" />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!allRequirementsMet || !currentPassword}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all text-center ${
                allRequirementsMet && currentPassword
                  ? 'bg-[#f89823] text-[#1a1a1a] hover:bg-[#e08820] cursor-pointer'
                  : 'bg-[#f5c78a] text-[rgba(26,26,26,0.5)] cursor-not-allowed'
              }`}
            >
              Update Password
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-blue-600 font-medium hover:underline"
                onClick={() => {
                  // Navigate to forgot password flow
                }}
              >
                Forgot your current password?
              </button>
            </div>
          </form>

          {/* Security Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-blue-700 mb-2">Security Tips</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Use a unique password that you don't use elsewhere</li>
              <li>• Avoid using personal information in your password</li>
              <li>• Consider using a password manager</li>
              <li>• Update your password regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}