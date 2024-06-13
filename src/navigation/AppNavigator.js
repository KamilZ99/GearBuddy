import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useGlobalContext } from '../auth/AuthContext';
import { getCurrentUser } from "../services/appwrite";
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../auth/RegisterScreen';
import WelcomeScreen from '../auth/WelcomeScreen';
import LoginScreen from '../auth/LoginScreen';
import Profile from '../components/profile';
import DeviceDetailsScreen from '../screens/DeviceDetailsScreen'; 
import ReservationForm from '../components/ReservationForm';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLogged } = useGlobalContext();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLogged ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DeviceDetails" component={DeviceDetailsScreen} />
            <Stack.Screen name="ReservationForm" component={ReservationForm} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
