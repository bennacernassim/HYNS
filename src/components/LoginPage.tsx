import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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

interface LoginPageProps {
  onLogin: (user: User) => void;
  onShowRegistration: () => void;
}

export function LoginPage({ onLogin, onShowRegistration }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation for demo
    if (email && password) {
      // Mock user data based on email for demo
      const mockUser: User = {
        id: '1',
        name: email.includes('admin') ? 'Oussama Cherif' : email.includes('store') ? 'Nassim Benali' : 'Yasmine Khelifi',
        email,
        phone: '+213555123456',
        nationalId: '1580234567890',
        role: email.includes('admin') ? 'admin' : email.includes('store') ? 'store' : 'user',
        storeName: email.includes('store') ? 'Mobile Center Algiers' : undefined,
        commercialRegNumber: email.includes('store') ? 'RC16/00123456' : undefined,
        isVerified: true
      };
      onLogin(mockUser);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header with About Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div>
                <h1 className="font-poppins text-2xl text-hyns-purple">HYNS</h1>
                <p className="font-roboto text-sm text-gray-600 dark:text-gray-300">Your Honesty, Your Safety</p>
              </div>
              <div className="hidden md:block">
                <p className="font-roboto text-gray-700 dark:text-gray-300 max-w-md">
                  A trusted platform to report, find, and recover lost smartphones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="font-poppins text-3xl text-gray-900 dark:text-white mb-2">Welcome back</h2>
            <p className="font-roboto text-gray-600 dark:text-gray-400">Sign in to your HYNS account</p>
          </div>
          
          <Card className="shadow-lg border-0 dark:bg-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="font-poppins text-xl text-gray-900 dark:text-white">Sign in to your account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="font-roboto text-gray-700 dark:text-gray-300">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    placeholder="Enter your email"
                  />
                  <p className="font-roboto text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Try: admin@hyns.com, store@hyns.com, or user@hyns.com
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="password" className="font-roboto text-gray-700 dark:text-gray-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    placeholder="Enter your password"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-hyns-purple hover:bg-purple-700 font-roboto text-white"
                >
                  Sign in
                </Button>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={onShowRegistration}
                    className="text-hyns-purple hover:text-purple-700 font-roboto text-sm"
                  >
                    Create an account
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">
                © 2024 HYNS. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="mailto:support@hyns.com"
                className="font-roboto text-sm text-hyns-purple hover:text-purple-700"
              >
                Contact: support@hyns.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}