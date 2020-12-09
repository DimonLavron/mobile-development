import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import firebase from "../firebase";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const MainStack = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUserLoggedIn(user ? true : false);
            setLoading(false);
        });
      }, []);

    return (
        <>
            {loading ? (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            ) : (
                <NavigationContainer>
                    {userLoggedIn ? (
                        <AppStack />
                    ) : (
                        <AuthStack />
                    )}
                </NavigationContainer>
            )}
        </>
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

export default MainStack;