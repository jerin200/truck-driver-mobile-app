import { Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import Header from './Header';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type Screen = 'overview' | 'security' | 'preferences' | 'support' | 'reset-password' | '2fa' | 'help-center' | 'contact-support';

interface ContactSupportProps {
  onNavigate: (screen: Screen) => void;
}

export default function ContactSupport({ onNavigate }: ContactSupportProps) {
  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Form submission logic here
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ subject: '', category: 'general', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      id: 'email',
      icon: Mail,
      title: 'Email Support',
      value: 'support@overwizeconnect.com',
      description: 'We typically respond within 24 hours',
      color: 'bg-[#eef4ff]',
      iconColor: 'text-[#0066cc]',
    },
    {
      id: 'phone',
      icon: Phone,
      title: 'Phone Support',
      value: '+1 (800) 555-0123',
      description: 'Available Mon-Fri, 09:00-18:00 EST',
      color: 'bg-[#f0fdf4]',
      iconColor: 'text-[#10b981]',
    },
    {
      id: 'live-chat',
      icon: MessageSquare,
      title: 'Live Chat',
      value: 'Start a conversation',
      description: 'Average response time: 5 minutes',
      color: 'bg-[#fef3c7]',
      iconColor: 'text-[#f59e0b]',
    },
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'account', label: 'Account & Billing' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-[#f6f6f6]">
      <div className="flex-none">
        <Header title="Contact Support" onBack={() => onNavigate('support')} showBackButton />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4 w-full pb-8 pt-6 rounded-tl-[20px] rounded-tr-[20px] bg-[#f6f6f6] relative z-20">
          {/* Contact Methods */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-gray-900 px-1">How would you like to reach us?</h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    className="p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full ${method.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${method.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-black mb-0.5">{method.title}</p>
                        <p className="text-sm text-blue-600 font-medium mb-0.5">{method.value}</p>
                        <p className="text-xs text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-gray-900 px-1">Send us a message</h3>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#10b981] flex items-center justify-center mx-auto mb-3">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">Message Sent!</h4>
                <p className="text-sm text-green-700">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-5">
                {/* Category Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="border-gray-200"
                    required
                  />
                </div>

                {/* Message */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-black mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Please provide as much detail as possible..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border-gray-200"
                    required
                    rows={6}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-blue-700 mb-2">Response Time</h3>
            <p className="text-xs text-gray-700">
              Our support team typically responds within 24 hours during business days. For urgent matters, please call our phone support line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}