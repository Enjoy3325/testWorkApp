import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton/CustomButton';

interface ModalOTPProps {
  visible: boolean;
  otp: number | null;
  expirationTime?: string;
  onClose: () => void;
}

const ModalOTP: React.FC<ModalOTPProps> = ({ visible, otp, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>
            Your Code Verification: <Text style={styles.textCode}>{otp !== null ? otp : 'No OTP'}</Text>
          </Text>
          <CustomButton
            backgroundColor={"#30B0C7"}
            textColor={"#FFFFFF"}
            borderColor={"transparent"}
            title="Close"
            onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    display: "flex",
    justifyContent: "center",
    width: "80%",
    height: "20%",
    padding: 30,
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
    fontFamily: "Inter_18pt-SemiBold",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 20,
    color: "#344054"
  },
  textCode: {
    fontFamily: "Outfit-SemiBold",
    fontSize: 22,
    fontWeight: "600",
    color: "#00D1AC"
  }
});

export default ModalOTP;
