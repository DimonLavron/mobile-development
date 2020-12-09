import React, {useState} from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import firebase from '../firebase';

const SignInScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    const [emailValue, setEmailValue] = useState('')
    const [emailError, setEmailError] = useState('')

    const validateEmail = (email) => {
        setEmailValue(email);
        setEmailError('');
        const emailTemplate = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
        if (!email) {
            setEmailError('Empty field');
            return false;
        } else if (!emailTemplate.test(email)) {
            setEmailError('Incorrect email format');
            return false;
        }
        return true;
    }

    const [passwordValue, setPasswordValue] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validatePassword = (password) => {
        setPasswordValue(password);
        setPasswordError('');
        if (!password) {
            setPasswordError('Empty field');
            return false;
        }
        else if (password.length < 8) {
            setPasswordError('Password must be greater than 8 symbols');
            return false;
        }
        return true;
    }

    const handleSignUp = () => {navigation.navigate('Sign Up')}

    const handleSignIn = () => {
        const checkEmail = validateEmail(emailValue);
        const checkPassword = validatePassword(passwordValue);

        if (checkEmail && checkPassword) {
            setLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(emailValue, passwordValue)
                .then(() => {
                    setLoading(false);
                })
                .catch((error) => {
                    alert(error);
                    setLoading(false);
                })
        }
        else {
            Alert.alert(
                'Invalid login or password',
                'Check your input data'
            )
        }
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <TextInput 
                        style={styles.textInput}
                        autoCapitalize='none'
                        placeholder='Email'
                        value={emailValue}
                        onChangeText={ (text) => validateEmail(text) }
                    />
                    <Text style={styles.error}>{emailError}</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize='none'
                        placeholder='Password'
                        value={passwordValue}
                        secureTextEntry={true}
                        onChangeText={ (text) => validatePassword(text) }
                    />
                    <Text style={styles.error}>{passwordError}</Text>
                    <Button
                        title='Sign in'
                        onPress={handleSignIn}
                    />
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.hyperlink}>Don`t have an account? Sign up</Text>
                    </TouchableOpacity>
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
    error: {
        color: 'red',
        marginBottom: 20
    },
    textInput: {
        height: 40, 
        width: 200, 
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 10,
    },
    hyperlink: {
        fontSize: 12,
        color: "#0000FF"
    },
});

export default SignInScreen;