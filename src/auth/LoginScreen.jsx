import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import CustomButton from "../components/CustomButton";
import { TouchableOpacity } from 'react-native';
import FormField from "../components/FormField";
import { useNavigation } from '@react-navigation/native';

import { getCurrentUser, signIn } from "../services/appwrite";
import { useGlobalContext } from "../auth/AuthContext";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const navigation = useNavigation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Uzupełnij wszystkie pola!");
      return; 
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Udało się!", "Pomyślnie zalogowano!");
      navigation.replace("/home"); 
    } catch (error) {
      console.error('Błąd podczas logowania.', error);
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginVertical: 24,
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            resizeMode="contain"
            style={{ width: 100, height: 34 }}
          />

          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 20, fontFamily: 'psemibold' }}>
            Zaloguj się do Filmly
          </Text>

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
            title="Zaloguj się"
            handlePress={submit}
            containerStyles={{ marginTop: 7 }}
            isLoading={isSubmitting}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 5 }}>
            <Text style={{ fontSize: 16, color: '#CCCCCC', fontFamily: 'pregular' }}>
              Nie masz konta? 
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: 'white' }}> Zajerestruj się</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
