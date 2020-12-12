import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { CommonActions } from "@react-navigation/native";
import firebase from "../firebase";

const HomeScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    const handleSignOut = () => {
        setLoading(true);
        firebase
            .auth()
            .signOut()
            .then(() => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {name: "Sign In"},
                        ],
                    })
                )
            })
            .catch((error) => {
                alert(error);
                setLoading(false);
            })
    }

    const [userName, setUserName] = useState(firebase.auth().currentUser.displayName);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <Text style={styles.text}>Hello, {userName}</Text>
                    <Button
                        title='Sign out'
                        onPress={handleSignOut}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        marginBottom: 20
    }
});

export default HomeScreen;