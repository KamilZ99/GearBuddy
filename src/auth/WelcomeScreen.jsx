import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Logo />
   
      <CustomButton
            title="Zaloguj się"
            handlePress={() => navigation.navigate('Login')}
            containerStyles={{ marginTop: 7 }}
           
          />


<CustomButton
            title="Zajerestruj się"
            handlePress={() => navigation.navigate('Register')}
            containerStyles={{ marginTop: 7 }}
           
          />



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4E2DD',
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  }
});

export default WelcomeScreen;
