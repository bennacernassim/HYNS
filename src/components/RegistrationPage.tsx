import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, CheckCircle, User, Store } from 'lucide-react';

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

interface RegistrationPageProps {
  onRegister: (user: User) => void;
  onBackToLogin: () => void;
}

export function RegistrationPage({ onRegister, onBackToLogin }: RegistrationPageProps) {
  const [activeTab, setActiveTab] = useState<'user' | 'store'>('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationalId: '',
    password: '',
    confirmPassword: '',
    storeName: '',
    commercialRegNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.name.trim()) newErrors.push('Full name is required');
    if (!formData.email.trim()) newErrors.push('Email is required');
    if (!formData.phone.trim()) newErrors.push('Phone number is required');
    if (!formData.nationalId.trim()) newErrors.push('National ID is required');
    if (!formData.password) newErrors.push('Password is required');
    if (formData.password !== formData.confirmPassword) newErrors.push('Passwords do not match');
    
    if (activeTab === 'store') {
      if (!formData.storeName.trim()) newErrors.push('Store name is required');
      if (!formData.commercialRegNumber.trim()) newErrors.push('Commercial registration number is required');
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters');
    }

    if (formData.email && !formData.email.includes('@')) {
      newErrors.push('Please enter a valid email address');
    }

    if (formData.nationalId && formData.nationalId.length < 10) {
      newErrors.push('National ID must be at least 10 characters');
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        nationalId: formData.nationalId,
        role: activeTab,
        storeName: activeTab === 'store' ? formData.storeName : undefined,
        commercialRegNumber: activeTab === 'store' ? formData.commercialRegNumber : undefined,
        isVerified: true // Auto-verify for demo
      };
      
      onRegister(newUser);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onBackToLogin}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-hyns-purple"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-poppins text-2xl text-hyns-purple">HYNS</h1>
                <p className="font-roboto text-sm text-gray-600 dark:text-gray-300">Create your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <h2 className="font-poppins text-3xl text-gray-900 dark:text-white mb-2">Join HYNS</h2>
            <p className="font-roboto text-gray-600 dark:text-gray-400">Help build a safer community</p>
          </div>
          
          <Card className="shadow-lg border-0 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="font-poppins text-xl text-center text-gray-900 dark:text-white">
                Account Registration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'user' | 'store')} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user" className="flex items-center gap-2 font-roboto">
                    <User className="h-4 w-4" />
                    Individual
                  </TabsTrigger>
                  <TabsTrigger value="store" className="flex items-center gap-2 font-roboto">
                    <Store className="h-4 w-4" />
                    Store Owner
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  {errors.length > 0 && (
                    <Alert className="mb-4 border-red-200 bg-red-50 dark:bg-red-900/20">
                      <AlertDescription className="font-roboto text-red-700 dark:text-red-400">
                        <ul className="list-disc list-inside space-y-1">
                          {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Common Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="font-roboto text-gray-700 dark:text-gray-300">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="nationalId" className="font-roboto text-gray-700 dark:text-gray-300">National ID *</Label>
                        <Input
                          id="nationalId"
                          type="text"
                          value={formData.nationalId}
                          onChange={(e) => handleInputChange('nationalId', e.target.value)}
                          className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                          placeholder="National ID number"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="font-roboto text-gray-700 dark:text-gray-300">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="font-roboto text-gray-700 dark:text-gray-300">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <TabsContent value="store" className="mt-0">
                      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <h4 className="font-poppins text-sm text-gray-700 dark:text-gray-300">Store Information</h4>
                        
                        <div>
                          <Label htmlFor="storeName" className="font-roboto text-gray-700 dark:text-gray-300">Store Name *</Label>
                          <Input
                            id="storeName"
                            type="text"
                            value={formData.storeName}
                            onChange={(e) => handleInputChange('storeName', e.target.value)}
                            className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                            placeholder="Your store name"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="commercialRegNumber" className="font-roboto text-gray-700 dark:text-gray-300">Commercial Registration Number *</Label>
                          <Input
                            id="commercialRegNumber"
                            type="text"
                            value={formData.commercialRegNumber}
                            onChange={(e) => handleInputChange('commercialRegNumber', e.target.value)}
                            className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                            placeholder="Commercial registration number"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password" className="font-roboto text-gray-700 dark:text-gray-300">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                          placeholder="Create password"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="confirmPassword" className="font-roboto text-gray-700 dark:text-gray-300">Confirm Password *</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                          placeholder="Confirm password"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-roboto text-sm text-blue-800 dark:text-blue-300">
                            <strong>Security Requirements:</strong>
                          </p>
                          <ul className="font-roboto text-xs text-blue-700 dark:text-blue-400 mt-1 space-y-1">
                            <li>• National ID verification is required for all users</li>
                            <li>• Store owners must provide valid commercial registration</li>
                            <li>• These details are required before reporting electronic devices</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-hyns-purple hover:bg-purple-700 font-roboto text-white"
                    >
                      {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}