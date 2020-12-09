import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen, SignUpScreen } from "../screens";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
          screenOptions={{
            headerLeft: null
          }}
        >
            <Stack.Screen name='Sign In' component={SignInScreen} />
            <Stack.Screen name='Sign Up' component={SignUpScreen} />
        </Stack.Navigator>
    );
}

export default AuthStack;