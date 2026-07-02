import { ChevronRight, HelpCircle, Mail, BookOpen, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import Header from './Header';

type Screen = 'overview' | 'security' | 'preferences' | 'support' | 'reset-password' | '2fa' | 'help-center' | 'contact-support';

interface SupportProps {
  onNavigate: (screen: Screen) => void;
}

export default function Support({ onNavigate }: SupportProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const supportItems = [
    {
      id: 'help-center',
      icon: BookOpen,
      title: 'Help Center',
      description: 'Browse help articles and guides',
      onClick: () => {
        onNavigate('help-center');
      },
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contact Support',
      description: 'Get in touch with our support team',
      onClick: () => {
        onNavigate('contact-support');
      },
    },
  ];

  const faqs = [
    {
      id: 'faq1',
      question: 'How do I update my profile information?',
      answer: 'Go to the Profile section and click the "Edit Profile" button. You can update your name, email, phone number, and profile picture.',
    },
    {
      id: 'faq2',
      question: 'How do I reset my password?',
      answer: 'Navigate to Security & Account > Reset Password. You will receive an email with instructions to create a new password.',
    },
    {
      id: 'faq3',
      question: 'What is Two-Factor Authentication?',
      answer: '2FA adds an extra layer of security to your account by requiring a verification code in addition to your password when logging in.',
    },
    {
      id: 'faq4',
      question: 'How do I change my currency preference?',
      answer: 'Go to App Preferences > Currency Type and select your preferred currency (CAD or USD).',
    },
    {
      id: 'faq5',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account from Security & Account > Delete Account. Note that this action is restricted for company-invited users and cannot be undone.',
    },
    {
      id: 'faq6',
      question: 'How do I view my notification history?',
      answer: 'Navigate to App Preferences > Notification History to see all your past notifications with timestamps.',
    },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-[#f6f6f6]">
      <div className="flex-none">
        <Header title="Support" onBack={() => onNavigate('overview')} showBackButton />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4 w-full pb-8 pt-6 rounded-tl-[20px] rounded-tr-[20px] bg-[#f6f6f6] relative z-20">
          {/* Section Header */}
          <div className="px-1">
            <p className="text-sm text-gray-500">Get help and find answers to your questions</p>
          </div>

          {/* Support Items Card */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {supportItems.map((item) => {
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
          </div>

          {/* FAQs Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-medium text-gray-900">Frequently Asked Questions</h3>
            </div>

            <div className="flex flex-col gap-2">
              {faqs.map((faq) => (
                <Collapsible
                  key={faq.id}
                  open={openFaq === faq.id}
                  onOpenChange={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <p className="text-sm font-medium text-black text-left pr-2">{faq.question}</p>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                          openFaq === faq.id ? 'rotate-180' : ''
                        }`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed mt-3">{faq.answer}</p>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-blue-700 mb-2">Need More Help?</h3>
            <p className="text-xs text-gray-700 mb-2">
              Our support team is available 24/7 to assist you.
            </p>
            <p className="text-xs text-gray-700">
              Email: <span className="font-medium">support@overwizeconnect.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}