import { Bell, CheckCircle2, AlertCircle, Info, Trash2, Filter } from 'lucide-react';
import { useState } from 'react';
import Header from './Header';
import { Badge } from './ui/badge';

type Screen = 'overview' | 'security' | 'preferences' | 'support' | 'reset-password' | '2fa' | 'help-center' | 'contact-support' | 'notifications';

interface NotificationHistoryProps {
  onNavigate: (screen: Screen) => void;
}

type NotificationType = 'info' | 'success' | 'warning';
type FilterType = 'all' | 'info' | 'success' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  date: Date;
}

export default function NotificationHistory({ onNavigate }: NotificationHistoryProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Trip Completed',
      message: 'Your delivery to Chicago, IL has been marked as complete. Payment is being processed.',
      timestamp: '2 hours ago',
      read: false,
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: '2',
      type: 'info',
      title: 'New Route Assignment',
      message: 'You have been assigned a new route from Dallas, TX to Houston, TX. Departure scheduled for tomorrow at 06:00.',
      timestamp: '5 hours ago',
      read: false,
      date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: '3',
      type: 'warning',
      title: 'Document Expiring Soon',
      message: 'Your commercial driver\'s license will expire in 30 days. Please update your credentials.',
      timestamp: '1 day ago',
      read: true,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: '4',
      type: 'success',
      title: 'Payment Received',
      message: 'Your payment of $2,450.00 for route #TR-4891 has been successfully processed.',
      timestamp: '2 days ago',
      read: true,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: '5',
      type: 'info',
      title: 'Weather Alert',
      message: 'Heavy snow expected along I-80 corridor. Please check road conditions before departure.',
      timestamp: '2 days ago',
      read: true,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: '6',
      type: 'warning',
      title: 'Maintenance Reminder',
      message: 'Vehicle #TRK-2341 is due for scheduled maintenance in 500 miles.',
      timestamp: '3 days ago',
      read: true,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: '7',
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated.',
      timestamp: '4 days ago',
      read: true,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    },
    {
      id: '8',
      type: 'info',
      title: 'System Update',
      message: 'Overwize Connect has been updated to version 2.4.1. Check out the new features!',
      timestamp: '5 days ago',
      read: true,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
    {
      id: '9',
      type: 'success',
      title: 'Fuel Receipt Uploaded',
      message: 'Your fuel receipt for $345.67 has been uploaded and is pending approval.',
      timestamp: '6 days ago',
      read: true,
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    },
    {
      id: '10',
      type: 'info',
      title: 'New Message Received',
      message: 'You have a new message from dispatch regarding your next assignment.',
      timestamp: '1 week ago',
      read: true,
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    },
  ]);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return CheckCircle2;
      case 'warning':
        return AlertCircle;
      case 'info':
      default:
        return Info;
    }
  };

  const getNotificationColors = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-[#d1fae5]',
          icon: 'text-[#059669]',
          badge: 'bg-[#059669]',
        };
      case 'warning':
        return {
          bg: 'bg-[#fed7aa]',
          icon: 'text-[#ea580c]',
          badge: 'bg-[#ea580c]',
        };
      case 'info':
      default:
        return {
          bg: 'bg-[#dbeafe]',
          icon: 'text-[#0066cc]',
          badge: 'bg-[#0066cc]',
        };
    }
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getDateGroup = (date: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const notificationDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (notificationDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (notificationDate.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    } else if (date >= weekAgo) {
      return 'This Week';
    } else {
      return 'Earlier';
    }
  };

  const groupNotificationsByDate = (notifications: Notification[]) => {
    const groups: { [key: string]: Notification[] } = {
      Today: [],
      Yesterday: [],
      'This Week': [],
      Earlier: [],
    };

    notifications.forEach((notification) => {
      const group = getDateGroup(notification.date);
      groups[group].push(notification);
    });

    return groups;
  };

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const groupedNotifications = groupNotificationsByDate(filteredNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col w-full flex-1 bg-[#f6f6f6] overflow-hidden">
      <div className="flex-none">
        <Header title="Notifications" onBack={() => onNavigate('preferences')} showBackButton />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 p-4 w-full pb-8 rounded-tl-[20px] rounded-tr-[20px] bg-[#f6f6f6] relative z-20">
          {/* Header Info */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#6b7280]">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-[13px] text-[#0066cc] font-semibold hover:text-[#0052a3] transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Filter Buttons */}


          {/* Notifications List */}
          <div className="flex flex-col gap-3">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                  <Bell className="w-8 h-8 text-[#9ca3af]" />
                </div>
                <p className="text-[16px] font-semibold text-black">No notifications</p>
                <p className="text-[13px] text-[#6b7280] text-center">
                  {filter === 'all'
                    ? "You're all caught up! New notifications will appear here."
                    : `No ${filter} notifications at this time.`}
                </p>
              </div>
            ) : (
              Object.keys(groupedNotifications).map((group) => {
                const groupNotifications = groupedNotifications[group];
                if (groupNotifications.length > 0) {
                  return (
                    <div key={group} className="flex flex-col gap-3">
                      <p className="text-[14px] font-semibold text-[#6b7280]">{group}</p>
                      {groupNotifications.map((notification) => {
                        const Icon = getNotificationIcon(notification.type);
                        const colors = getNotificationColors(notification.type);

                        return (
                          <div
                            key={notification.id}
                            className={`rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)] p-4 flex gap-3 transition-all ${
                              !notification.read ? 'bg-blue-50' : 'bg-white'
                            }`}
                            onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <p className="text-[15px] font-semibold text-black">{notification.title}</p>
                                {!notification.read && (
                                  <div className={`w-2 h-2 rounded-full ${colors.badge} flex-shrink-0 mt-1.5`} />
                                )}
                              </div>
                              <p className="text-[13px] text-[#6b7280] mb-2 leading-relaxed">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-[12px] text-[#9ca3af]">{notification.timestamp}</p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(notification.id);
                                  }}
                                  className="text-[#d45153] hover:text-[#c04145] transition-colors p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                return null;
              })
            )}
          </div>

          {/* Info Card */}
          {notifications.length > 0 && (
            <div className="bg-gradient-to-r from-[#eef4ff] to-[#dbeafe] rounded-[8px] p-4 border border-[#bfdbfe]">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#0066cc] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[14px] font-semibold text-[#1e3a8a] mb-1">
                    Manage Your Notifications
                  </p>
                  <p className="text-[12px] text-[#1e40af]">
                    Tap on unread notifications to mark them as read, or swipe to delete individual items.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}