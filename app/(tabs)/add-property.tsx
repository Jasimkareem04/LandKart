import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { Camera, MapPin, Chrome as Home, Building, TreePine, Upload, DollarSign, Bed, Bath, Square } from 'lucide-react-native';

export default function AddPropertyScreen() {
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'land'>('residential');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    lotSize: '',
    yearBuilt: '',
    parking: '',
  });

  const propertyTypes = [
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building },
    { id: 'land', label: 'Land', icon: TreePine },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.title || !formData.price || !formData.address) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // In a real app, this would submit to an API
    Alert.alert('Success', 'Property listing submitted for review!');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      price: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      bedrooms: '',
      bathrooms: '',
      sqft: '',
      lotSize: '',
      yearBuilt: '',
      parking: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Add Property</Text>
        <Text style={styles.subtitle}>List your property for sale</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Property Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Type *</Text>
          <View style={styles.typeContainer}>
            {propertyTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeOption,
                    propertyType === type.id && styles.selectedType
                  ]}
                  onPress={() => setPropertyType(type.id as any)}
                >
                  <IconComponent 
                    size={24} 
                    color={propertyType === type.id ? '#ffffff' : '#1e40af'} 
                  />
                  <Text style={[
                    styles.typeText,
                    propertyType === type.id && styles.selectedTypeText
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Property Title *</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
              placeholder="e.g., Beautiful Family Home with Garden"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder="Describe your property's key features and amenities..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Price *</Text>
            <View style={styles.priceInputContainer}>
              <DollarSign size={20} color="#6b7280" style={styles.priceIcon} />
              <TextInput
                style={[styles.input, styles.priceInput]}
                value={formData.price}
                onChangeText={(value) => handleInputChange('price', value)}
                placeholder="850000"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Street Address *</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholder="123 Main Street"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.input}
                value={formData.city}
                onChangeText={(value) => handleInputChange('city', value)}
                placeholder="Austin"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.inputLabel}>State</Text>
              <TextInput
                style={styles.input}
                value={formData.state}
                onChangeText={(value) => handleInputChange('state', value)}
                placeholder="TX"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ZIP Code</Text>
            <TextInput
              style={styles.input}
              value={formData.zipCode}
              onChangeText={(value) => handleInputChange('zipCode', value)}
              placeholder="78701"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Property Features */}
        {propertyType === 'residential' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Features</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.flex1]}>
                <Text style={styles.inputLabel}>Bedrooms</Text>
                <View style={styles.featureInputContainer}>
                  <Bed size={16} color="#6b7280" />
                  <TextInput
                    style={[styles.input, styles.featureInput]}
                    value={formData.bedrooms}
                    onChangeText={(value) => handleInputChange('bedrooms', value)}
                    placeholder="4"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={[styles.inputGroup, styles.flex1]}>
                <Text style={styles.inputLabel}>Bathrooms</Text>
                <View style={styles.featureInputContainer}>
                  <Bath size={16} color="#6b7280" />
                  <TextInput
                    style={[styles.input, styles.featureInput]}
                    value={formData.bathrooms}
                    onChangeText={(value) => handleInputChange('bathrooms', value)}
                    placeholder="3"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.flex1]}>
                <Text style={styles.inputLabel}>Square Feet</Text>
                <View style={styles.featureInputContainer}>
                  <Square size={16} color="#6b7280" />
                  <TextInput
                    style={[styles.input, styles.featureInput]}
                    value={formData.sqft}
                    onChangeText={(value) => handleInputChange('sqft', value)}
                    placeholder="2800"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={[styles.inputGroup, styles.flex1]}>
                <Text style={styles.inputLabel}>Year Built</Text>
                <TextInput
                  style={styles.input}
                  value={formData.yearBuilt}
                  onChangeText={(value) => handleInputChange('yearBuilt', value)}
                  placeholder="2018"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        )}

        {propertyType === 'land' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Land Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Lot Size (acres)</Text>
              <TextInput
                style={styles.input}
                value={formData.lotSize}
                onChangeText={(value) => handleInputChange('lotSize', value)}
                placeholder="0.5"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>
          </View>
        )}

        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <TouchableOpacity style={styles.photoUpload}>
            <Upload size={32} color="#6b7280" />
            <Text style={styles.photoUploadTitle}>Upload Photos</Text>
            <Text style={styles.photoUploadSubtitle}>
              Add high-quality photos to showcase your property
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Property Listing</Text>
        </TouchableOpacity>
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
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeOption: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    gap: 8,
  },
  selectedType: {
    backgroundColor: '#1e40af',
    borderColor: '#1e40af',
  },
  typeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1e40af',
  },
  selectedTypeText: {
    color: '#ffffff',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  priceIcon: {
    marginLeft: 16,
  },
  priceInput: {
    flex: 1,
    borderWidth: 0,
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  featureInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    gap: 8,
  },
  featureInput: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  photoUpload: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  photoUploadTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginTop: 12,
  },
  photoUploadSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#1e40af',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});