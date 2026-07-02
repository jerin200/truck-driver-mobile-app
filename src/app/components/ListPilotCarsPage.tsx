import { useState } from 'react';
import { Search, Star, Shield, MapPin, ChevronDown, User, Briefcase, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import Header from './Header';

interface PilotCar {
  id: string;
  driverName: string;
  company: string;
  pcTypes: string[];
  experience: string;
  rating: number;
  certifications?: string[];
  availability?: string;
  phone?: string;
  email?: string;
}

// Mock data based on the provided image
const MOCK_PILOT_CARS: PilotCar[] = [
  {
    id: '1',
    driverName: 'John Anderson',
    company: 'SafeRoute Escorts',
    pcTypes: ['Lead', 'Chase'],
    experience: '8 years',
    rating: 4.9,
    certifications: ['DOT Certified', 'Oversize Load'],
    availability: 'Available Now',
    phone: '(555) 123-4567',
    email: 'john.anderson@saferoute.com'
  },
  {
    id: '2',
    driverName: 'Sarah Mitchell',
    company: 'Convoy Pro Services',
    pcTypes: ['Pole', 'High-Pole'],
    experience: '12 years',
    rating: 4.8,
    certifications: ['DOT Certified', 'Height Pole Certified', 'Heavy Haul'],
    availability: 'Available Jan 28',
    phone: '(555) 234-5678',
    email: 'sarah.mitchell@convoyp.com'
  },
  {
    id: '3',
    driverName: 'Mike Rodriguez',
    company: 'Premier Escort LLC',
    pcTypes: ['Lead', 'Chase', 'Pole'],
    experience: '15 years',
    rating: 5.0,
    certifications: ['DOT Certified', 'Oversize Load', 'Heavy Haul', 'Wide Load Specialist'],
    availability: 'Available Now',
    phone: '(555) 345-6789',
    email: 'mike.r@premierescort.com'
  },
  {
    id: '4',
    driverName: 'Lisa Chen',
    company: 'Highway Guardians',
    pcTypes: ['Chase'],
    experience: '6 years',
    rating: 4.7,
    certifications: ['DOT Certified', 'Oversize Load'],
    availability: 'Available Feb 1',
    phone: '(555) 456-7890',
    email: 'lisa.chen@highwayguardians.com'
  },
  {
    id: '5',
    driverName: 'David Martinez',
    company: 'Pacific Pilot Pros',
    pcTypes: ['Lead', 'High-Pole'],
    experience: '9 years',
    rating: 4.9,
    certifications: ['DOT Certified', 'Height Pole Certified', 'Heavy Haul'],
    availability: 'Available Now',
    phone: '(555) 567-8901',
    email: 'david.m@pacificpilot.com'
  },
  {
    id: '6',
    driverName: 'Jennifer Wilson',
    company: 'TransGuide Services',
    pcTypes: ['Lead'],
    experience: '7 years',
    rating: 4.6,
    certifications: ['DOT Certified', 'Oversize Load'],
    availability: 'Available Jan 30',
    phone: '(555) 678-9012',
    email: 'j.wilson@transguide.com'
  },
  {
    id: '7',
    driverName: 'Robert Taylor',
    company: 'Elite Pilot Solutions',
    pcTypes: ['Pole', 'High-Pole'],
    experience: '11 years',
    rating: 4.8,
    certifications: ['DOT Certified', 'Height Pole Certified', 'Oversize Load'],
    availability: 'Available Now',
    phone: '(555) 789-0123',
    email: 'robert.t@elitepilot.com'
  },
  {
    id: '8',
    driverName: 'Amanda White',
    company: 'Mountain Escort Services',
    pcTypes: ['Chase'],
    experience: '5 years',
    rating: 4.7,
    certifications: ['DOT Certified', 'Oversize Load'],
    availability: 'Available Feb 5',
    phone: '(555) 890-1234',
    email: 'amanda.white@mountainescort.com'
  }
];

interface ListPilotCarsPageProps {
  onBack?: () => void;
  onSubmit?: (selectedPilotCars: any[]) => void;
  jobData?: any;
}

export default function ListPilotCarsPage({ onBack, onSubmit, jobData }: ListPilotCarsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [selectedPCs, setSelectedPCs] = useState<string[]>([]);

  // Filter pilot cars by search query
  const filteredPilotCars = MOCK_PILOT_CARS.filter(pc => {
    const query = searchQuery.toLowerCase();
    return (
      pc.driverName.toLowerCase().includes(query) ||
      pc.company.toLowerCase().includes(query) ||
      pc.pcTypes.some(type => type.toLowerCase().includes(query))
    );
  });

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleSelect = (id: string) => {
    if (selectedPCs.includes(id)) {
      setSelectedPCs(selectedPCs.filter(pcId => pcId !== id));
    } else {
      setSelectedPCs([...selectedPCs, id]);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      const selectedPilotCars = MOCK_PILOT_CARS.filter(pc => selectedPCs.includes(pc.id));
      onSubmit(selectedPilotCars);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex-none">
        <Header 
          title="Available Pilot Cars"
          subtitle="Select pilot cars and request quotes"
          showBackButton={!!onBack}
          onBack={onBack}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Search and Filter Section */}
        <div className="bg-white border-b border-gray-200 p-4 space-y-3 sticky top-0 z-10">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by driver name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-10 text-sm bg-gray-50 border-gray-200"
            />
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-blue-600 font-medium"
          >
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredPilotCars.length}</span> pilot cars available
            </p>
          </div>
        </div>

        {/* Pilot Cars List */}
        <div className={`p-4 space-y-3 ${onSubmit ? 'pb-32' : 'pb-6'}`}>
          {filteredPilotCars.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-900">No pilot cars found</p>
              <p className="text-sm text-gray-500 mt-1">
                {searchQuery ? 'Try a different search term' : 'No available pilot cars at this time'}
              </p>
            </div>
          ) : (
            filteredPilotCars.map((pc) => {
              const isExpanded = expandedCard === pc.id;
              const isSelected = selectedPCs.includes(pc.id);

              return (
                <div
                  key={pc.id}
                  className={`bg-white rounded-xl border-2 overflow-hidden shadow-sm transition-all ${
                    isSelected ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-4">
                    {/* Selection and Info Row */}
                    {onSubmit && (
                      <div className="flex items-start gap-3 mb-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSelect(pc.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <User className="w-4 h-4 text-gray-400 shrink-0" />
                                <h3 className="font-semibold text-gray-900 text-base truncate">
                                  {pc.driverName}
                                </h3>
                              </div>
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
                                <p className="text-sm text-gray-600 truncate">{pc.company}</p>
                              </div>
                            </div>
                            
                            {/* Rating Badge */}
                            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg shrink-0">
                              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                              <span className="text-sm font-semibold text-gray-900">{pc.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Driver & Company Info (when no onSubmit) */}
                    {!onSubmit && (
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-gray-400 shrink-0" />
                            <h3 className="font-semibold text-gray-900 text-base truncate">
                              {pc.driverName}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
                            <p className="text-sm text-gray-600 truncate">{pc.company}</p>
                          </div>
                        </div>
                        
                        {/* Rating Badge */}
                        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg shrink-0">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          <span className="text-sm font-semibold text-gray-900">{pc.rating}</span>
                        </div>
                      </div>
                    )}

                    {/* PC Types */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {pc.pcTypes.map((type, idx) => (
                        <Badge 
                          key={idx} 
                          className="bg-blue-100 text-blue-700 border-0 text-xs font-medium px-2.5 py-1"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>

                    {/* Experience & Availability */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-lg p-2.5">
                        <p className="text-xs text-gray-500 mb-0.5">Experience</p>
                        <p className="text-sm font-semibold text-gray-900">{pc.experience}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2.5">
                        <p className="text-xs text-gray-500 mb-0.5">Availability</p>
                        <p className="text-sm font-semibold text-gray-900">{pc.availability}</p>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && pc.certifications && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        {/* Certifications */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4 text-gray-400" />
                            <p className="text-xs font-medium text-gray-600">Certifications</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {pc.certifications.map((cert, idx) => (
                              <Badge 
                                key={idx} 
                                variant="outline" 
                                className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-0.5"
                              >
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Contact Info */}
                        {(pc.phone || pc.email) && (
                          <div className="space-y-2">
                            {pc.phone && (
                              <div className="text-sm">
                                <span className="text-gray-500">Phone:</span>{' '}
                                <span className="font-medium text-gray-900">{pc.phone}</span>
                              </div>
                            )}
                            {pc.email && (
                              <div className="text-sm">
                                <span className="text-gray-500">Email:</span>{' '}
                                <span className="font-medium text-gray-900">{pc.email}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="px-4 pb-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpand(pc.id)}
                      className="flex-1 h-10 text-sm border-gray-300"
                    >
                      {isExpanded ? 'Show Less' : 'View Details'}
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 h-10 text-sm bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Request Quote
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Sticky Footer (only when onSubmit is provided) */}
      {onSubmit && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
          {selectedPCs.length > 0 && (
            <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-900">
                    {selectedPCs.length} pilot car{selectedPCs.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              </div>
            </div>
          )
          } 
          
          <div className="flex gap-3 max-w-5xl mx-auto">
            <Button
              variant="outline"
              onClick={onBack}
              className="h-12 text-base font-medium border-2 active:scale-[0.98] transition-transform max-w-[120px]"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selectedPCs.length === 0}
              className="flex-1 h-12 text-base font-semibold bg-[#F89823] text-[#1A1A1A] hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 active:scale-[0.98] transition-transform"
            >
              Post Job & Request Quotes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}