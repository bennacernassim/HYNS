import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface FormData {
  sellerName: string;
  sellerNationalId: string;
  buyerName: string;
  buyerNationalId: string;
  imei: string;
}

export function SalePurchase() {
  const [formData, setFormData] = useState<FormData>({
    sellerName: '',
    sellerNationalId: '',
    buyerName: '',
    buyerNationalId: '',
    imei: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    return Object.values(formData).every(value => value.trim() !== '') && 
           formData.imei.length === 15;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock success/error for demo
      setResult(Math.random() > 0.2 ? 'success' : 'error');
      setIsSubmitting(false);
    }, 2000);
  };

  const reset = () => {
    setFormData({
      sellerName: '',
      sellerNationalId: '',
      buyerName: '',
      buyerNationalId: '',
      imei: '',
    });
    setResult(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-poppins text-2xl text-gray-900">Register Sale / Purchase</h1>
          <p className="font-roboto text-gray-600 mt-1">Register a smartphone transaction between seller and buyer</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Seller Information */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-poppins text-xl text-gray-700">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sellerName" className="font-roboto">Full Name</Label>
                  <Input
                    id="sellerName"
                    type="text"
                    value={formData.sellerName}
                    onChange={(e) => handleInputChange('sellerName', e.target.value)}
                    placeholder="Enter seller's full name"
                    className="mt-1 font-roboto"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="sellerNationalId" className="font-roboto">National ID</Label>
                  <Input
                    id="sellerNationalId"
                    type="text"
                    value={formData.sellerNationalId}
                    onChange={(e) => handleInputChange('sellerNationalId', e.target.value)}
                    placeholder="Enter national ID number"
                    className="mt-1 font-roboto"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="imei" className="font-roboto">IMEI Number</Label>
                  <Input
                    id="imei"
                    type="text"
                    value={formData.imei}
                    onChange={(e) => handleInputChange('imei', e.target.value.replace(/\D/g, '').slice(0, 15))}
                    placeholder="356789012345678"
                    className="mt-1 font-mono"
                    maxLength={15}
                    required
                  />
                  <p className="font-roboto text-sm text-gray-500 mt-1">
                    15-digit IMEI number of the smartphone being sold
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Buyer Information */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-poppins text-xl text-gray-700">Buyer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="buyerName" className="font-roboto">Full Name</Label>
                  <Input
                    id="buyerName"
                    type="text"
                    value={formData.buyerName}
                    onChange={(e) => handleInputChange('buyerName', e.target.value)}
                    placeholder="Enter buyer's full name"
                    className="mt-1 font-roboto"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="buyerNationalId" className="font-roboto">National ID</Label>
                  <Input
                    id="buyerNationalId"
                    type="text"
                    value={formData.buyerNationalId}
                    onChange={(e) => handleInputChange('buyerNationalId', e.target.value)}
                    placeholder="Enter national ID number"
                    className="mt-1 font-roboto"
                    required
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-poppins text-sm mb-2 text-blue-800">Transaction Summary</h4>
                  <div className="space-y-1 font-roboto text-sm text-blue-700">
                    <p><span className="text-blue-600">Seller:</span> {formData.sellerName || 'Not specified'}</p>
                    <p><span className="text-blue-600">Buyer:</span> {formData.buyerName || 'Not specified'}</p>
                    <p><span className="text-blue-600">IMEI:</span> {formData.imei || 'Not specified'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex gap-4 justify-center">
                <Button 
                  type="submit" 
                  disabled={!validateForm() || isSubmitting}
                  className="bg-hyns-purple hover:bg-purple-700 font-roboto px-8"
                >
                  {isSubmitting ? 'Validating Operation...' : 'Validate Operation'}
                </Button>
                {result && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={reset}
                    className="font-roboto"
                  >
                    New Transaction
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Results */}
        {result && (
          <Card className="shadow-md mt-6">
            <CardContent className="pt-6">
              {result === 'success' && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-hyns-success" />
                  <AlertDescription className="font-roboto text-hyns-success">
                    <strong>Transaction registered successfully!</strong><br />
                    Transaction ID: TXN-{Date.now().toString().slice(-8)}<br />
                    The ownership transfer has been recorded in the HYNS database.
                  </AlertDescription>
                </Alert>
              )}

              {result === 'error' && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-hyns-error" />
                  <AlertDescription className="font-roboto text-hyns-error">
                    <strong>Transaction validation failed</strong><br />
                    Please verify all information and ensure the IMEI is valid and not reported as stolen.
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