import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { useGlobalContext } from "../auth/AuthContext";
import InfoBox from "./InfoBox";
import { signOut } from "../services/appwrite";

const Profile = ({ route }) => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [reservations, setReservations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.reservation) {
      setReservations(prevReservations => [...prevReservations, route.params.reservation]);
    }
  }, [route.params?.reservation]);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    navigation.replace('Login');
  };

  const renderReservationItem = ({ item }) => (
    <View style={styles.reservationCard}>
      <Text style={styles.reservationTitle}>Device ID: {item.deviceId}</Text>
      <Text style={styles.reservationDetail}>Name: {item.name}</Text>
      <Text style={styles.reservationDetail}>Email: {item.email}</Text>
      <Text style={styles.reservationDetail}>Phone: {item.phone}</Text>
      <Text style={styles.reservationDetail}>Date: {new Date(item.date).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.date.toString()}
        renderItem={renderReservationItem}
        ListHeaderComponent={() => (
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image
                source={{ uri: 'https://img.icons8.com/material-rounded/24/000000/exit.png' }}
                style={styles.logoutIcon}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: user?.avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
            <Text style={styles.username}>{user?.username}</Text>
            <Text style={styles.accountId}>Account ID: {user?.accountId}</Text>
            <View style={styles.infoBoxes}>
              <InfoBox
                title={reservations.length || 0}
                subtitle="Reservations"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    marginBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  logoutText: {
    marginLeft: 5,
    color: '#FFF',
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  username: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  accountId: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 5,
  },
  infoBoxes: {
    flexDirection: 'row',
    marginTop: 20,
  },
  reservationCard: {
    backgroundColor: '#2c2c2c',
    padding: 16,
    margin: 8,
    borderRadius: 8,
  },
  reservationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  reservationDetail: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
});

export default Profile;
