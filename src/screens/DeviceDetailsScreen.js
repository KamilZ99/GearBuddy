import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const DeviceDetailsScreen = ({ route, navigation }) => {
  const { deviceId } = route.params;
  const [device, setDevice] = useState(null);

  useEffect(() => {
    fetchDeviceDetails();
  }, []);

  const fetchDeviceDetails = async () => {
    try {
      const response = await axios.get(`http://173.249.41.29:5035/api/devices/${deviceId}`);
      setDevice(response.data);
    } catch (error) {
      console.error('Error fetching device details:', error);
      alert('Failed to fetch device details. See console for details.');
    }
  };

  const handleReserve = () => {
    navigation.navigate('ReservationForm', { device });
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Device not found.</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Animatable.Image
        animation="fadeIn"
        source={{ uri: `http://173.249.41.29:5035${device.imageUri}` }}
        style={styles.image}
      />
      <Animatable.Text animation="fadeIn" style={styles.title}>
        {device.name}
      </Animatable.Text>
      <View style={styles.infoBox}>
        <Animatable.Text animation="fadeIn" style={styles.price}>
          Rental Price: ${device.rentalPrice}/day
        </Animatable.Text>
      </View>
      <Animatable.Text animation="fadeIn" style={styles.description}>
        {device.description}
      </Animatable.Text>
      <Animatable.Text animation="fadeIn" style={styles.detail}>
        Model: {device.model}
      </Animatable.Text>
      <Animatable.Text animation="fadeIn" style={styles.detail}>
        Category: {device.category}
      </Animatable.Text>
      <Animatable.Text animation="fadeIn" style={styles.detail}>
        City: {device.city}
      </Animatable.Text>
      <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
        <Text style={styles.reserveButtonText}>Reserve</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 56,
    backgroundColor: '#f7f7f7',
  },
  contentContainer: {
    paddingBottom: 20,
    padding: 50,
    marginTop: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  infoBox: {
    alignSelf: 'center',
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    padding: 10,
    color: '#333',
    textAlign: 'justify',
  },
  detail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  reserveButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  reserveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default DeviceDetailsScreen;
