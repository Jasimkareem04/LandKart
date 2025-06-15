import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { TrendingUp, MapPin, Filter } from 'lucide-react-native';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import FilterModal from '@/components/FilterModal';
import { mockProperties } from '@/data/properties';
import { Property, SearchFilters } from '@/types/property';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({ type: 'all' });
  const [sortBy, setSortBy] = useState<'price_low' | 'price_high' | 'newest'>('newest');

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties.filter(property => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          property.title.toLowerCase().includes(query) ||
          property.location.city.toLowerCase().includes(query) ||
          property.location.state.toLowerCase().includes(query) ||
          property.location.address.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.type && filters.type !== 'all' && property.type !== filters.type) {
        return false;
      }

      // Price filters
      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }

      // Bedroom filter
      if (filters.bedrooms && (!property.features.bedrooms || property.features.bedrooms < filters.bedrooms)) {
        return false;
      }

      // Bathroom filter
      if (filters.bathrooms && (!property.features.bathrooms || property.features.bathrooms < filters.bathrooms)) {
        return false;
      }

      return true;
    });

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [properties, searchQuery, filters, sortBy]);

  const handleFavoriteToggle = (propertyId: string) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === propertyId 
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
  };

  const handleApplyFilters = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const quickFilters = [
    { label: 'All', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Land', value: 'land' },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_low' },
    { label: 'Price: High to Low', value: 'price_high' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Search Properties</Text>
        <Text style={styles.subtitle}>Find your dream property</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setShowFilters(true)}
          placeholder="Search by location, type, or keywords..."
        />

        {/* Quick Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.quickFilters}
        >
          {quickFilters.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.quickFilter,
                filters.type === filter.value && styles.activeQuickFilter
              ]}
              onPress={() => setFilters({ ...filters, type: filter.value as any })}
            >
              <Text style={[
                styles.quickFilterText,
                filters.type === filter.value && styles.activeQuickFilterText
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  sortBy === option.value && styles.activeSortOption
                ]}
                onPress={() => setSortBy(option.value as any)}
              >
                <Text style={[
                  styles.sortOptionText,
                  sortBy === option.value && styles.activeSortOptionText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredAndSortedProperties.length} properties found
          </Text>
          {(searchQuery || filters.type !== 'all' || Object.keys(filters).length > 1) && (
            <TouchableOpacity 
              onPress={() => {
                setSearchQuery('');
                setFilters({ type: 'all' });
              }}
            >
              <Text style={styles.clearAll}>Clear all</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.propertyList}>
          {filteredAndSortedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </View>

        {filteredAndSortedProperties.length === 0 && (
          <View style={styles.emptyState}>
            <Filter size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No properties found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search criteria or browse our featured properties
            </Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => {
                setSearchQuery('');
                setFilters({ type: 'all' });
              }}
            >
              <Text style={styles.browseButtonText}>Browse All Properties</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  quickFilters: {
    marginTop: 16,
    marginBottom: 12,
  },
  quickFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  activeQuickFilter: {
    backgroundColor: '#1e40af',
  },
  quickFilterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeQuickFilterText: {
    color: '#ffffff',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sortLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
    marginRight: 8,
  },
  activeSortOption: {
    backgroundColor: '#dbeafe',
  },
  sortOptionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeSortOptionText: {
    color: '#1e40af',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  clearAll: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1e40af',
  },
  propertyList: {
    gap: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  browseButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#1e40af',
    borderRadius: 8,
  },
  browseButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});