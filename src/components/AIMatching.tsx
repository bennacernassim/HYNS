import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Heart, MessageCircle, CheckCircle, Clock, MapPin, Calendar, Star, AlertTriangle } from 'lucide-react';

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

interface Match {
  id: string;
  confidence: 'high' | 'medium' | 'low';
  lostSmartphone: {
    id: string;
    brand: string;
    model: string;
    color: string;
    description: string;
    location: string;
    dateLost: string;
    reporter: string;
    imei?: string;
  };
  foundSmartphone: {
    id: string;
    brand: string;
    model: string;
    color: string;
    description: string;
    location: string;
    dateFound: string;
    reporter: string;
    verificationQuestion: string;
    imei?: string;
  };
  matchedFeatures: string[];
  status: 'new' | 'contacted' | 'verified' | 'rejected';
}

interface AIMatchingProps {
  user: User;
}

export function AIMatching({ user }: AIMatchingProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [verificationAnswer, setVerificationAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const matches: Match[] = [
    {
      id: '1',
      confidence: 'high',
      lostSmartphone: {
        id: 'LOST001',
        brand: 'iPhone',
        model: 'iPhone 14 Pro',
        color: 'Black',
        description: 'Black iPhone 14 Pro with purple case, small crack on screen',
        location: 'Algiers Center',
        dateLost: '2024-01-15',
        reporter: 'Nassim Benali',
        imei: '356789012345678'
      },
      foundSmartphone: {
        id: 'FOUND001',
        brand: 'iPhone',
        model: 'iPhone 14 Pro',
        color: 'Black',
        description: 'Black iPhone with purple protective case, appears to have screen damage',
        location: 'Sidi M\'Hamed, Algiers',
        dateFound: '2024-01-15',
        reporter: 'Yasmine Khelifi',
        verificationQuestion: "What's the lock screen wallpaper?",
        imei: '356789012345678'
      },
      matchedFeatures: ['IMEI match', 'Brand match', 'Model match', 'Color match', 'Location proximity', 'Date match'],
      status: 'new'
    },
    {
      id: '2',
      confidence: 'medium',
      lostSmartphone: {
        id: 'LOST002',
        brand: 'Samsung',
        model: 'Galaxy S23',
        color: 'White',
        description: 'White Samsung Galaxy S23 with blue case',
        location: 'Oran Center',
        dateLost: '2024-01-14',
        reporter: 'Oussama Cherif'
      },
      foundSmartphone: {
        id: 'FOUND002',
        brand: 'Samsung',
        model: 'Galaxy S23',
        color: 'White',
        description: 'White Samsung phone found with protective case',
        location: 'Es Senia, Oran',
        dateFound: '2024-01-14',
        reporter: 'Amina Bouzid',
        verificationQuestion: "What color is the phone case?"
      },
      matchedFeatures: ['Brand match', 'Model match', 'Color match', 'Location proximity', 'Date match'],
      status: 'contacted'
    },
    {
      id: '3',
      confidence: 'low',
      lostSmartphone: {
        id: 'LOST003',
        brand: 'Huawei',
        model: 'P40 Pro',
        color: 'Gold',
        description: 'Gold Huawei P40 Pro with clear case',
        location: 'Constantine',
        dateLost: '2024-01-13',
        reporter: 'Kamel Ramdani'
      },
      foundSmartphone: {
        id: 'FOUND003',
        brand: 'Huawei',
        model: 'P40 Pro',
        color: 'Gold',
        description: 'Gold Huawei smartphone with protective case',
        location: 'El Khroub, Constantine',
        dateFound: '2024-01-13',
        reporter: 'Meriem Touati',
        verificationQuestion: "What's the last app you used?"
      },
      matchedFeatures: ['Brand match', 'Model match', 'Color match', 'Date match'],
      status: 'verified'
    }
  ];

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700/20 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'verified': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleContact = async () => {
    if (!contactMessage.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setContactMessage('');
      // Update match status
      if (selectedMatch) {
        const updatedMatch = { ...selectedMatch, status: 'contacted' as const };
        setSelectedMatch(updatedMatch);
      }
    }, 1000);
  };

  const handleVerification = async () => {
    if (!verificationAnswer.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setVerificationAnswer('');
      // Update match status
      if (selectedMatch) {
        const updatedMatch = { ...selectedMatch, status: 'verified' as const };
        setSelectedMatch(updatedMatch);
      }
    }, 1000);
  };

  const myMatches = matches.filter(match => 
    match.lostSmartphone.reporter === user.name || match.foundSmartphone.reporter === user.name
  );

  const allMatches = matches;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-poppins text-2xl text-gray-900 dark:text-white">AI Matching System</h1>
          <p className="font-roboto text-gray-600 dark:text-gray-400 mt-1">
            Our AI analyzes patterns to find potential matches between lost and found smartphones
          </p>
        </div>

        <Tabs defaultValue="my-matches" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="my-matches" className="font-roboto">My Matches</TabsTrigger>
            <TabsTrigger value="all-matches" className="font-roboto">All Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="my-matches">
            <div className="space-y-4">
              {myMatches.length > 0 ? (
                myMatches.map((match) => (
                  <Card key={match.id} className="shadow-md dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Heart className="h-5 w-5 text-hyns-purple" />
                          <div>
                            <Badge className={getConfidenceColor(match.confidence)}>
                              {match.confidence.toUpperCase()} CONFIDENCE
                            </Badge>
                            <Badge className={`ml-2 ${getStatusColor(match.status)} text-white`}>
                              {match.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMatch(match)}
                              className="font-roboto"
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl dark:bg-gray-800">
                            <DialogHeader>
                              <DialogTitle className="font-poppins text-gray-900 dark:text-white">
                                Match Details
                              </DialogTitle>
                            </DialogHeader>
                            {selectedMatch && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Lost Smartphone */}
                                  <div className="space-y-3">
                                    <h4 className="font-poppins text-sm text-red-600 dark:text-red-400">LOST SMARTPHONE</h4>
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                      <h5 className="font-roboto text-sm text-gray-900 dark:text-gray-300 mb-2">
                                        {selectedMatch.lostSmartphone.brand} {selectedMatch.lostSmartphone.model}
                                      </h5>
                                      <p className="font-roboto text-xs text-gray-600 dark:text-gray-400 mb-2">
                                        Color: {selectedMatch.lostSmartphone.color}
                                      </p>
                                      <p className="font-roboto text-xs text-gray-600 dark:text-gray-400 mb-2">
                                        {selectedMatch.lostSmartphone.description}
                                      </p>
                                      {selectedMatch.lostSmartphone.imei && (
                                        <p className="font-mono text-xs text-blue-600 dark:text-blue-400 mb-2">
                                          IMEI: {selectedMatch.lostSmartphone.imei}
                                        </p>
                                      )}
                                      <div className="space-y-1 text-xs text-gray-500 dark:text-gray-500">
                                        <p><MapPin className="inline h-3 w-3 mr-1" />{selectedMatch.lostSmartphone.location}</p>
                                        <p><Calendar className="inline h-3 w-3 mr-1" />{selectedMatch.lostSmartphone.dateLost}</p>
                                        <p>Reporter: {selectedMatch.lostSmartphone.reporter}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Found Smartphone */}
                                  <div className="space-y-3">
                                    <h4 className="font-poppins text-sm text-blue-600 dark:text-blue-400">FOUND SMARTPHONE</h4>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                      <h5 className="font-roboto text-sm text-gray-900 dark:text-gray-300 mb-2">
                                        {selectedMatch.foundSmartphone.brand} {selectedMatch.foundSmartphone.model}
                                      </h5>
                                      <p className="font-roboto text-xs text-gray-600 dark:text-gray-400 mb-2">
                                        Color: {selectedMatch.foundSmartphone.color}
                                      </p>
                                      <p className="font-roboto text-xs text-gray-600 dark:text-gray-400 mb-2">
                                        {selectedMatch.foundSmartphone.description}
                                      </p>
                                      {selectedMatch.foundSmartphone.imei && (
                                        <p className="font-mono text-xs text-blue-600 dark:text-blue-400 mb-2">
                                          IMEI: {selectedMatch.foundSmartphone.imei}
                                        </p>
                                      )}
                                      <div className="space-y-1 text-xs text-gray-500 dark:text-gray-500">
                                        <p><MapPin className="inline h-3 w-3 mr-1" />{selectedMatch.foundSmartphone.location}</p>
                                        <p><Calendar className="inline h-3 w-3 mr-1" />{selectedMatch.foundSmartphone.dateFound}</p>
                                        <p>Reporter: {selectedMatch.foundSmartphone.reporter}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Matched Features */}
                                <div>
                                  <h4 className="font-poppins text-sm text-gray-700 dark:text-gray-300 mb-3">MATCHED FEATURES</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedMatch.matchedFeatures.map((feature, index) => (
                                      <Badge key={index} variant="outline" className={`text-xs ${
                                        feature === 'IMEI match' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300' :
                                        'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300'
                                      }`}>
                                        <Star className="h-3 w-3 mr-1" />
                                        {feature}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="border-t pt-4 space-y-4">
                                  {selectedMatch.lostSmartphone.reporter === user.name && selectedMatch.status === 'new' && (
                                    <div>
                                      <h4 className="font-poppins text-sm text-gray-700 dark:text-gray-300 mb-2">CONTACT FINDER</h4>
                                      <div className="space-y-3">
                                        <Textarea
                                          placeholder="Send a message to the person who found this smartphone..."
                                          value={contactMessage}
                                          onChange={(e) => setContactMessage(e.target.value)}
                                          className="font-roboto h-20"
                                        />
                                        <Button
                                          onClick={handleContact}
                                          disabled={isSubmitting}
                                          className="bg-hyns-purple hover:bg-purple-700 font-roboto text-white"
                                        >
                                          <MessageCircle className="h-4 w-4 mr-2" />
                                          {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </Button>
                                      </div>
                                    </div>
                                  )}

                                  {selectedMatch.foundSmartphone.reporter === user.name && selectedMatch.status === 'contacted' && (
                                    <div>
                                      <h4 className="font-poppins text-sm text-gray-700 dark:text-gray-300 mb-2">VERIFICATION QUESTION</h4>
                                      <Alert className="mb-3 border-orange-200 bg-orange-50 dark:bg-orange-900/20">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertDescription className="font-roboto text-orange-800 dark:text-orange-300">
                                          The owner needs to answer: <strong>{selectedMatch.foundSmartphone.verificationQuestion}</strong>
                                        </AlertDescription>
                                      </Alert>
                                      <div className="space-y-3">
                                        <Input
                                          placeholder="Enter the owner's answer..."
                                          value={verificationAnswer}
                                          onChange={(e) => setVerificationAnswer(e.target.value)}
                                          className="font-roboto"
                                        />
                                        <Button
                                          onClick={handleVerification}
                                          disabled={isSubmitting}
                                          className="bg-green-600 hover:bg-green-700 font-roboto text-white"
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          {isSubmitting ? 'Verifying...' : 'Verify Owner'}
                                        </Button>
                                      </div>
                                    </div>
                                  )}

                                  {selectedMatch.status === 'verified' && (
                                    <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                                      <CheckCircle className="h-4 w-4" />
                                      <AlertDescription className="font-roboto text-green-800 dark:text-green-300">
                                        <strong>Match Verified!</strong> The owner has been verified. You can now arrange the return of this smartphone.
                                      </AlertDescription>
                                    </Alert>
                                  )}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-roboto text-sm text-red-600 dark:text-red-400 mb-2">Lost Smartphone</h4>
                          <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">
                            {match.lostSmartphone.brand} {match.lostSmartphone.model}
                          </p>
                          <p className="font-roboto text-xs text-gray-600 dark:text-gray-400">{match.lostSmartphone.location}</p>
                        </div>
                        <div>
                          <h4 className="font-roboto text-sm text-blue-600 dark:text-blue-400 mb-2">Found Smartphone</h4>
                          <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">
                            {match.foundSmartphone.brand} {match.foundSmartphone.model}
                          </p>
                          <p className="font-roboto text-xs text-gray-600 dark:text-gray-400">{match.foundSmartphone.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="shadow-md dark:bg-gray-800">
                  <CardContent className="p-12 text-center">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-poppins text-lg text-gray-600 dark:text-gray-400 mb-2">No matches yet</h3>
                    <p className="font-roboto text-sm text-gray-500 dark:text-gray-500">
                      Our AI is continuously analyzing reports to find potential matches for your smartphones.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="all-matches">
            <div className="space-y-4">
              {allMatches.map((match) => (
                <Card key={match.id} className="shadow-md dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-hyns-purple" />
                        <div>
                          <Badge className={getConfidenceColor(match.confidence)}>
                            {match.confidence.toUpperCase()} CONFIDENCE
                          </Badge>
                          <Badge className={`ml-2 ${getStatusColor(match.status)} text-white`}>
                            {match.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="font-roboto text-xs text-gray-500 dark:text-gray-400">
                        Match Score: {match.confidence === 'high' ? '95%' : match.confidence === 'medium' ? '75%' : '55%'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-roboto text-sm text-red-600 dark:text-red-400 mb-2">Lost by {match.lostSmartphone.reporter}</h4>
                        <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">
                          {match.lostSmartphone.brand} {match.lostSmartphone.model}
                        </p>
                        <p className="font-roboto text-xs text-gray-600 dark:text-gray-400">
                          {match.lostSmartphone.location} • {match.lostSmartphone.dateLost}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-roboto text-sm text-blue-600 dark:text-blue-400 mb-2">Found by {match.foundSmartphone.reporter}</h4>
                        <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">
                          {match.foundSmartphone.brand} {match.foundSmartphone.model}
                        </p>
                        <p className="font-roboto text-xs text-gray-600 dark:text-gray-400">
                          {match.foundSmartphone.location} • {match.foundSmartphone.dateFound}
                        </p>
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