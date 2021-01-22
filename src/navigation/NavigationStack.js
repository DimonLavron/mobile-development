import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddEntityScreen, EditEntityScreen, HomeScreen, SignInScreen, SignUpScreen, CalculateInvoiceScreen } from "../screens";
import firebase from "../firebase";
import { StyleSheet } from "react-native";

const NavigationStack = () => {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={firebase.auth().currentUser ? "Home" : "Sign In"} 
                screenOptions={{ headerLeft: null }}
            >
                <Stack.Screen name='Sign In' component={SignInScreen} />
                <Stack.Screen name='Sign Up' component={SignUpScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Add New Entity' component={AddEntityScreen} />
                <Stack.Screen name='Edit Entity' component={EditEntityScreen} />
                <Stack.Screen name='Calculate Invoice' component={CalculateInvoiceScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default NavigationStack;