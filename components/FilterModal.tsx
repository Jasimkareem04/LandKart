import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  StyleSheet 
} from 'react-native';
import { X } from 'lucide-react-native';
import { SearchFilters } from '@/types/property';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onApplyFilters: (filters: SearchFilters) => void;
}

export default function FilterModal({ 
  visible, 
  onClose, 
  filters, 
  onApplyFilters 
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  const propertyTypes = ['all', 'residential', 'commercial', 'land'];
  const bedroomOptions = [1, 2, 3, 4, 5];
  const bathroomOptions = [1, 2, 3, 4];

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = { type: 'all' };
    setLocalFilters(resetFilters);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filter Properties</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Property Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Type</Text>
            <View style={styles.optionsContainer}>
              {propertyTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.option,
                    localFilters.type === type && styles.selectedOption
                  ]}
                  onPress={() => setLocalFilters({ ...localFilters, type: type as any })}
                >
                  <Text style={[
                    styles.optionText,
                    localFilters.type === type && styles.selectedOptionText
                  ]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.priceContainer}>
              <View style={styles.priceInput}>
                <Text style={styles.priceLabel}>Min Price</Text>
                <TextInput
                  style={styles.input}
                  value={localFilters.minPrice?.toString() || ''}
                  onChangeText={(text) => setLocalFilters({ 
                    ...localFilters, 
                    minPrice: text ? parseInt(text) : undefined 
                  })}
                  placeholder="$0"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.priceInput}>
                <Text style={styles.priceLabel}>Max Price</Text>
                <TextInput
                  style={styles.input}
                  value={localFilters.maxPrice?.toString() || ''}
                  onChangeText={(text) => setLocalFilters({ 
                    ...localFilters, 
                    maxPrice: text ? parseInt(text) : undefined 
                  })}
                  placeholder="No limit"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Bedrooms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bedrooms</Text>
            <View style={styles.optionsContainer}>
              {bedroomOptions.map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.option,
                    localFilters.bedrooms === num && styles.selectedOption
                  ]}
                  onPress={() => setLocalFilters({ 
                    ...localFilters, 
                    bedrooms: localFilters.bedrooms === num ? undefined : num 
                  })}
                >
                  <Text style={[
                    styles.optionText,
                    localFilters.bedrooms === num && styles.selectedOptionText
                  ]}>
                    {num}+
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bathrooms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bathrooms</Text>
            <View style={styles.optionsContainer}>
              {bathroomOptions.map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.option,
                    localFilters.bathrooms === num && styles.selectedOption
                  ]}
                  onPress={() => setLocalFilters({ 
                    ...localFilters, 
                    bathrooms: localFilters.bathrooms === num ? undefined : num 
                  })}
                >
                  <Text style={[
                    styles.optionText,
                    localFilters.bathrooms === num && styles.selectedOptionText
                  ]}>
                    {num}+
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  selectedOption: {
    backgroundColor: '#1e40af',
    borderColor: '#1e40af',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  priceInput: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#1e40af',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});