import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ReportLost } from './components/ReportLost';
import { ReportFound } from './components/ReportFound';
import { AIMatching } from './components/AIMatching';
import { Notifications } from './components/Notifications';
import { ProfilePage } from './components/ProfilePage';
import { SecurityAdmin } from './components/SecurityAdmin';
import { Marketplace } from './components/Marketplace';
import { SmartphoneDeclaration } from './components/SmartphoneDeclaration';

type UserRole = 'user' | 'store' | 'admin';
type View = 'dashboard' | 'report-lost' | 'report-found' | 'ai-matching' | 'notifications' | 'profile' | 'security' | 'marketplace' | 'declare-smartphone';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  role: UserRole;
  storeName?: string;
  commercialRegNumber?: string;
  isVerified: boolean;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>('dashboard');

  const handleLogin = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowRegistration(false);
  };

  const handleShowRegistration = () => {
    setShowRegistration(true);
  };

  const handleBackToLogin = () => {
    setShowRegistration(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveView('dashboard');
  };

  const handleViewChange = (view: string) => {
    setActiveView(view as View);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!isLoggedIn) {
    if (showRegistration) {
      return (
        <RegistrationPage 
          onRegister={handleLogin}
          onBackToLogin={handleBackToLogin}
        />
      );
    }
    return (
      <LoginPage 
        onLogin={handleLogin}
        onShowRegistration={handleShowRegistration}
      />
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={user!} onViewChange={handleViewChange} />;
      case 'report-lost':
        return <ReportLost user={user!} />;
      case 'report-found':
        return <ReportFound user={user!} />;
      case 'ai-matching':
        return <AIMatching user={user!} />;
      case 'notifications':
        return <Notifications user={user!} />;
      case 'profile':
        return <ProfilePage user={user!} onUpdateUser={setUser} onToggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />;
      case 'security':
        return <SecurityAdmin />;
      case 'marketplace':
        return <Marketplace user={user!} />;
      case 'declare-smartphone':
        return <SmartphoneDeclaration user={user!} />;
      default:
        return <Dashboard user={user!} onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar 
        activeView={activeView}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
        user={user!}
      />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        {renderContent()}
      </main>
    </div>
  );
}