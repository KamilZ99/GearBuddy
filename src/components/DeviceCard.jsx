import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const DeviceCard = ({ devices = [], navigation }) => {
  const [likedDevices, setLikedDevices] = useState({});

  const handlePress = (device) => {
    navigation.navigate('DeviceDetails', { deviceId: device._id });
  };

  const toggleLike = (id) => {
    setLikedDevices(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      {devices.length > 0 ? (
        devices.map((device) => (
          <View key={device._id} style={styles.card}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => handlePress(device)}
            >
              <Image
                source={{ uri: `http://173.249.41.29:5035${device.imageUri}` }}
                style={styles.image}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.heartContainer}
                onPress={() => toggleLike(device._id)}
              >
                <Text style={[styles.heartIcon, likedDevices[device._id] ? styles.heartLiked : {}]}>
                  ♥︎
                </Text>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{device.name}</Text>
                <Text style={styles.model}>{device.model}</Text>
                <Text style={styles.category}>{device.category}</Text>
                <Text style={styles.city}>{device.city}</Text>
                <Text style={styles.price}>${device.rentalPrice}/day</Text>
                <TouchableOpacity
                  style={styles.reserveButton}
                  onPress={() => handlePress(device)}
                >
                  <Text style={styles.reserveButtonText}>Reserve</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noDevicesText}>No devices available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  card: {
    width: 250,
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  heartContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 6,
    zIndex: 2,
  },
  heartIcon: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  heartLiked: {
    color: 'red',
  },
  button: {
    width: '100%',
    height: 470,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '50%',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textContainer: {
    padding: 10,
    paddingTop: 0, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  model: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 5,
  },
  city: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  reserveButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  
  },
  reserveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDevicesText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    padding: 20,
  },
});

export default DeviceCard;
