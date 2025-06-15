import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity 
} from 'react-native';
import { Heart, Share2, Filter } from 'lucide-react-native';
import PropertyCard from '@/components/PropertyCard';
import { mockProperties } from '@/data/properties';
import { Property } from '@/types/property';

export default function FavoritesScreen() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);

  const favoriteProperties = properties.filter(property => property.isFavorite);

  const handleFavoriteToggle = (propertyId: string) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === propertyId 
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
  };

  const handleShareFavorites = () => {
    // In a real app, this would share the favorites list
    console.log('Sharing favorites...');
  };

  const getTotalValue = () => {
    return favoriteProperties.reduce((sum, property) => sum + property.price, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Favorites</Text>
          <Text style={styles.subtitle}>Your saved properties</Text>
        </View>
        {favoriteProperties.length > 0 && (
          <TouchableOpacity style={styles.shareButton} onPress={handleShareFavorites}>
            <Share2 size={20} color="#1e40af" />
          </TouchableOpacity>
        )}
      </View>

      {favoriteProperties.length > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{favoriteProperties.length}</Text>
            <Text style={styles.statLabel}>Saved Properties</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {formatPrice(getTotalValue() / favoriteProperties.length)}
            </Text>
            <Text style={styles.statLabel}>Average Price</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {formatPrice(getTotalValue())}
            </Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
        </View>
      )}

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {favoriteProperties.length > 0 ? (
          <View style={styles.propertyList}>
            {favoriteProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Heart size={48} color="#ef4444" />
            </View>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>
              Start browsing properties and tap the heart icon to save your favorites here
            </Text>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Properties</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
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
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  propertyList: {
    gap: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  browseButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#1e40af',
    borderRadius: 12,
  },
  browseButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});