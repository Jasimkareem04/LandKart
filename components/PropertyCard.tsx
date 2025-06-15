import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react-native';
import { Property } from '@/types/property';
import { router } from 'expo-router';

interface PropertyCardProps {
  property: Property;
  onFavoriteToggle?: (propertyId: string) => void;
}

export default function PropertyCard({ property, onFavoriteToggle }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePress = () => {
    router.push(`/property/${property.id}`);
  };

  const handleFavoritePress = () => {
    onFavoriteToggle?.(property.id);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.images[0] }} style={styles.image} />
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={handleFavoritePress}
        >
          <Heart 
            size={20} 
            color={property.isFavorite ? '#ef4444' : '#ffffff'} 
            fill={property.isFavorite ? '#ef4444' : 'transparent'}
          />
        </TouchableOpacity>
        <View style={styles.typeTag}>
          <Text style={styles.typeText}>{property.type.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.price}>{formatPrice(property.price)}</Text>
        <Text style={styles.title} numberOfLines={2}>{property.title}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.location}>
            {property.location.city}, {property.location.state}
          </Text>
        </View>

        {property.type === 'residential' && (
          <View style={styles.features}>
            {property.features.bedrooms && (
              <View style={styles.feature}>
                <Bed size={16} color="#6b7280" />
                <Text style={styles.featureText}>{property.features.bedrooms}</Text>
              </View>
            )}
            {property.features.bathrooms && (
              <View style={styles.feature}>
                <Bath size={16} color="#6b7280" />
                <Text style={styles.featureText}>{property.features.bathrooms}</Text>
              </View>
            )}
            {property.features.sqft && (
              <View style={styles.feature}>
                <Square size={16} color="#6b7280" />
                <Text style={styles.featureText}>{property.features.sqft.toLocaleString()} sq ft</Text>
              </View>
            )}
          </View>
        )}

        {property.type === 'land' && property.features.lotSize && (
          <View style={styles.features}>
            <View style={styles.feature}>
              <Square size={16} color="#6b7280" />
              <Text style={styles.featureText}>{property.features.lotSize} acres</Text>
            </View>
          </View>
        )}

        <View style={styles.agentContainer}>
          <Image source={{ uri: property.agent.avatar }} style={styles.agentAvatar} />
          <Text style={styles.agentName}>{property.agent.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  typeTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#1e40af',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.5,
  },
  content: {
    padding: 20,
  },
  price: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e40af',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
    lineHeight: 22,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginLeft: 6,
  },
  features: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  agentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  agentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
  },
  agentName: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
});