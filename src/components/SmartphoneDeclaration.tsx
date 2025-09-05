import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Smartphone, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
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

interface SmartphoneDeclarationProps {
  user: User;
}

export function SmartphoneDeclaration({ user }: SmartphoneDeclarationProps) {
  const [formData, setFormData] = useState({
    nationalId: user.nationalId,
    commercialRegNumber: user.commercialRegNumber || '',
    responsiblePersonId: '',
    brand: '',
    model: '',
    color: '',
    imei: '',
    serialNumber: '',
    purchaseDate: '',
    purchaseLocation: '',
    purchasePrice: '',
    condition: '',
    accessories: '',
    notes: ''
  });

  const [isCheckingIMEI, setIsCheckingIMEI] = useState(false);
  const [imeiStatus, setImeiStatus] = useState<'clean' | 'exists' | 'stolen' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const smartphones = [
    { brand: 'Samsung', models: ['Galaxy S24', 'Galaxy S23', 'Galaxy A54', 'Galaxy Note 20'] },
    { brand: 'iPhone', models: ['iPhone 15 Pro', 'iPhone 14', 'iPhone 13', 'iPhone SE'] },
    { brand: 'Xiaomi', models: ['Mi 13', 'Redmi Note 12', 'Poco F5', 'Mi 11'] },
    { brand: 'Huawei', models: ['P50', 'Nova 9', 'Mate 40', 'Y9a'] },
    { brand: 'Oppo', models: ['Find X5', 'Reno 8', 'A96', 'A76'] },
  ];

  const cities = ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Batna', 'Setif', 'Sidi Bel Abbes'];
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'imei' && value.length === 15) {
      checkIMEI(value);
    }
  };

  const checkIMEI = async (imei: string) => {
    if (imei.length !== 15) return;
    
    setIsCheckingIMEI(true);
    
    // Simulate IMEI check
    setTimeout(() => {
      const random = Math.random();
      if (random > 0.8) {
        setImeiStatus('exists');
      } else if (random > 0.9) {
        setImeiStatus('stolen');
      } else {
        setImeiStatus('clean');
      }
      setIsCheckingIMEI(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imeiStatus === 'exists') {
      toast.error('This IMEI is already registered in the system');
      return;
    }
    
    if (imeiStatus === 'stolen') {
      toast.error('This IMEI is reported as stolen');
      return;
    }

    if (!formData.nationalId || !formData.imei) {
      toast.error('National ID and IMEI are required');
      return;
    }

    if (user.role === 'store' && (!formData.commercialRegNumber || !formData.responsiblePersonId)) {
      toast.error('Store registration requires Commercial Registration Number and Responsible Person ID');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast.success('Smartphone successfully declared and registered!');
      setIsSubmitting(false);
      // Reset form
      setFormData({
        nationalId: user.nationalId,
        commercialRegNumber: user.commercialRegNumber || '',
        responsiblePersonId: '',
        brand: '',
        model: '',
        color: '',
        imei: '',
        serialNumber: '',
        purchaseDate: '',
        purchaseLocation: '',
        purchasePrice: '',
        condition: '',
        accessories: '',
        notes: ''
      });
      setImeiStatus(null);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white">
          Declare Smartphone
        </h1>
        <p className="font-roboto text-gray-600 dark:text-gray-400 mt-2">
          Register your smartphone in the HYNS security system
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-poppins flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-hyns-purple" />
            Smartphone Declaration Form
          </CardTitle>
          <CardDescription className="font-roboto">
            All fields marked with * are required for security verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Security Information */}
            <div className="space-y-4">
              <h3 className="font-poppins font-semibold text-lg flex items-center gap-2">
                <Shield className="h-4 w-4 text-hyns-purple" />
                Security Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationalId" className="font-roboto">National ID (CIN) *</Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) => handleInputChange('nationalId', e.target.value)}
                    className="font-roboto"
                    required
                    readOnly={!!user.nationalId}
                  />
                </div>
                
                {user.role === 'store' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="commercialRegNumber" className="font-roboto">Commercial Registration (RC) *</Label>
                      <Input
                        id="commercialRegNumber"
                        value={formData.commercialRegNumber}
                        onChange={(e) => handleInputChange('commercialRegNumber', e.target.value)}
                        className="font-roboto"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="responsiblePersonId" className="font-roboto">Responsible Person ID *</Label>
                      <Input
                        id="responsiblePersonId"
                        value={formData.responsiblePersonId}
                        onChange={(e) => handleInputChange('responsiblePersonId', e.target.value)}
                        className="font-roboto"
                        required
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Smartphone Information */}
            <div className="space-y-4">
              <h3 className="font-poppins font-semibold text-lg">Smartphone Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand" className="font-roboto">Brand *</Label>
                  <Select value={formData.brand} onValueChange={(value) => handleInputChange('brand', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {smartphones.map(phone => (
                        <SelectItem key={phone.brand} value={phone.brand}>{phone.brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model" className="font-roboto">Model *</Label>
                  <Select 
                    value={formData.model} 
                    onValueChange={(value) => handleInputChange('model', value)}
                    disabled={!formData.brand}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.brand && smartphones.find(p => p.brand === formData.brand)?.models.map(model => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color" className="font-roboto">Color</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="e.g., Black, Blue, Silver"
                    className="font-roboto"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition" className="font-roboto">Condition</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map(condition => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imei" className="font-roboto">IMEI Number *</Label>
                <div className="relative">
                  <Input
                    id="imei"
                    value={formData.imei}
                    onChange={(e) => handleInputChange('imei', e.target.value.replace(/\D/g, '').substring(0, 15))}
                    placeholder="15-digit IMEI number"
                    className="font-roboto pr-10"
                    maxLength={15}
                    required
                  />
                  {isCheckingIMEI && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-hyns-purple border-t-transparent"></div>
                    </div>
                  )}
                </div>
                
                {imeiStatus && (
                  <Alert className={`mt-2 ${
                    imeiStatus === 'clean' ? 'border-hyns-success bg-green-50 dark:bg-green-900/20' :
                    imeiStatus === 'exists' ? 'border-hyns-warning bg-orange-50 dark:bg-orange-900/20' :
                    'border-hyns-error bg-red-50 dark:bg-red-900/20'
                  }`}>
                    <AlertDescription className="font-roboto flex items-center gap-2">
                      {imeiStatus === 'clean' && (
                        <>
                          <CheckCircle className="h-4 w-4 text-hyns-success" />
                          <span className="text-hyns-success">IMEI is clean and available for registration</span>
                        </>
                      )}
                      {imeiStatus === 'exists' && (
                        <>
                          <AlertTriangle className="h-4 w-4 text-hyns-warning" />
                          <span className="text-hyns-warning">This IMEI is already registered in the system</span>
                        </>
                      )}
                      {imeiStatus === 'stolen' && (
                        <>
                          <AlertTriangle className="h-4 w-4 text-hyns-error" />
                          <span className="text-hyns-error">This IMEI is reported as stolen</span>
                        </>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serialNumber" className="font-roboto">Serial Number</Label>
                <Input
                  id="serialNumber"
                  value={formData.serialNumber}
                  onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                  className="font-roboto"
                />
              </div>
            </div>

            {/* Purchase Information */}
            <div className="space-y-4">
              <h3 className="font-poppins font-semibold text-lg">Purchase Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate" className="font-roboto">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    className="font-roboto"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchaseLocation" className="font-roboto">Purchase Location</Label>
                  <Select value={formData.purchaseLocation} onValueChange={(value) => handleInputChange('purchaseLocation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchasePrice" className="font-roboto">Purchase Price (DZD)</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    placeholder="0"
                    className="font-roboto"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="font-poppins font-semibold text-lg">Additional Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="accessories" className="font-roboto">Accessories</Label>
                <Textarea
                  id="accessories"
                  value={formData.accessories}
                  onChange={(e) => handleInputChange('accessories', e.target.value)}
                  placeholder="List any accessories included (charger, case, earphones, etc.)"
                  className="font-roboto"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="font-roboto">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information about the smartphone"
                  className="font-roboto"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button 
                type="submit" 
                className="bg-hyns-purple hover:bg-purple-700 font-roboto"
                disabled={isSubmitting || imeiStatus === 'exists' || imeiStatus === 'stolen'}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Registering...
                  </div>
                ) : (
                  'Register Smartphone'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}