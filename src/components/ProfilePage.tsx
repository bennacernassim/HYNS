import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { User, CheckCircle, Store, Shield, MapPin, Calendar, Eye, EyeOff, Moon, Sun, Save } from 'lucide-react';

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

interface Report {
  id: string;
  type: 'lost' | 'found';
  itemName: string;
  category: string;
  status: 'active' | 'matched' | 'closed';
  location: string;
  date: string;
}

interface ProfilePageProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export function ProfilePage({ user, onUpdateUser, onToggleDarkMode, isDarkMode }: ProfilePageProps) {
  const [editingProfile, setEditingProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    storeName: user.storeName || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const reports: Report[] = [
    {
      id: '1',
      type: 'lost',
      itemName: 'iPhone 14 Pro',
      category: 'Electronics',
      status: 'matched',
      location: 'Central Park',
      date: '2024-01-15'
    },
    {
      id: '2',
      type: 'found',
      itemName: 'Black Wallet',
      category: 'Personal Items',
      status: 'active',
      location: 'Times Square',
      date: '2024-01-14'
    },
    {
      id: '3',
      type: 'lost',
      itemName: 'House Keys',
      category: 'Keys',
      status: 'closed',
      location: 'Brooklyn Bridge',
      date: '2024-01-13'
    },
    {
      id: '4',
      type: 'found',
      itemName: 'Blue Backpack',
      category: 'Bags',
      status: 'active',
      location: 'Grand Central',
      date: '2024-01-12'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser: User = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        storeName: user.role === 'store' ? formData.storeName : undefined,
      };
      
      onUpdateUser(updatedUser);
      setEditingProfile(false);
      setSaveSuccess(true);
      setIsSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'matched': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const lostReports = reports.filter(r => r.type === 'lost');
  const foundReports = reports.filter(r => r.type === 'found');

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="font-poppins text-2xl text-gray-900 dark:text-white">Profile</h1>
          <p className="font-roboto text-gray-600 dark:text-gray-400 mt-1">
            Manage your account settings and view your activity
          </p>
        </div>

        {saveSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="font-roboto text-green-800 dark:text-green-300">
              Profile updated successfully!
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="profile" className="font-roboto">Profile</TabsTrigger>
            <TabsTrigger value="reports" className="font-roboto">Reports</TabsTrigger>
            <TabsTrigger value="settings" className="font-roboto">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="shadow-md dark:bg-gray-800 lg:col-span-1">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-20 h-20 bg-hyns-purple rounded-full flex items-center justify-center">
                    {user.role === 'store' ? (
                      <Store className="h-10 w-10 text-white" />
                    ) : user.role === 'admin' ? (
                      <Shield className="h-10 w-10 text-white" />
                    ) : (
                      <User className="h-10 w-10 text-white" />
                    )}
                  </div>
                  <CardTitle className="font-poppins text-xl text-gray-900 dark:text-white">
                    {user.name}
                  </CardTitle>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {user.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-roboto text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-roboto text-gray-900 dark:text-gray-300">{user.email}</p>
                    </div>
                    <div>
                      <p className="font-roboto text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-roboto text-gray-900 dark:text-gray-300">{user.phone}</p>
                    </div>
                    <div>
                      <p className="font-roboto text-gray-500 dark:text-gray-400">National ID</p>
                      <p className="font-roboto text-gray-900 dark:text-gray-300">{user.nationalId}</p>
                    </div>
                    {user.role === 'store' && (
                      <>
                        <div>
                          <p className="font-roboto text-gray-500 dark:text-gray-400">Store Name</p>
                          <p className="font-roboto text-gray-900 dark:text-gray-300">{user.storeName}</p>
                        </div>
                        <div>
                          <p className="font-roboto text-gray-500 dark:text-gray-400">Commercial Reg.</p>
                          <p className="font-roboto text-gray-900 dark:text-gray-300">{user.commercialRegNumber}</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Edit Profile Form */}
              <Card className="shadow-md dark:bg-gray-800 lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-poppins text-xl text-gray-900 dark:text-white">Account Information</CardTitle>
                    <Button
                      variant="outline"
                      onClick={() => setEditingProfile(!editingProfile)}
                      className="font-roboto"
                    >
                      {editingProfile ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-roboto text-gray-700 dark:text-gray-300">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!editingProfile}
                        className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="font-roboto text-gray-700 dark:text-gray-300">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!editingProfile}
                        className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="font-roboto text-gray-700 dark:text-gray-300">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!editingProfile}
                        className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    
                    {user.role === 'store' && (
                      <div>
                        <Label htmlFor="storeName" className="font-roboto text-gray-700 dark:text-gray-300">Store Name</Label>
                        <Input
                          id="storeName"
                          type="text"
                          value={formData.storeName}
                          onChange={(e) => handleInputChange('storeName', e.target.value)}
                          disabled={!editingProfile}
                          className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                        />
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-poppins text-sm text-gray-700 dark:text-gray-300 mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword" className="font-roboto text-gray-700 dark:text-gray-300">Current Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                            disabled={!editingProfile}
                            className="font-roboto bg-gray-50 dark:bg-gray-700 pr-10"
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="newPassword" className="font-roboto text-gray-700 dark:text-gray-300">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => handleInputChange('newPassword', e.target.value)}
                            disabled={!editingProfile}
                            className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                            placeholder="Enter new password"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="confirmPassword" className="font-roboto text-gray-700 dark:text-gray-300">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            disabled={!editingProfile}
                            className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {editingProfile && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSubmitting}
                        className="bg-hyns-purple hover:bg-purple-700 font-roboto text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditingProfile(false)}
                        className="font-roboto"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lost Reports */}
              <Card className="shadow-md dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="font-poppins text-lg text-red-600 dark:text-red-400">
                    Lost Reports ({lostReports.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lostReports.map((report) => (
                      <div key={report.id} className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-roboto text-sm text-gray-900 dark:text-gray-300">{report.itemName}</h4>
                          <Badge className={getStatusColor(report.status)} variant="outline">
                            {report.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                          <p className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {report.location}
                          </p>
                          <p className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {report.date}
                          </p>
                          <p>Category: {report.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Found Reports */}
              <Card className="shadow-md dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="font-poppins text-lg text-blue-600 dark:text-blue-400">
                    Found Reports ({foundReports.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {foundReports.map((report) => (
                      <div key={report.id} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-roboto text-sm text-gray-900 dark:text-gray-300">{report.itemName}</h4>
                          <Badge className={getStatusColor(report.status)} variant="outline">
                            {report.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                          <p className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {report.location}
                          </p>
                          <p className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {report.date}
                          </p>
                          <p>Category: {report.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="font-poppins text-xl text-gray-900 dark:text-white">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    {isDarkMode ? (
                      <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    )}
                    <div>
                      <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">Dark Mode</p>
                      <p className="font-roboto text-xs text-gray-500 dark:text-gray-400">
                        Switch between light and dark themes
                      </p>
                    </div>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-poppins text-sm text-gray-700 dark:text-gray-300">Notification Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">Email Notifications</p>
                        <p className="font-roboto text-xs text-gray-500 dark:text-gray-400">Receive match alerts via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">SMS Notifications</p>
                        <p className="font-roboto text-xs text-gray-500 dark:text-gray-400">Receive urgent alerts via SMS</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">Weekly Summary</p>
                        <p className="font-roboto text-xs text-gray-500 dark:text-gray-400">Weekly activity summary</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-poppins text-sm text-gray-700 dark:text-gray-300">Privacy Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">Show Phone Number</p>
                        <p className="font-roboto text-xs text-gray-500 dark:text-gray-400">Allow others to see your phone number</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">Public Profile</p>
                        <p className="font-roboto text-xs text-gray-500 dark:text-gray-400">Make your profile visible to other users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}