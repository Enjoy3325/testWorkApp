import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, TextInput, Text, StyleSheet, Alert } from 'react-native';
import WrapperText from '../components/WrapperText/WrapperText';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomLink from '../components/CustomLink/CustomLink';
import CustomInput from "../components/CustomImput/CustomImput";
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../types";
import { StackNavigationProp } from '@react-navigation/stack';
import CustomModal from '../components/CustomModal/CustomModal';
import useOTP from '../services/useOTP';
import verifyOTP from '../services/verifyOTP';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
type PhoneOTPScreenRouteProp = RouteProp<RootStackParamList, 'PhoneOTP'>;

const PhoneOTPScreen: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [isCodeValid, setIsCodeValid] = useState<boolean | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const [modalText, setModalText] = useState('Your Code Verification:');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { phoneNumber } = useRoute<PhoneOTPScreenRouteProp>().params;
  const inputRefs = useRef<TextInput[]>([]);
  const { otp, sendOTP, loading, error } = useOTP();

  useEffect(() => {
    setIsButtonDisabled(code.length !== 6 || isCodeValid === false);
  }, [code, isCodeValid]);

  const handleVerifyCode = async () => {
    try {
      const response = await verifyOTP(phoneNumber, code);

      if (response.success) {
        setIsCodeValid(true);
        setIsModalVisible(false);
        navigation.navigate('Welcome');
      } else {
        setIsCodeValid(false);
        setModalText("The code you entered is incorrect!");
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Failed to verify the code. Please try again.');
      setIsCodeValid(false);
      setModalText("The code you entered is incorrect!");
      setIsModalVisible(true);
    }
  };

  const handleResendCode = async () => {
    try {
      await sendOTP(phoneNumber);
      setCode('');
      setIsCodeValid(null);
      setModalText('New OTP has been sent.');
      setIsModalVisible(true);
    } catch (error) {
      Alert.alert('Failed to resend the code. Please try again later.');
    }
  };

  const handleChangeText = (text: string, index: number) => {
    const newCodeArray = code.split('');
    newCodeArray[index] = text;

    setCode(newCodeArray.join(''));

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (isCodeValid === false) {
      setIsCodeValid(null);
      setIsModalVisible(false);
    }
  }

  const handleFocus = (index: number) => {
    if (code[index] === '') {
      inputRefs.current[index]?.focus();
    }
  };

  const getInputStyle = (index: number) => {
    const currentChar = code[index];
    const baseStyle = styles.input;
    const filledStyle = currentChar ? styles.filledInput : styles.unfilledInput;
    const invalidStyle = isCodeValid === false ? styles.invalidInput : null;

    return {
      ...baseStyle,
      ...filledStyle,
      ...(invalidStyle || {}),
    };
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>
        <WrapperText title={"Welcome to App"} text={"Enter the confirmation code that was sent to you via SMS"} />
        <Text style={styles.textLabel}>Secure Code</Text>
        <View style={styles.wrapperCode}>
          <View style={styles.wrapperInputs}>
            {Array.from({ length: 6 }).map((_, index) => (
              <View key={index} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-end" }}>
                <CustomInput
                  ref={(el: TextInput) => (inputRefs.current[index] = el)}
                  style={getInputStyle(index)}
                  placeholderTextColor={"#C4C5C6"}
                  value={code[index] || ''}
                  onChangeText={(text) => handleChangeText(text, index)}
                  keyboardType="numeric"
                  onFocus={() => handleFocus(index)}
                  maxLength={1}
                  placeholder='0'
                />
                {index === 2 && <Text style={styles.codeHyphen}>-</Text>}
              </View>
            ))}
          </View>
          <CustomLink onPress={handleResendCode} text={"Resend the Code"} textAlign={"center"} marginBottom={32} />
          {isModalVisible && (
            <CustomModal
              visible={isModalVisible}
              text={modalText}
              subText={isCodeValid === null ? otp : null}
              onClose={() => setIsModalVisible(false)}
            />
          )}

        </View>
        <CustomButton
          title={"Sign up"}
          backgroundColor={"#30B0C7"}
          textColor={"#FFFFFF"}
          borderColor={"transparent"}
          disabled={isButtonDisabled}
          onPress={handleVerifyCode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  textLabel: {
    fontFamily: "Inter_18pt-Medium",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16.8,
    marginBottom: 6,
    color: "#344054"
  },
  wrapperCode: {
    display: "flex",
    gap: 32
  },
  wrapperInputs: {
    height: 64,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    gap: 4,
  },
  input: {
    height: "100%",
    width: 52.5,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "600",
    fontSize: 40,
    lineHeight: 48,
  },
  validInput: {
    borderColor: "#A180DC",
    color: "#30B0C7"
  },
  filledInput: {
    borderColor: "#A180DC",
    color: "#30B0C7"
  },
  unfilledInput: {
    borderColor: "#EEE8F0",
    color: "#C4C5C6"
  },
  invalidInput: {
    borderColor: '#FF4D4F',
    color: "#30B0C7",
  },
  codeHyphen: {
    justifyContent: "space-between",
    fontFamily: "Outfit-SemiBold",
    fontWeight: "600",
    fontSize: 40,
    lineHeight: 48,
    marginLeft: 4,
    padding: 8,
    color: "#C4C5C6"
  },
  errorText: {
    fontFamily: "Inter_18pt-Regular",
    color: "#FF4D4F",
    // marginTop: 10
  },
});

export default PhoneOTPScreen;
