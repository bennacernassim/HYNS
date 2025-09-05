import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Bell, Heart, CheckCircle, AlertTriangle, MessageCircle, Clock, Trash2, Mail } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  role: 'user' | 'store' | 'admin';
  storeName?: string;
  commercialRegNumber?: string;
  isVerified: boolean;
}

interface Notification {
  id: string;
  type: 'match' | 'message' | 'approval' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
}

interface NotificationsProps {
  user: User;
}

export function Notifications({ user }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'match',
      title: 'High confidence match found!',
      message: 'Your lost iPhone 14 Pro has been matched with a found smartphone reported by Yasmine Khelifi in Sidi M\'Hamed, Algiers.',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      priority: 'high',
      actionRequired: true
    },
    {
      id: '2',
      type: 'message',
      title: 'New message from finder',
      message: 'Nassim Benali sent you a message about your found Samsung Galaxy smartphone report. They believe it might be theirs.',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: false,
      priority: 'medium',
      actionRequired: true
    },
    {
      id: '3',
      type: 'approval',
      title: 'Report approved',
      message: 'Your lost smartphone report for "Huawei P40 Pro" has been approved by our moderation team and is now active.',
      timestamp: '2024-01-15T08:00:00Z',
      isRead: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'system',
      title: 'Weekly summary available',
      message: 'Your weekly HYNS activity summary is ready. You have 3 active smartphone reports and 1 successful match this week.',
      timestamp: '2024-01-14T18:00:00Z',
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'match',
      title: 'Potential match found',
      message: 'A medium confidence match has been found for your lost Xiaomi smartphone. The device was found in Constantine.',
      timestamp: '2024-01-14T14:22:00Z',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '6',
      type: 'approval',
      title: 'Report under review',
      message: 'Your found smartphone report for "Samsung Galaxy S23" is currently under review by our moderation team.',
      timestamp: '2024-01-14T11:45:00Z',
      isRead: true,
      priority: 'low'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'match': return <Heart className="h-5 w-5 text-hyns-purple" />;
      case 'message': return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'approval': return <CheckCircle className="h-5 w-5 text-hyns-success" />;
      case 'system': return <Bell className="h-5 w-5 text-gray-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700/20 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: false } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);
  const actionRequiredNotifications = notifications.filter(n => n.actionRequired && !n.isRead);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="font-poppins text-2xl text-gray-900 dark:text-white">Notifications</h1>
            <p className="font-roboto text-gray-600 dark:text-gray-400 mt-1">
              Stay updated with your HYNS activity
            </p>
          </div>
          {unreadNotifications.length > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="outline"
              className="font-roboto"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="shadow-md dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-hyns-purple" />
                <div>
                  <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">Total Notifications</p>
                  <p className="font-poppins text-xl text-gray-900 dark:text-white">{notifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">Unread</p>
                  <p className="font-poppins text-xl text-yellow-600">{unreadNotifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">Action Required</p>
                  <p className="font-poppins text-xl text-red-600">{actionRequiredNotifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="all" className="font-roboto">
              All
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">{notifications.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="font-roboto">
              Unread
              {unreadNotifications.length > 0 && (
                <Badge variant="destructive" className="ml-2 bg-red-500">{unreadNotifications.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="action" className="font-roboto">
              Action
              {actionRequiredNotifications.length > 0 && (
                <Badge variant="destructive" className="ml-2 bg-orange-500">{actionRequiredNotifications.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read" className="font-roboto">Read</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`shadow-md dark:bg-gray-800 ${!notification.isRead ? 'border-l-4 border-l-hyns-purple' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-roboto text-sm ${!notification.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && <div className="w-2 h-2 bg-hyns-purple rounded-full"></div>}
                            <Badge className={getPriorityColor(notification.priority)} variant="outline">
                              {notification.priority}
                            </Badge>
                            {notification.actionRequired && (
                              <Badge variant="destructive" className="bg-orange-500 text-white">
                                Action Required
                              </Badge>
                            )}
                          </div>
                          <p className="font-roboto text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {notification.message}
                          </p>
                          <p className="font-roboto text-xs text-gray-500 dark:text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => notification.isRead ? markAsUnread(notification.id) : markAsRead(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          {notification.isRead ? (
                            <Mail className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unread">
            <div className="space-y-3">
              {unreadNotifications.map((notification) => (
                <Card key={notification.id} className="shadow-md dark:bg-gray-800 border-l-4 border-l-hyns-purple">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-roboto text-sm text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <div className="w-2 h-2 bg-hyns-purple rounded-full"></div>
                            <Badge className={getPriorityColor(notification.priority)} variant="outline">
                              {notification.priority}
                            </Badge>
                            {notification.actionRequired && (
                              <Badge variant="destructive" className="bg-orange-500 text-white">
                                Action Required
                              </Badge>
                            )}
                          </div>
                          <p className="font-roboto text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {notification.message}
                          </p>
                          <p className="font-roboto text-xs text-gray-500 dark:text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="action">
            <div className="space-y-3">
              {actionRequiredNotifications.map((notification) => (
                <Card key={notification.id} className="shadow-md dark:bg-gray-800 border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-roboto text-sm text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <Badge variant="destructive" className="bg-orange-500 text-white">
                              Action Required
                            </Badge>
                            <Badge className={getPriorityColor(notification.priority)} variant="outline">
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className="font-roboto text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {notification.message}
                          </p>
                          <p className="font-roboto text-xs text-gray-500 dark:text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="read">
            <div className="space-y-3">
              {readNotifications.map((notification) => (
                <Card key={notification.id} className="shadow-md dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-roboto text-sm text-gray-700 dark:text-gray-300">
                              {notification.title}
                            </h3>
                            <Badge className={getPriorityColor(notification.priority)} variant="outline">
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className="font-roboto text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {notification.message}
                          </p>
                          <p className="font-roboto text-xs text-gray-500 dark:text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsUnread(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}