import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import firebase from "../firebase";

const HomeScreen = () => {
    const handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then()
            .catch((error) => {
                alert(error);
            })
    }

    const [userName, setUserName] = useState(firebase.auth().currentUser.displayName);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, {userName}</Text>
            <Button
                title='Sign out'
                onPress={handleSignOut}
            />
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