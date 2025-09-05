import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

type DeviceStatus = 'Lost' | 'Stolen' | 'Recovered';

interface SmartphoneRecord {
  id: string;
  imei: string;
  owner: string;
  status: DeviceStatus;
  reportedDate: string;
  lastUpdate: string;
}

export function SecurityAdmin() {
  const [smartphones] = useState<SmartphoneRecord[]>([
    {
      id: '1',
      imei: '356789012345678',
      owner: 'John Doe',
      status: 'Stolen',
      reportedDate: '2024-01-15',
      lastUpdate: '2024-01-15'
    },
    {
      id: '2',
      imei: '356789012345679',
      owner: 'Jane Smith',
      status: 'Lost',
      reportedDate: '2024-01-10',
      lastUpdate: '2024-01-12'
    },
    {
      id: '3',
      imei: '356789012345680',
      owner: 'Mike Johnson',
      status: 'Recovered',
      reportedDate: '2024-01-05',
      lastUpdate: '2024-01-08'
    },
    {
      id: '4',
      imei: '356789012345681',
      owner: 'Sarah Wilson',
      status: 'Stolen',
      reportedDate: '2024-01-12',
      lastUpdate: '2024-01-12'
    },
    {
      id: '5',
      imei: '356789012345682',
      owner: 'David Brown',
      status: 'Lost',
      reportedDate: '2024-01-08',
      lastUpdate: '2024-01-10'
    },
    {
      id: '6',
      imei: '356789012345683',
      owner: 'Lisa Davis',
      status: 'Recovered',
      reportedDate: '2024-01-03',
      lastUpdate: '2024-01-07'
    }
  ]);

  const handleMarkRecovered = (id: string) => {
    // In a real app, this would update the database
    console.log(`Marking device ${id} as recovered`);
  };

  const getStatusIcon = (status: DeviceStatus) => {
    switch (status) {
      case 'Stolen':
        return <AlertTriangle className="h-4 w-4 text-hyns-error" />;
      case 'Lost':
        return <Clock className="h-4 w-4 text-hyns-warning" />;
      case 'Recovered':
        return <CheckCircle className="h-4 w-4 text-hyns-success" />;
    }
  };

  const getStatusBadge = (status: DeviceStatus) => {
    const variants = {
      'Stolen': 'bg-hyns-error text-white',
      'Lost': 'bg-hyns-warning text-white',
      'Recovered': 'bg-hyns-success text-white'
    };
    
    return (
      <Badge className={variants[status]}>
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

  // Chart data
  const chartData = [
    { name: 'Lost', value: smartphones.filter(s => s.status === 'Lost').length, color: '#F39C12' },
    { name: 'Stolen', value: smartphones.filter(s => s.status === 'Stolen').length, color: '#E74C3C' },
    { name: 'Recovered', value: smartphones.filter(s => s.status === 'Recovered').length, color: '#2ECC71' }
  ];

  const totalDevices = smartphones.length;
  const activeIssues = smartphones.filter(s => s.status !== 'Recovered').length;

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-6">
        <h1 className="font-poppins text-2xl text-gray-900">Security Dashboard</h1>
        <p className="font-roboto text-gray-600 mt-1">Monitor and manage smartphone security reports</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-hyns-purple" />
              <div>
                <p className="font-roboto text-sm text-gray-600">Total Devices</p>
                <p className="font-poppins text-xl text-gray-900">{totalDevices}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-hyns-error" />
              <div>
                <p className="font-roboto text-sm text-gray-600">Stolen</p>
                <p className="font-poppins text-xl text-hyns-error">{chartData[1].value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-hyns-warning" />
              <div>
                <p className="font-roboto text-sm text-gray-600">Lost</p>
                <p className="font-poppins text-xl text-hyns-warning">{chartData[0].value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-hyns-success" />
              <div>
                <p className="font-roboto text-sm text-gray-600">Recovered</p>
                <p className="font-poppins text-xl text-hyns-success">{chartData[2].value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Table */}
        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-poppins text-xl">Device Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-poppins">IMEI</TableHead>
                  <TableHead className="font-poppins">Owner</TableHead>
                  <TableHead className="font-poppins">Status</TableHead>
                  <TableHead className="font-poppins">Reported Date</TableHead>
                  <TableHead className="font-poppins">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {smartphones.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-mono text-sm">{device.imei}</TableCell>
                    <TableCell className="font-roboto">{device.owner}</TableCell>
                    <TableCell>{getStatusBadge(device.status)}</TableCell>
                    <TableCell className="font-roboto text-sm text-gray-600">
                      {new Date(device.reportedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {device.status !== 'Recovered' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkRecovered(device.id)}
                          className="bg-hyns-success hover:bg-green-600 text-white border-0 font-roboto"
                        >
                          Mark as Recovered
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Status Distribution Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="font-poppins text-xl">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, 'Devices']}
                    labelStyle={{ color: '#374151', fontFamily: 'Roboto' }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '14px', fontFamily: 'Roboto' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-roboto text-sm">Active Issues</span>
                <span className="font-poppins text-hyns-error">{activeIssues}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-roboto text-sm">Recovery Rate</span>
                <span className="font-poppins text-hyns-success">
                  {Math.round((chartData[2].value / totalDevices) * 100)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}