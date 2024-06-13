import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ marginBottom: 16, ...otherStyles }}>
      <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: 'pmedium' }}>{title}</Text>

      <View style={{ width: '100%', height: 50, paddingHorizontal: 16, backgroundColor: 'white', borderRadius: 20, borderWidth: 2, borderColor: '#333333', flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, color: 'black', fontFamily: 'psemibold', fontSize: 16 }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={{ uri: showPassword  }}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
