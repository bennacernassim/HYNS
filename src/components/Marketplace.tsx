import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ShoppingBag, Search, Filter, Star, MapPin, User, Store, Eye, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
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

interface MarketplaceProps {
  user: User;
}

interface SmartphoneItem {
  id: string;
  title: string;
  brand: string;
  model: string;
  color: string;
  price: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  seller: {
    name: string;
    type: 'user' | 'store';
    rating: number;
    location: string;
    verified: boolean;
  };
  specs: {
    storage: string;
    ram: string;
    screen: string;
    camera: string;
    battery: string;
  };
  images: string[];
  description: string;
  imei: string;
  ownership_history: {
    owner: string;
    period: string;
    purchase_date: string;
  }[];
  posted_date: string;
  views: number;
  favorites: number;
}

export function Marketplace({ user }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedItem, setSelectedItem] = useState<SmartphoneItem | null>(null);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({
    nationalId: user.nationalId,
    fullName: user.name,
    phone: user.phone,
    email: user.email,
    city: ''
  });

  const [marketplaceItems] = useState<SmartphoneItem[]>([
    {
      id: '1',
      title: 'iPhone 14 Pro - Excellent Condition',
      brand: 'iPhone',
      model: '14 Pro',
      color: 'Space Black',
      price: 180000,
      condition: 'Like New',
      seller: {
        name: 'Amina Benali',
        type: 'user',
        rating: 4.8,
        location: 'Algiers',
        verified: true
      },
      specs: {
        storage: '256GB',
        ram: '6GB',
        screen: '6.1" Super Retina XDR',
        camera: '48MP Triple Camera',
        battery: '3200mAh'
      },
      images: ['https://images.unsplash.com/photo-1697636979311-511164585ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbWFydHBob25lJTIwYmxhY2t8ZW58MXx8fHwxNzU2OTkwMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080'],
      description: 'Excellent iPhone 14 Pro, barely used for 6 months. Always kept in case with screen protector.',
      imei: '123456789012345',
      ownership_history: [
        {
          owner: 'Amina Benali',
          period: '6 months',
          purchase_date: '2024-03-15'
        }
      ],
      posted_date: '2024-09-01',
      views: 45,
      favorites: 12
    },
    {
      id: '2',
      title: 'Samsung Galaxy S24 Ultra - Brand New',
      brand: 'Samsung',
      model: 'Galaxy S24 Ultra',
      color: 'Titanium Gray',
      price: 220000,
      condition: 'New',
      seller: {
        name: 'TechStore Oran',
        type: 'store',
        rating: 4.9,
        location: 'Oran',
        verified: true
      },
      specs: {
        storage: '512GB',
        ram: '12GB',
        screen: '6.8" Dynamic AMOLED',
        camera: '200MP Quad Camera',
        battery: '5000mAh'
      },
      images: ['https://images.unsplash.com/photo-1627609834360-74948f361335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1zdW5nJTIwZ2FsYXh5JTIwc21hcnRwaG9uZXxlbnwxfHx8fDE3NTcwMzUxODN8MA&ixlib=rb-4.1.0&q=80&w=1080'],
      description: 'Brand new Samsung Galaxy S24 Ultra, sealed box with full warranty.',
      imei: '987654321098765',
      ownership_history: [
        {
          owner: 'TechStore Oran (New)',
          period: 'New Device',
          purchase_date: '2024-09-01'
        }
      ],
      posted_date: '2024-09-02',
      views: 78,
      favorites: 25
    },
    {
      id: '3',
      title: 'Xiaomi Mi 13 - Great Value',
      brand: 'Xiaomi',
      model: 'Mi 13',
      color: 'Blue',
      price: 85000,
      condition: 'Good',
      seller: {
        name: 'Oussama Khelifi',
        type: 'user',
        rating: 4.5,
        location: 'Constantine',
        verified: true
      },
      specs: {
        storage: '128GB',
        ram: '8GB',
        screen: '6.36" AMOLED',
        camera: '50MP Triple Camera',
        battery: '4500mAh'
      },
      images: ['https://images.unsplash.com/photo-1568171284620-57dc85d9f210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx4aWFvbWklMjBzbWFydHBob25lJTIwYmx1ZXxlbnwxfHx8fDE3NTcwNzgxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080'],
      description: 'Reliable Xiaomi Mi 13 in good working condition. Minor scratches on back.',
      imei: '456789123456789',
      ownership_history: [
        {
          owner: 'Oussama Khelifi',
          period: '1 year',
          purchase_date: '2023-09-15'
        }
      ],
      posted_date: '2024-08-28',
      views: 32,
      favorites: 8
    }
  ]);

  const cities = ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Batna', 'Setif', 'Sidi Bel Abbes'];
  const brands = ['iPhone', 'Samsung', 'Xiaomi', 'Huawei', 'Oppo'];
  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !selectedBrand || selectedBrand === 'all' || item.brand === selectedBrand;
    const matchesCondition = !selectedCondition || selectedCondition === 'all' || item.condition === selectedCondition;
    const matchesPrice = (!priceRange.min || item.price >= parseInt(priceRange.min)) &&
                        (!priceRange.max || item.price <= parseInt(priceRange.max));
    
    return matchesSearch && matchesBrand && matchesCondition && matchesPrice;
  });

  const handleBuy = async () => {
    if (!buyerInfo.nationalId || !buyerInfo.fullName || !buyerInfo.phone || !buyerInfo.city) {
      toast.error('All buyer information is required');
      return;
    }

    // Simulate purchase process
    toast.success('Purchase request submitted! Seller will contact you soon.');
    setShowBuyDialog(false);
    setBuyerInfo({
      nationalId: user.nationalId,
      fullName: user.name,
      phone: user.phone,
      email: user.email,
      city: ''
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD'
    }).format(price);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white">
          Marketplace
        </h1>
        <p className="font-roboto text-gray-600 dark:text-gray-400 mt-2">
          Browse and buy smartphones from verified users and stores
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search smartphones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-roboto"
                />
              </div>
            </div>
            
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger>
                <SelectValue placeholder="All Conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map(condition => (
                  <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                placeholder="Min Price"
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="font-roboto"
              />
              <Input
                placeholder="Max Price"
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="font-roboto"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <ImageWithFallback
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${
                    item.condition === 'New' ? 'bg-hyns-success' :
                    item.condition === 'Like New' ? 'bg-blue-500' :
                    item.condition === 'Good' ? 'bg-hyns-warning' : 'bg-gray-500'
                  }`}
                >
                  {item.condition}
                </Badge>
                <div className="absolute bottom-2 left-2 flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    {item.views}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Heart className="h-3 w-3 mr-1" />
                    {item.favorites}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-poppins font-semibold text-lg mb-2 line-clamp-1">
                  {item.title}
                </h3>
                
                <p className="font-roboto text-2xl font-bold text-hyns-purple mb-2">
                  {formatPrice(item.price)}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  {item.seller.type === 'store' ? (
                    <Store className="h-4 w-4 text-blue-500" />
                  ) : (
                    <User className="h-4 w-4 text-green-500" />
                  )}
                  <span className="font-roboto text-sm text-gray-600 dark:text-gray-400">
                    {item.seller.name}
                  </span>
                  {item.seller.verified && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      Verified
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-roboto text-sm">{item.seller.rating}</span>
                  <MapPin className="h-3 w-3 text-gray-400 ml-2" />
                  <span className="font-roboto text-xs text-gray-500">{item.seller.location}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                  <div>Storage: {item.specs.storage}</div>
                  <div>RAM: {item.specs.ram}</div>
                  <div>Camera: {item.specs.camera}</div>
                  <div>Battery: {item.specs.battery}</div>
                </div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="flex-1 font-roboto"
                        onClick={() => setSelectedItem(item)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      {selectedItem && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="font-poppins">{selectedItem.title}</DialogTitle>
                            <DialogDescription className="font-roboto">
                              Detailed specifications and ownership history
                            </DialogDescription>
                          </DialogHeader>
                          
                          <Tabs defaultValue="specs" className="mt-4">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="specs">Specifications</TabsTrigger>
                              <TabsTrigger value="history">Ownership History</TabsTrigger>
                              <TabsTrigger value="seller">Seller Info</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="specs" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-poppins font-semibold mb-2">Device Info</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>Brand: {selectedItem.brand}</div>
                                    <div>Model: {selectedItem.model}</div>
                                    <div>Color: {selectedItem.color}</div>
                                    <div>Condition: {selectedItem.condition}</div>
                                    <div>IMEI: {selectedItem.imei}</div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-poppins font-semibold mb-2">Technical Specs</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>Storage: {selectedItem.specs.storage}</div>
                                    <div>RAM: {selectedItem.specs.ram}</div>
                                    <div>Screen: {selectedItem.specs.screen}</div>
                                    <div>Camera: {selectedItem.specs.camera}</div>
                                    <div>Battery: {selectedItem.specs.battery}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-poppins font-semibold mb-2">Description</h4>
                                <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">
                                  {selectedItem.description}
                                </p>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="history">
                              <div className="space-y-4">
                                <h4 className="font-poppins font-semibold">Ownership History</h4>
                                {selectedItem.ownership_history.map((history, index) => (
                                  <div key={index} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-roboto font-medium">{history.owner}</p>
                                        <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">
                                          Owned for: {history.period}
                                        </p>
                                      </div>
                                      <Badge variant="secondary" className="text-xs">
                                        {history.purchase_date}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="seller">
                              <div className="space-y-4">
                                <h4 className="font-poppins font-semibold">Seller Information</h4>
                                <div className="border rounded-lg p-4">
                                  <div className="flex items-center gap-3 mb-3">
                                    {selectedItem.seller.type === 'store' ? (
                                      <Store className="h-8 w-8 text-blue-500" />
                                    ) : (
                                      <User className="h-8 w-8 text-green-500" />
                                    )}
                                    <div>
                                      <p className="font-roboto font-medium">{selectedItem.seller.name}</p>
                                      <p className="font-roboto text-sm text-gray-600 dark:text-gray-400 capitalize">
                                        {selectedItem.seller.type}
                                      </p>
                                    </div>
                                    {selectedItem.seller.verified && (
                                      <Badge className="bg-hyns-success">Verified</Badge>
                                    )}
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="font-medium">Rating: </span>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        <span>{selectedItem.seller.rating}</span>
                                      </div>
                                    </div>
                                    <div>
                                      <span className="font-medium">Location: </span>
                                      <span>{selectedItem.seller.location}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                          
                          <div className="flex gap-4 pt-4 border-t">
                            <p className="font-poppins text-2xl font-bold text-hyns-purple">
                              {formatPrice(selectedItem.price)}
                            </p>
                            <Button 
                              className="bg-hyns-purple hover:bg-purple-700 font-roboto ml-auto"
                              onClick={() => setShowBuyDialog(true)}
                            >
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              Buy Now
                            </Button>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className="bg-hyns-purple hover:bg-purple-700 font-roboto"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowBuyDialog(true);
                    }}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Buy Dialog */}
      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-poppins">Complete Purchase</DialogTitle>
            <DialogDescription className="font-roboto">
              Please provide your information to proceed with the purchase
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                <h4 className="font-poppins font-semibold mb-2">Item Details</h4>
                <p className="font-roboto">{selectedItem.title}</p>
                <p className="font-roboto text-xl font-bold text-hyns-purple">
                  {formatPrice(selectedItem.price)}
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-poppins font-semibold">Buyer Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyerNationalId" className="font-roboto">National ID (CIN) *</Label>
                    <Input
                      id="buyerNationalId"
                      value={buyerInfo.nationalId}
                      onChange={(e) => setBuyerInfo(prev => ({ ...prev, nationalId: e.target.value }))}
                      className="font-roboto"
                      required
                      readOnly={!!user.nationalId}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="buyerFullName" className="font-roboto">Full Name *</Label>
                    <Input
                      id="buyerFullName"
                      value={buyerInfo.fullName}
                      onChange={(e) => setBuyerInfo(prev => ({ ...prev, fullName: e.target.value }))}
                      className="font-roboto"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="buyerPhone" className="font-roboto">Phone Number *</Label>
                    <Input
                      id="buyerPhone"
                      value={buyerInfo.phone}
                      onChange={(e) => setBuyerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="font-roboto"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="buyerEmail" className="font-roboto">Email</Label>
                    <Input
                      id="buyerEmail"
                      type="email"
                      value={buyerInfo.email}
                      onChange={(e) => setBuyerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="font-roboto"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="buyerCity" className="font-roboto">City *</Label>
                    <Select value={buyerInfo.city} onValueChange={(value) => setBuyerInfo(prev => ({ ...prev, city: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowBuyDialog(false)} className="font-roboto">
                  Cancel
                </Button>
                <Button onClick={handleBuy} className="bg-hyns-purple hover:bg-purple-700 font-roboto">
                  Confirm Purchase
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredItems.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-poppins text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No smartphones found
            </h3>
            <p className="font-roboto text-gray-500 dark:text-gray-500">
              Try adjusting your search criteria or browse all available items
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}