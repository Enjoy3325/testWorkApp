import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton/CustomButton';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.title}>Welcome to App  Congratulations!</Text>
            <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur. A ut pellentesque amet phasellus augue. Neque at felis pulvinar malesuada varius egestas dis cras.
              Lorem ipsum dolor sit amet consectetur. A ut pellentesque amet phasellus augue. Neque at felis pulvinar malesuada varius egestas dis cras.</Text>
          </View>

          <View style={{ gap: 8 }}>
            <CustomButton
              title="Back to home"
              borderColor="transparent"
              backgroundColor="#30B0C7"
              textColor="#FFFFFF"
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 16,
  },
  wrapper: {
    width: "100%",
    marginVertical: "50%",
    gap: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    fontFamily: "Outfit-SemiBold",
    lineHeight: 38.4,
    marginBottom: 16,
    color: "#14171D",
  },
  text: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    lineHeight: 19.2,
    color: "#14171D",
  },
});

export default WelcomeScreen;
