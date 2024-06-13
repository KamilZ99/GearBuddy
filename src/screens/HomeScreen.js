import React, { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, ImageBackground, StyleSheet, Text, ScrollView } from 'react-native';
import { fetchDevices } from '../services/deviceServices';
import DeviceCard from '../components/DeviceCard';
import FilterBar from '../components/FilterBar';
import BottomMenu from '../components/BottomMenu';
import Logo from '../components/Logo';

const HomeScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [devices, setDevices] = useState([]);

  const loadDevices = useCallback(async () => {
    try {
      const fetchedDevices = await fetchDevices();
      setDevices(fetchedDevices);
    } catch (error) {
      console.error('There was an error fetching the devices: ', error);
    }
  }, []);

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  const categories = [...new Set(devices.map(device => device.category))];

  const filteredDevices = activeFilter
    ? devices.filter(device => device.category === activeFilter)
    : devices;

  return (
    <ImageBackground style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.logoContainer}>
            <Logo />
          </View>

          {devices.length > 0 && (
            <FilterBar
              items={devices}
              onFilterChange={setActiveFilter}
              activeFilter={activeFilter}
              filterBy="category"
            />
          )}

          {activeFilter
            ? (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>{activeFilter}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <DeviceCard
                    devices={filteredDevices}
                    navigation={navigation}
                    refreshDevices={loadDevices}
                  />
                </ScrollView>
              </View>
            )
            : categories.map((category, index) => (
              <View key={index} style={styles.categorySection}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <DeviceCard
                    devices={devices.filter(device => device.category === category)}
                    navigation={navigation}
                    refreshDevices={loadDevices}
                  />
                </ScrollView>
              </View>
            ))
          }
        </ScrollView>

        <BottomMenu navigation={navigation} />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: '#E4E2DD',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {},
  scrollViewContent: {
    paddingBottom: 90,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  itemCountContainer: {
    top: 1,
    left: 10,
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 19,
    width: '26%',
  },
  itemCountText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
