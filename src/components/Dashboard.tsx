import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, MapPin, List, Calendar, Filter, Plus, AlertTriangle, CheckCircle, Clock, Heart } from 'lucide-react';

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

interface DashboardProps {
  user: User;
  onViewChange: (view: string) => void;
}

export function Dashboard({ user, onViewChange }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const recentReports = [
    { id: '1', type: 'Lost', item: 'iPhone 14 Pro', location: 'Sidi M\'Hamed, Algiers', status: 'active', time: '2 hours ago', category: 'Smartphones' },
    { id: '2', type: 'Found', item: 'Samsung Galaxy S23', location: 'Es Senia, Oran', status: 'pending', time: '4 hours ago', category: 'Smartphones' },
    { id: '3', type: 'Lost', item: 'Huawei P40 Pro', location: 'El Khroub, Constantine', status: 'matched', time: '6 hours ago', category: 'Smartphones' },
    { id: '4', type: 'Found', item: 'Xiaomi Redmi Note', location: 'Annaba Center', status: 'active', time: '1 day ago', category: 'Smartphones' },
  ];

  const matchingAlerts = [
    { id: '1', message: 'Potential match found for your lost smartphone', confidence: 'high', time: '30 min ago' },
    { id: '2', message: 'New found smartphone matches your description', confidence: 'medium', time: '2 hours ago' },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-poppins text-2xl text-gray-900 dark:text-white">Dashboard</h1>
          <p className="font-roboto text-gray-600 dark:text-gray-400 mt-1">
            Welcome back, {user.name}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => onViewChange('report-lost')}
            variant="outline"
            className="font-roboto border-hyns-purple text-hyns-purple hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            Report Lost
          </Button>
          <Button 
            onClick={() => onViewChange('report-found')}
            className="bg-hyns-purple hover:bg-purple-700 font-roboto text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Report Found
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-md mb-6 dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search lost or found smartphones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-roboto bg-gray-50 dark:bg-gray-700"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 font-roboto">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="iphone">iPhone</SelectItem>
                  <SelectItem value="samsung">Samsung</SelectItem>
                  <SelectItem value="huawei">Huawei</SelectItem>
                  <SelectItem value="xiaomi">Xiaomi</SelectItem>
                  <SelectItem value="oppo">Oppo</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-32 font-roboto">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'map')}>
                <TabsList>
                  <TabsTrigger value="list" className="font-roboto">
                    <List className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="map" className="font-roboto">
                    <MapPin className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'map')}>
        <TabsContent value="list">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Total Reports Card */}
            <Card className="shadow-md dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="font-poppins text-lg text-gray-700 dark:text-gray-300">Your Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-poppins text-hyns-purple mb-2">24</div>
                <p className="font-roboto text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-hyns-success">+3</span> this week
                </p>
                <div className="flex gap-4 mt-3 text-sm">
                  <div className="text-center">
                    <div className="font-poppins text-orange-500">12</div>
                    <div className="font-roboto text-xs text-gray-500">Lost</div>
                  </div>
                  <div className="text-center">
                    <div className="font-poppins text-blue-500">12</div>
                    <div className="font-roboto text-xs text-gray-500">Found</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports Card */}
            <Card className="shadow-md dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="font-poppins text-lg text-gray-700 dark:text-gray-300">Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.slice(0, 4).map((report) => (
                    <div key={report.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={report.type === 'Lost' ? 'destructive' : 'default'} className={
                            report.type === 'Lost' ? 'bg-orange-500' : 'bg-blue-500'
                          }>
                            {report.type}
                          </Badge>
                          <span className="font-roboto text-sm dark:text-gray-300">{report.item}</span>
                          {report.status === 'active' && <CheckCircle className="h-3 w-3 text-hyns-success" />}
                          {report.status === 'pending' && <Clock className="h-3 w-3 text-hyns-warning" />}
                          {report.status === 'matched' && <Heart className="h-3 w-3 text-red-500" />}
                        </div>
                        <p className="font-roboto text-xs text-gray-500 dark:text-gray-400">{report.location}</p>
                      </div>
                      <span className="font-roboto text-xs text-gray-400 dark:text-gray-500">{report.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Matching Alerts Card */}
            <Card className="shadow-md dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="font-poppins text-lg text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  AI Matching Alerts
                  {matchingAlerts.length > 0 && (
                    <Badge variant="destructive" className="bg-hyns-purple">
                      {matchingAlerts.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {matchingAlerts.length > 0 ? (
                  <div className="space-y-3">
                    {matchingAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-2 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                        <Heart className="h-4 w-4 text-hyns-purple mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-roboto text-sm text-gray-900 dark:text-gray-300">{alert.message}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={
                              alert.confidence === 'high' ? 'border-green-500 text-green-700' : 
                              alert.confidence === 'medium' ? 'border-yellow-500 text-yellow-700' : 
                              'border-gray-500 text-gray-700'
                            }>
                              {alert.confidence} confidence
                            </Badge>
                            <span className="font-roboto text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      onClick={() => onViewChange('ai-matching')}
                      variant="outline" 
                      size="sm"
                      className="w-full mt-2 text-hyns-purple border-hyns-purple hover:bg-purple-50 dark:hover:bg-purple-900/20 font-roboto"
                    >
                      View All Matches
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Heart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="font-roboto text-sm text-gray-500 dark:text-gray-400">No matches found yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map">
          <Card className="shadow-md dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="font-poppins text-xl text-gray-900 dark:text-white">Map View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-poppins text-lg text-gray-600 dark:text-gray-400">Interactive Map</p>
                  <p className="font-roboto text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Map integration would show pins for lost and found smartphones in your area
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}