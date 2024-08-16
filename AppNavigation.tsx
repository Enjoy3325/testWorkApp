import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import PhoneOTPScreen from "./src/screens/PhoneOTPScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#272727',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: '', headerBackTitleVisible: false }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerTitle: '', headerBackTitleVisible: false }} />
        <Stack.Screen name="PhoneOTP" component={PhoneOTPScreen} options={{ headerTitle: '', headerBackTitleVisible: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: '', headerBackTitleVisible: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerTitle: '', headerBackTitleVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default AppNavigator;
