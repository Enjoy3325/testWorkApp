import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import WrapperText from '../components/WrapperText/WrapperText';
import CustomInput from '../components/CustomImput/CustomImput';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomLink from '../components/CustomLink/CustomLink';
import { checkPhoneNumberSuccess } from '../services/checkPhoneNumber';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../types";
import { StackNavigationProp } from '@react-navigation/stack';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
const LoginScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsButtonDisabled(phoneNumber.length < 8);
  }, [phoneNumber]);

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const result = await checkPhoneNumberSuccess(phoneNumber);
      if (result.status === 'success') {
        navigation.navigate('Welcome');
      } else {
        setErrorMessage(result.message && 'Phone number not registered.');
      }
    } catch (error) {
      setErrorMessage('Error checking phone number.');
      console.error('Error checking phone number:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>
        <WrapperText title={"Welcome to App"} text={"Please enter your details."} />
        <View style={styles.wrapperContent}>
          <CustomInput
            label={"Phone number"}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="+33 222 111 2222"
            placeholderTextColor="#667085"
            keyboardType="phone-pad" />
          {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
          <CustomButton
            title="Login"
            borderColor="transparent"
            backgroundColor="#30B0C7"
            textColor="#FFFFFF"
            onPress={handleLogin}
            disabled={isButtonDisabled}
          />
        </View>
        <View style={styles.wrapperLink}>
          <Text style={styles.text}>Don’t have an account?</Text>
          <CustomLink text={"Sign up"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  wrapperContent: {
    display: "flex",
    gap: 24
  },
  wrapperLink: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  text: {
    marginRight: 4,
    color: "#727477"
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default LoginScreen;
