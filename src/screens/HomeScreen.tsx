import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton/CustomButton';
import imageGirl from "../assets/images/imageGirl.png";

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image style={styles.imageWelcome} source={imageGirl} />
          <View>
            <Text style={styles.title}>Welcome to App</Text>
            <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur. A ut pellentesque amet phasellus augue. Neque at felis pulvinar malesuada varius egestas dis cras. </Text>
          </View>

          <View style={{ gap: 8 }}>
            <CustomButton
              title="Login"
              borderColor="transparent"
              backgroundColor="#30B0C7"
              textColor="#FFFFFF"
              onPress={() => navigation.navigate('Login')}
            />
            <CustomButton
              title="Register"
              borderColor="#C4C5C6"
              backgroundColor="#FFFFFF"
              textColor="#14171D"
              onPress={() => navigation.navigate('Registration')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 94,
    paddingTop: 21
  },
  wrapper: {
    width: "100%",
    display: "flex",
    gap: 32,
  },
  imageWelcome: {
    width: "100%",
    height: 358,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    fontFamily: "Outfit-SemiBold",
    lineHeight: 38.4,
    marginBottom: 16,
    color: "#14171D"
  },
  text: {
    fontSize: 16,
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "400",
    lineHeight: 19.2,
    color: "#14171D",
  },
});

export default HomeScreen;
