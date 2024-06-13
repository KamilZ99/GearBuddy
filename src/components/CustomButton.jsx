import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{
        backgroundColor: '#ff3366',
        borderRadius: 20,
        minHeight: 52,
        minWidth: 200,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        ...containerStyles,
        opacity: isLoading ? 0.5 : 1,
      }}
      disabled={isLoading}
    >
      <Text style={{ color: '#fff', fontFamily: 'psemibold', fontSize: 18, ...textStyles }}>
        {title}
      </Text>

      {isLoading && (
        <View style={{ marginLeft: 8 }}>
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="large"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
