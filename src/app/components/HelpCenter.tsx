import { Search, Book, FileText, Settings, Users, HelpCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Header from './Header';
import { Input } from './ui/input';

type Screen = 'overview' | 'security' | 'preferences' | 'support' | 'reset-password' | '2fa' | 'help-center' | 'contact-support';

interface HelpCenterProps {
  onNavigate: (screen: Screen) => void;
}

export default function HelpCenter({ onNavigate }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'getting-started',
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics',
      articleCount: 8,
      color: 'bg-[#eef4ff]',
      iconColor: 'text-[#0066cc]',
    },
    {
      id: 'account-settings',
      icon: FileText,
      title: 'Account & Settings',
      description: 'Manage your profile',
      articleCount: 12,
      color: 'bg-[#f3e8ff]',
      iconColor: 'text-[#7c3aed]',
    },
    {
      id: 'video-tutorials',
      icon: Settings,
      title: 'Video Tutorials',
      description: 'Watch and learn',
      articleCount: 6,
      color: 'bg-[#fef3c7]',
      iconColor: 'text-[#f59e0b]',
    },
    {
      id: 'troubleshooting',
      icon: HelpCircle,
      title: 'Troubleshooting',
      description: 'Fix common issues',
      articleCount: 10,
      color: 'bg-[#fee2e2]',
      iconColor: 'text-[#dc2626]',
    },
  ];

  const popularArticles = [
    {
      id: 'article1',
      title: 'How to update your profile information',
      category: 'Account & Settings',
      readTime: '3 min read',
    },
    {
      id: 'article2',
      title: 'Setting up Two-Factor Authentication',
      category: 'Security',
      readTime: '5 min read',
    },
    {
      id: 'article3',
      title: 'Understanding your dashboard',
      category: 'Getting Started',
      readTime: '4 min read',
    },
    {
      id: 'article4',
      title: 'Managing notification preferences',
      category: 'Account & Settings',
      readTime: '2 min read',
    },
    {
      id: 'article5',
      title: 'How to reset your password',
      category: 'Security',
      readTime: '3 min read',
    },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-[#f6f6f6]">
      <div className="flex-none">
        <Header title="Help Center" onBack={() => onNavigate('support')} showBackButton />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4 w-full pb-8 pt-6 rounded-tl-[20px] rounded-tr-[20px] bg-[#f6f6f6] relative z-20">
          {/* Search Bar */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500 px-1">Find answers to your questions</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <Input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-gray-900 px-1">Browse by Category</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${category.iconColor}`} />
                    </div>
                    <div className="flex flex-col gap-1 text-left">
                      <p className="text-sm font-semibold text-black">{category.title}</p>
                      <p className="text-xs text-gray-500">{category.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{category.articleCount} articles</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popular Articles */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-gray-900 px-1">Popular Articles</h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
              {popularArticles.map((article) => (
                <button
                  key={article.id}
                  className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors w-full"
                >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-black mb-1">{article.title}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Still need help?</h3>
            <p className="text-xs text-white/90 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <button
              onClick={() => onNavigate('contact-support')}
              className="bg-white text-blue-600 px-4 py-2.5 rounded-lg w-full font-semibold hover:bg-white/95 transition-colors text-sm"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}