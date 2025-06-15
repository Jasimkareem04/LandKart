import { Property } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Family Home with Garden',
    description: 'Beautiful 4-bedroom family home featuring modern amenities, spacious living areas, and a well-maintained garden. Perfect for families looking for comfort and style.',
    price: 850000,
    type: 'residential',
    status: 'for_sale',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: {
      address: '123 Maple Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      coordinates: {
        latitude: 30.2672,
        longitude: -97.7431
      }
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      lotSize: 0.3,
      yearBuilt: 2018,
      parking: 2
    },
    amenities: ['Swimming Pool', 'Garden', 'Garage', 'Air Conditioning', 'Fireplace'],
    agent: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@realestate.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    isFavorite: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Prime Commercial Office Space',
    description: 'Premium office building in the heart of downtown. Modern infrastructure with high-speed internet, security systems, and professional reception area.',
    price: 1250000,
    type: 'commercial',
    status: 'for_sale',
    images: [
      'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: {
      address: '456 Business Ave',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      coordinates: {
        latitude: 32.7767,
        longitude: -96.7970
      }
    },
    features: {
      sqft: 4500,
      yearBuilt: 2020,
      parking: 12
    },
    amenities: ['Conference Rooms', 'Security System', 'Elevator', 'Reception Area', 'Parking Garage'],
    agent: {
      name: 'Michael Chen',
      phone: '+1 (555) 987-6543',
      email: 'michael.chen@commercialrealty.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    isFavorite: true,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    title: '50 Acres Development Land',
    description: 'Exceptional opportunity for development. Prime location with utilities available, perfect for residential or commercial development projects.',
    price: 2500000,
    type: 'land',
    status: 'for_sale',
    images: [
      'https://images.pexels.com/photos/1152359/pexels-photo-1152359.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/697243/pexels-photo-697243.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: {
      address: '789 Country Road',
      city: 'Round Rock',
      state: 'TX',
      zipCode: '78681',
      coordinates: {
        latitude: 30.5083,
        longitude: -97.6789
      }
    },
    features: {
      lotSize: 50,
      yearBuilt: undefined
    },
    amenities: ['Utilities Available', 'Road Access', 'Zoned for Development'],
    agent: {
      name: 'Jennifer Martinez',
      phone: '+1 (555) 246-8135',
      email: 'jennifer.martinez@landdeals.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    isFavorite: false,
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z'
  },
  {
    id: '4',
    title: 'Luxury Waterfront Condo',
    description: 'Stunning waterfront condominium with panoramic views. High-end finishes, modern appliances, and resort-style amenities.',
    price: 1850000,
    type: 'residential',
    status: 'for_sale',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: {
      address: '321 Lakeside Drive',
      city: 'Lake Austin',
      state: 'TX',
      zipCode: '78746',
      coordinates: {
        latitude: 30.3077,
        longitude: -97.8081
      }
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2200,
      yearBuilt: 2021,
      parking: 2
    },
    amenities: ['Waterfront', 'Swimming Pool', 'Fitness Center', 'Concierge', 'Balcony'],
    agent: {
      name: 'David Wilson',
      phone: '+1 (555) 369-2580',
      email: 'david.wilson@luxuryproperties.com',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    isFavorite: true,
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    title: 'Charming Starter Home',
    description: 'Perfect starter home in a quiet neighborhood. Well-maintained property with updated kitchen and bathroom, ideal for first-time buyers.',
    price: 425000,
    type: 'residential',
    status: 'for_sale',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: {
      address: '654 Oak Lane',
      city: 'Cedar Park',
      state: 'TX',
      zipCode: '78613',
      coordinates: {
        latitude: 30.5052,
        longitude: -97.8203
      }
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1400,
      lotSize: 0.2,
      yearBuilt: 2005,
      parking: 1
    },
    amenities: ['Updated Kitchen', 'Quiet Neighborhood', 'Fenced Yard', 'Central Air'],
    agent: {
      name: 'Lisa Thompson',
      phone: '+1 (555) 147-2589',
      email: 'lisa.thompson@homefinders.com',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    isFavorite: false,
    createdAt: '2024-01-14T11:20:00Z',
    updatedAt: '2024-01-14T11:20:00Z'
  },
  {
    id: '6',
    title: 'Historic Downtown Building',
    description: 'Beautiful historic building with modern renovations. Perfect for office space, retail, or mixed-use development in the heart of downtown.',
    price: 3200000,
    type: 'commercial',
    status: 'for_sale',
    images: [
      'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: {
      address: '987 Main Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      coordinates: {
        latitude: 30.2672,
        longitude: -97.7431
      }
    },
    features: {
      sqft: 8500,
      yearBuilt: 1925,
      parking: 8
    },
    amenities: ['Historic Character', 'Downtown Location', 'High Ceilings', 'Renovated', 'Retail Space'],
    agent: {
      name: 'Robert Garcia',
      phone: '+1 (555) 741-9630',
      email: 'robert.garcia@historicproperties.com',
      avatar: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    isFavorite: false,
    createdAt: '2024-01-09T13:10:00Z',
    updatedAt: '2024-01-09T13:10:00Z'
  }
];