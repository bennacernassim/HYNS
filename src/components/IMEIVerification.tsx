import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, AlertTriangle, XCircle, ShoppingCart } from 'lucide-react';

type VerificationResult = 'valid' | 'not-found' | 'stolen' | null;

interface IMEIVerificationProps {
  onRegisterSale: () => void;
}

export function IMEIVerification({ onRegisterSale }: IMEIVerificationProps) {
  const [imei, setImei] = useState('');
  const [result, setResult] = useState<VerificationResult>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imei || imei.length !== 15) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock different results based on IMEI for demo
      const lastDigit = parseInt(imei[imei.length - 1]);
      if (lastDigit <= 6) {
        setResult('valid');
      } else if (lastDigit <= 8) {
        setResult('not-found');
      } else {
        setResult('stolen');
      }
      setIsLoading(false);
    }, 1500);
  };

  const reset = () => {
    setImei('');
    setResult(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="font-poppins text-2xl text-gray-900">IMEI Verification</h1>
          <p className="font-roboto text-gray-600 mt-1">Verify smartphone authenticity and status</p>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="font-poppins text-xl">Enter IMEI Number</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <Label htmlFor="imei" className="font-roboto">IMEI (15 digits)</Label>
                <Input
                  id="imei"
                  type="text"
                  value={imei}
                  onChange={(e) => setImei(e.target.value.replace(/\D/g, '').slice(0, 15))}
                  placeholder="356789012345678"
                  className="mt-1 font-mono text-lg"
                  maxLength={15}
                />
                <p className="font-roboto text-sm text-gray-500 mt-1">
                  Enter the 15-digit IMEI number found in Settings or dial *#06#
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  disabled={imei.length !== 15 || isLoading}
                  className="bg-hyns-purple hover:bg-purple-700 font-roboto"
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </Button>
                {result && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={reset}
                    className="font-roboto"
                  >
                    New Verification
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Verification Results */}
        {result && (
          <Card className="shadow-md mt-6">
            <CardHeader>
              <CardTitle className="font-poppins text-xl">Verification Result</CardTitle>
            </CardHeader>
            <CardContent>
              {result === 'valid' && (
                <div className="space-y-4">
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-hyns-success" />
                    <AlertDescription className="font-roboto text-hyns-success">
                      <strong>Smartphone is valid</strong><br />
                      This device is authentic and has no security issues.
                    </AlertDescription>
                  </Alert>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-poppins text-sm mb-2 text-gray-700">Device Information</h4>
                    <div className="space-y-1 font-roboto text-sm">
                      <p><span className="text-gray-500">Brand:</span> Apple</p>
                      <p><span className="text-gray-500">Model:</span> iPhone 14 Pro</p>
                      <p><span className="text-gray-500">Status:</span> <span className="text-hyns-success">Clean</span></p>
                    </div>
                  </div>
                  <Button 
                    onClick={onRegisterSale}
                    className="bg-hyns-purple hover:bg-purple-700 font-roboto"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Register Sale or Purchase
                  </Button>
                </div>
              )}

              {result === 'not-found' && (
                <div className="space-y-4">
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-hyns-warning" />
                    <AlertDescription className="font-roboto text-hyns-warning">
                      <strong>IMEI not found</strong><br />
                      This IMEI is not in our database. The device may be new or unregistered.
                    </AlertDescription>
                  </Alert>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-roboto text-sm text-gray-600">
                      Consider registering this device in the system before proceeding with any transactions.
                    </p>
                  </div>
                  <Button 
                    onClick={onRegisterSale}
                    variant="outline"
                    className="border-hyns-warning text-hyns-warning hover:bg-orange-50 font-roboto"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Register Sale or Purchase
                  </Button>
                </div>
              )}

              {result === 'stolen' && (
                <div className="space-y-4">
                  <Alert className="border-red-200 bg-red-50">
                    <XCircle className="h-4 w-4 text-hyns-error" />
                    <AlertDescription className="font-roboto text-hyns-error">
                      <strong>This smartphone is reported stolen</strong><br />
                      This device has been flagged in our security database. Do not proceed with any transaction.
                    </AlertDescription>
                  </Alert>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-poppins text-sm mb-2 text-red-800">Security Alert</h4>
                    <div className="space-y-1 font-roboto text-sm text-red-700">
                      <p><span className="text-red-500">Reported:</span> 3 days ago</p>
                      <p><span className="text-red-500">Case ID:</span> STL-2024-001</p>
                      <p><span className="text-red-500">Status:</span> Active Investigation</p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="font-roboto text-sm text-yellow-800">
                      <strong>Action Required:</strong> Please contact local authorities if you have information about this device.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}