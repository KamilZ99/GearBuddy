import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const BottomMenu = ({ navigation }) => {
  return (
    <View style={styles.bottomMenu}>
     
   
      <TouchableOpacity   style={styles.menuButton} onPress={() => navigation.navigate('Profile')}>
      <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/552/552721.png?semt=ais_hybrid' }} style={styles.iconImage} />
      <Text>Profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 85,
    marginBottom: 40,
    width:'25%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 295,
    right: 15,
  },
  menuButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});

export default BottomMenu;
