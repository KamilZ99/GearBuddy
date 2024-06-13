// components/FilterBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const FilterBar = ({ items, onFilterChange, activeFilter, filterBy }) => {
  const filters = [...new Set(items.map(item => item[filterBy]))];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onFilterChange(filter)}
            style={[
              styles.filterButton,
              activeFilter === filter ? styles.activeFilterButton : null
            ]}
          >
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => onFilterChange(null)} style={styles.clearFilterButton}>
          <Text style={styles.clearFilterText}>Clear Filter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingLeft: 10,
  },
  filterButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  activeFilterButton: {
    backgroundColor: '#007bff',
  },
  filterText: {
    color: '#000',
  },
  clearFilterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  clearFilterText: {
    color: '#000',
  },
});

export default FilterBar;
