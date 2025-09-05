import { 
  LayoutDashboard, 
  Shield, 
  Settings, 
  Search,
  Bell,
  User,
  LogOut,
  MapPin,
  Heart,
  ShoppingBag,
  Smartphone
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  user: User;
}

export function Sidebar({ activeView, onViewChange, onLogout, user }: SidebarProps) {
  const userMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'declare-smartphone', label: 'Declare Smartphone', icon: Smartphone },
    { id: 'report-lost', label: 'Report Lost', icon: Search },
    { id: 'report-found', label: 'Report Found', icon: MapPin },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'ai-matching', label: 'AI Matching', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'security', label: 'Admin Panel', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const menuItems = user.role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="font-poppins text-2xl text-hyns-purple">HYNS</h1>
        <p className="font-roboto text-sm text-gray-600 dark:text-gray-400 mt-1">
          {user.role === 'admin' ? 'Admin Panel' : user.role === 'store' ? 'Store Dashboard' : 'Smartphone Recovery'}
        </p>
        <div className="mt-2">
          <p className="font-roboto text-xs text-gray-500 dark:text-gray-500 truncate">
            {user.name}
          </p>
          {user.isVerified && (
            <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
              Verified
            </Badge>
          )}
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Button
                  variant={activeView === item.id ? "default" : "ghost"}
                  className={`w-full justify-start font-roboto relative ${
                    activeView === item.id 
                      ? 'bg-hyns-purple hover:bg-purple-700 text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => onViewChange(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="ml-auto bg-hyns-error text-white text-xs px-2 py-0.5 min-w-[20px] h-5"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-roboto"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}