import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { CheckCircle, AlertTriangle, MapPin, Calendar, Smartphone, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

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

interface ReportLostProps {
  user: User;
}

interface FormData {
  nationalId: string;
  commercialRegNumber: string;
  responsiblePersonId: string;
  brand: string;
  model: string;
  color: string;
  imei: string;
  description: string;
  location: string;
  dateLost: string;
  contactPreference: string;
  reward: string;
}

export function ReportLost({ user }: ReportLostProps) {
  const [formData, setFormData] = useState<FormData>({
    nationalId: user.nationalId,
    commercialRegNumber: user.commercialRegNumber || '',
    responsiblePersonId: '',
    brand: '',
    model: '',
    color: '',
    imei: '',
    description: '',
    location: '',
    dateLost: '',
    contactPreference: 'email',
    reward: '',
  });
  const [isCheckingIMEI, setIsCheckingIMEI] = useState(false);
  const [imeiExists, setImeiExists] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'imei' && value.length === 15) {
      checkIMEIExists(value);
    }
  };

  const checkIMEIExists = async (imei: string) => {
    setIsCheckingIMEI(true);
    
    // Simulate IMEI check
    setTimeout(() => {
      const exists = Math.random() > 0.8; // 20% chance IMEI already exists
      setImeiExists(exists);
      setIsCheckingIMEI(false);
      if (exists) {
        toast.warning('This IMEI is already registered in the system');
      }
    }, 1500);
  };

  const validateForm = () => {
    const basicValid = formData.nationalId && formData.brand && formData.model && formData.color && 
                      formData.description && formData.location && formData.dateLost &&
                      (formData.imei.length === 0 || formData.imei.length === 15);
    
    const storeValid = user.role !== 'store' || (formData.commercialRegNumber && formData.responsiblePersonId);
    
    return basicValid && storeValid && !imeiExists;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nationalId) {
      toast.error('National ID is required');
      return;
    }
    
    if (user.role === 'store' && (!formData.commercialRegNumber || !formData.responsiblePersonId)) {
      toast.error('Store reports require Commercial Registration Number and Responsible Person ID');
      return;
    }
    
    if (imeiExists) {
      toast.error('This IMEI is already registered in the system');
      return;
    }
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult('success');
      setIsSubmitting(false);
      toast.success('Lost smartphone report submitted successfully!');
    }, 2000);
  };

  const reset = () => {
    setFormData({
      nationalId: user.nationalId,
      commercialRegNumber: user.commercialRegNumber || '',
      responsiblePersonId: '',
      brand: '',
      model: '',
      color: '',
      imei: '',
      description: '',
      location: '',
      dateLost: '',
      contactPreference: 'email',
      reward: '',
    });
    setResult(null);
    setImeiExists(false);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="font-poppins text-2xl text-gray-900 dark:text-white">Report Lost Smartphone</h1>
          <p className="font-roboto text-gray-600 dark:text-gray-400 mt-1">
            Help others help you find your lost smartphone
          </p>
        </div>

        {/* User Verification Status */}
        <Card className="shadow-md mb-6 dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-hyns-success" />
                <div>
                  <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">
                    <strong>{user.name}</strong> - Account Verified
                  </p>
                  <p className="font-roboto text-xs text-gray-500 dark:text-gray-400">
                    National ID: {user.nationalId} {user.role === 'store' && `• Store: ${user.storeName}`}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Verified
              </Badge>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-md dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="font-poppins text-xl text-gray-900 dark:text-white">Report Lost Smartphone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Security Information */}
              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                  <Shield className="h-4 w-4 text-hyns-purple" />
                  Security Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nationalId" className="font-roboto text-gray-700 dark:text-gray-300">National ID (CIN) *</Label>
                    <Input
                      id="nationalId"
                      value={formData.nationalId}
                      onChange={(e) => handleInputChange('nationalId', e.target.value)}
                      className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                      required
                      readOnly={!!user.nationalId}
                    />
                  </div>
                  
                  {user.role === 'store' && (
                    <>
                      <div>
                        <Label htmlFor="commercialRegNumber" className="font-roboto text-gray-700 dark:text-gray-300">Commercial Registration (RC) *</Label>
                        <Input
                          id="commercialRegNumber"
                          value={formData.commercialRegNumber}
                          onChange={(e) => handleInputChange('commercialRegNumber', e.target.value)}
                          className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="responsiblePersonId" className="font-roboto text-gray-700 dark:text-gray-300">Responsible Person ID *</Label>
                        <Input
                          id="responsiblePersonId"
                          value={formData.responsiblePersonId}
                          onChange={(e) => handleInputChange('responsiblePersonId', e.target.value)}
                          className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Smartphone Details */}
              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white">Smartphone Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand" className="font-roboto text-gray-700 dark:text-gray-300">Brand *</Label>
                    <Select value={formData.brand} onValueChange={(value) => handleInputChange('brand', value)}>
                      <SelectTrigger className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iPhone">iPhone</SelectItem>
                        <SelectItem value="Samsung">Samsung</SelectItem>
                        <SelectItem value="Huawei">Huawei</SelectItem>
                        <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                        <SelectItem value="Oppo">Oppo</SelectItem>
                        <SelectItem value="OnePlus">OnePlus</SelectItem>
                        <SelectItem value="Google">Google Pixel</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="model" className="font-roboto text-gray-700 dark:text-gray-300">Model *</Label>
                    <Input
                      id="model"
                      type="text"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="e.g., iPhone 14 Pro, Galaxy S23"
                      className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="color" className="font-roboto text-gray-700 dark:text-gray-300">Color *</Label>
                    <Select value={formData.color} onValueChange={(value) => handleInputChange('color', value)}>
                      <SelectTrigger className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Black">Black</SelectItem>
                        <SelectItem value="White">White</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Blue">Blue</SelectItem>
                        <SelectItem value="Red">Red</SelectItem>
                        <SelectItem value="Green">Green</SelectItem>
                        <SelectItem value="Purple">Purple</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="imei" className="font-roboto text-gray-700 dark:text-gray-300">IMEI Number</Label>
                    <div className="relative">
                      <Input
                        id="imei"
                        type="text"
                        value={formData.imei}
                        onChange={(e) => handleInputChange('imei', e.target.value.replace(/\D/g, '').slice(0, 15))}
                        placeholder="356789012345678 (15 digits)"
                        className="mt-1 font-mono bg-gray-50 dark:bg-gray-700 pr-10"
                        maxLength={15}
                      />
                      {isCheckingIMEI && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-hyns-purple border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                    <p className="font-roboto text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Find IMEI in Settings or dial *#06# (Primary matching factor)
                    </p>
                    {imeiExists && (
                      <Alert className="mt-2 border-hyns-warning bg-orange-50 dark:bg-orange-900/20">
                        <AlertTriangle className="h-4 w-4 text-hyns-warning" />
                        <AlertDescription className="font-roboto text-hyns-warning">
                          This IMEI is already registered in the system
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="font-roboto text-gray-700 dark:text-gray-300">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your smartphone in detail (case, screen protector, distinguishing features, etc.)"
                    className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700 h-24"
                    required
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2 mb-3">
                    <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-poppins text-sm text-blue-800 dark:text-blue-300">IMEI-Based Matching</h4>
                      <p className="font-roboto text-xs text-blue-700 dark:text-blue-400">
                        Our AI uses IMEI as the primary factor for accurate smartphone matching
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="font-roboto text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Last Known Location *
                    </Label>
                    <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                      <SelectTrigger className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Algiers">Algiers</SelectItem>
                        <SelectItem value="Oran">Oran</SelectItem>
                        <SelectItem value="Constantine">Constantine</SelectItem>
                        <SelectItem value="Annaba">Annaba</SelectItem>
                        <SelectItem value="Batna">Batna</SelectItem>
                        <SelectItem value="Setif">Sétif</SelectItem>
                        <SelectItem value="Blida">Blida</SelectItem>
                        <SelectItem value="Tlemcen">Tlemcen</SelectItem>
                        <SelectItem value="Bejaia">Béjaïa</SelectItem>
                        <SelectItem value="Skikda">Skikda</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="dateLost" className="font-roboto text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date Lost *
                    </Label>
                    <Input
                      id="dateLost"
                      type="date"
                      value={formData.dateLost}
                      onChange={(e) => handleInputChange('dateLost', e.target.value)}
                      className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPreference" className="font-roboto text-gray-700 dark:text-gray-300">Contact Preference</Label>
                    <Select value={formData.contactPreference} onValueChange={(value) => handleInputChange('contactPreference', value)}>
                      <SelectTrigger className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="both">Email & Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="reward" className="font-roboto text-gray-700 dark:text-gray-300">Reward (Optional)</Label>
                    <Input
                      id="reward"
                      type="text"
                      value={formData.reward}
                      onChange={(e) => handleInputChange('reward', e.target.value)}
                      placeholder="e.g., 5000 DZD, Thank you"
                      className="mt-1 font-roboto bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={!validateForm() || isSubmitting}
                  className="flex-1 bg-hyns-purple hover:bg-purple-700 font-roboto text-white"
                >
                  {isSubmitting ? 'Submitting Report...' : 'Submit Lost Report'}
                </Button>
                {result && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={reset}
                    className="font-roboto"
                  >
                    New Report
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Results */}
        {result && (
          <Card className="shadow-md mt-6 dark:bg-gray-800">
            <CardContent className="pt-6">
              {result === 'success' && (
                <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="h-4 w-4 text-hyns-success" />
                  <AlertDescription className="font-roboto text-hyns-success">
                    <strong>Lost smartphone report submitted successfully!</strong><br />
                    Report ID: LOST-{Date.now().toString().slice(-8)}<br />
                    Your report is now active and will be matched with found smartphones using our AI system.
                  </AlertDescription>
                </Alert>
              )}

              {result === 'error' && (
                <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                  <AlertTriangle className="h-4 w-4 text-hyns-error" />
                  <AlertDescription className="font-roboto text-hyns-error">
                    <strong>Submission failed</strong><br />
                    Please check all required fields and try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}