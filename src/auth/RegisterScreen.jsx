import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import { useNavigation } from '@react-navigation/native';

import { createUser } from '../services/appwrite';
import { useGlobalContext } from '../auth/AuthContext';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const navigation = useNavigation();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const submit = async () => {
    if (form.username === '' || form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      navigation.replace('/Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Image
            resizeMode="contain"
            style={{ width: 115, height: 34 }}
          />

          <Text style={{ fontSize: 24, fontWeight: '600', color: '#fff', marginTop: 20 }}>
            Rejestracja
          </Text>

          <FormField
            title="Nazwa"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={{ marginTop: 10 }}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{ marginTop: 7 }}
            keyboardType="email-address"
          />

          <FormField
            title="Hasło"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 7 }}
          />

          <CustomButton
            title="Zajerestruj się"
            handlePress={submit}
            containerStyles={{ marginTop: 7 }}
            isLoading={isSubmitting}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
            <Text style={{ fontSize: 16, color: '#ccc', fontWeight: '400' }}>Masz juz konto?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontSize: 16, color: '#fff', marginLeft: 5 }}>Zaloguj się</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
