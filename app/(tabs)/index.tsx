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
import { TrendingUp, Building, MapPin } from 'lucide-react-native';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import FilterModal from '@/components/FilterModal';
import { mockProperties } from '@/data/properties';
import { Property, SearchFilters } from '@/types/property';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({ type: 'all' });

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          property.title.toLowerCase().includes(query) ||
          property.location.city.toLowerCase().includes(query) ||
          property.location.state.toLowerCase().includes(query) ||
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
  }, [properties, searchQuery, filters]);

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

  const getPropertyStats = () => {
    const total = properties.length;
    const forSale = properties.filter(p => p.status === 'for_sale').length;
    const avgPrice = properties.reduce((sum, p) => sum + p.price, 0) / total;
    
    return { total, forSale, avgPrice };
  };

  const stats = getPropertyStats();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.subtitle}>Find your perfect property</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Building size={20} color="#1e40af" />
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Properties</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={20} color="#059669" />
            <Text style={styles.statNumber}>{stats.forSale}</Text>
            <Text style={styles.statLabel}>For Sale</Text>
          </View>
          <View style={styles.statCard}>
            <MapPin size={20} color="#dc2626" />
            <Text style={styles.statNumber}>
              ${Math.round(stats.avgPrice / 1000)}K
            </Text>
            <Text style={styles.statLabel}>Avg Price</Text>
          </View>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setShowFilters(true)}
        />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {filteredProperties.length} Properties Found
          </Text>
          {(searchQuery || filters.type !== 'all') && (
            <TouchableOpacity 
              onPress={() => {
                setSearchQuery('');
                setFilters({ type: 'all' });
              }}
            >
              <Text style={styles.clearFilters}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.propertyList}>
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </View>

        {filteredProperties.length === 0 && (
          <View style={styles.emptyState}>
            <Building size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No properties found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search criteria or filters
            </Text>
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
  headerContainer: {
    padding: 24,
    paddingBottom: 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greeting: {
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
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  clearFilters: {
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
});