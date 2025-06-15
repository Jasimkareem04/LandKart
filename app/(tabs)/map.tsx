import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { MapPin, List, Filter, Navigation } from 'lucide-react-native';
import PropertyCard from '@/components/PropertyCard';
import { mockProperties } from '@/data/properties';
import { Property } from '@/types/property';

export default function MapScreen() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showList, setShowList] = useState(false);

  const handleFavoriteToggle = (propertyId: string) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === propertyId 
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
  };

  // Group properties by location for map pins
  const propertyGroups = properties.reduce((groups, property) => {
    const key = `${property.location.coordinates.latitude},${property.location.coordinates.longitude}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(property);
    return groups;
  }, {} as Record<string, Property[]>);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Property Map</Text>
          <Text style={styles.subtitle}>Explore properties by location</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Filter size={20} color="#1e40af" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, showList && styles.activeAction]}
            onPress={() => setShowList(!showList)}
          >
            <List size={20} color={showList ? "#ffffff" : "#1e40af"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={48} color="#6b7280" />
          <Text style={styles.mapPlaceholderTitle}>Interactive Map</Text>
          <Text style={styles.mapPlaceholderSubtitle}>
            Map integration would show property locations here
          </Text>
          
          {/* Simulated Map Pins */}
          <View style={styles.mapPinsContainer}>
            {Object.entries(propertyGroups).map(([key, groupProperties], index) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.mapPin,
                  { 
                    top: 100 + (index * 40) % 200,
                    left: 50 + (index * 60) % 250,
                  }
                ]}
                onPress={() => setSelectedProperty(groupProperties[0])}
              >
                <Text style={styles.mapPinText}>
                  ${Math.round(groupProperties[0].price / 1000)}K
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapControlButton}>
            <Navigation size={20} color="#1e40af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected Property Card */}
      {selectedProperty && !showList && (
        <View style={styles.selectedPropertyContainer}>
          <PropertyCard
            property={selectedProperty}
            onFavoriteToggle={handleFavoriteToggle}
          />
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedProperty(null)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Property List Overlay */}
      {showList && (
        <View style={styles.listOverlay}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>
              {properties.length} Properties
            </Text>
            <TouchableOpacity onPress={() => setShowList(false)}>
              <Text style={styles.closeListText}>×</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.listContent} showsVerticalScrollIndicator={false}>
            {properties.map((property) => (
              <TouchableOpacity
                key={property.id}
                onPress={() => {
                  setSelectedProperty(property);
                  setShowList(false);
                }}
              >
                <PropertyCard
                  property={property}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
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
    padding: 20,
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  activeAction: {
    backgroundColor: '#1e40af',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    position: 'relative',
  },
  mapPlaceholderTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginTop: 12,
  },
  mapPlaceholderSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 40,
  },
  mapPinsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapPin: {
    position: 'absolute',
    backgroundColor: '#1e40af',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mapPinText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  mapControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  mapControlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedPropertyContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  listOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  listTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  closeListText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#6b7280',
  },
  listContent: {
    flex: 1,
    padding: 20,
  },
});