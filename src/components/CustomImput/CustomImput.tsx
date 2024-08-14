import React, { forwardRef } from 'react';
import { Text, TextInput, StyleSheet, TextInputProps, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  value: string;
  label?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  onChangeText: (text: string) => void;
}

const CustomInput = forwardRef<TextInput, CustomInputProps>(({ keyboardType, placeholder, placeholderTextColor, value, label, onChangeText, ...rest }, ref) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        ref={ref}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styles.input}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        maxLength={50}
        {...rest}
      />
    </View>
  )
}
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 6,
  },
  text: {
    fontFamily: "Inter_18pt-Medium",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16.8,
    color: "#344054"
  },
  input: {
    fontFamily: "Inter_18pt-Regular",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22.4,
    paddingHorizontal: 14,
    backgroundColor: "#FCFCFD",
    borderColor: "#D0D5DD",
    color: "#30B0C7"
  },
});

export default CustomInput;
