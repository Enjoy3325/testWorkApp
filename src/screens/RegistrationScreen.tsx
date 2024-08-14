import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, KeyboardTypeOptions, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomImput/CustomImput';
import CustomLink from '../components/CustomLink/CustomLink';
import WrapperText from '../components/WrapperText/WrapperText';
import registerUser from '../services/registerUser';

const RegistrationScreen = ({ navigation }: any) => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const inputFields: {
    label: string;
    value: string;
    placeholder?: string;
    placeholderTextColor?: string;
    onChangeText: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
  }[] = [
      { label: 'Name', value: name, placeholder: "Enter name", placeholderTextColor: "#667085", onChangeText: setName },
      { label: 'Last Name', value: lastName, placeholder: "Enter last name", placeholderTextColor: "#667085", onChangeText: setLastName },
      { label: 'Phone number', value: phoneNumber, placeholder: "+33 222 111 2222", placeholderTextColor: "#667085", onChangeText: setPhoneNumber, keyboardType: 'phone-pad' }
    ];

  const isFormValid = () => {
    return name.trim() !== '' && lastName.trim() !== '' && phoneNumber.trim() !== '';
  };

  const handleRegistration = async () => {
    try {
      const result = await registerUser(name, lastName, phoneNumber);
      if (result && result.status === 'success') {
        navigation.navigate('PhoneOTP', { phoneNumber, otp: result.userData.otp });
      } else {
        console.error('Registration failed', result.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#FFFFFF" }}>
      <ScrollView>
        <View style={styles.container}>
          <WrapperText title={"Welcome to App"} text={"Please enter your details."} />
          <View style={styles.wrapperInput}>
            {inputFields.map((field, index) => (
              <CustomInput
                key={index}
                label={field.label}
                value={field.value}
                placeholder={field.placeholder}
                placeholderTextColor={field.placeholderTextColor}
                onChangeText={field.onChangeText}
                keyboardType={field.keyboardType || 'default'}
              />
            ))}

          </View>
          <CustomButton
            title="Continue"
            borderColor="transparent"
            backgroundColor="#30B0C7"
            textColor="#FFFFFF"
            onPress={handleRegistration}
            disabled={isFormValid() ? false : true}
          />
          {/* <ModalOTP
            visible={isModalVisible}
            otp={otp}
            expirationTime={expirationTime}
            onClose={() => setIsModalVisible(false)}
          /> */}
          <View style={styles.wrapperLink}>
            <Text style={styles.text}>Do you have an account?</Text>
            <CustomLink text={"Login"} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: 16,
    paddingBottom: 230,
    paddingTop: 80,
  },
  wrapperText: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 40,
  },
  wrapperInput: {
    gap: 20,
    marginBottom: 16,
  },
  wrapperLink: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  title: {

  },
  text: {
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    marginRight: 4,
    color: "#727477"
  }
});

export default RegistrationScreen;
