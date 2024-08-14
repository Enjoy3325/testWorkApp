import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../../src/types";
import { StackNavigationProp } from '@react-navigation/stack';

interface CustomLinkProps {
  text: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  marginBottom?: number;
  phoneNumber?: string;
  otp?: number;
  onPress?: () => void;
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

const CustomLink: React.FC<CustomLinkProps> = ({ text, textAlign, marginBottom, onPress, phoneNumber, otp }: CustomLinkProps) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePressLink = () => {
    if (onPress) {
      onPress();
    } else {
      switch (text) {
        case "Login":
          navigation.navigate("Login");
          break;
        case "Sign up":
          navigation.navigate("Registration");
          break;
        case 'PhoneOTP':
          if (phoneNumber && otp !== undefined) {
            navigation.navigate('PhoneOTP', { phoneNumber, otp });
          } else {
            console.error('Phone number or OTP is missing');
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <TouchableOpacity onPress={handlePressLink}>
      <Text style={[styles.text, { textAlign, marginBottom }]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomLink;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter_24pt-SemiBold",
    lineHeight: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
    textDecorationColor: "#00D1AC",
    color: "#00D1AC"
  }
});
