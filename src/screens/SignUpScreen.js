import React, {useState} from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import firebase from "../firebase"

const SignUpScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    const [nameValue, setNameValue] = useState('')
    const [nameError, setNameError] = useState('')

    const validateName = (name) => {
        setNameValue(name);
        setNameError('');
        if (!name) {
            setNameError('Empty field');
            return false;
        }
        return true;
    }

    const [phoneValue, setPhoneValue] = useState('')
    const [phoneError, setPhoneError] = useState('')

    const validatePhone = (phone) => {
        setPhoneValue(phone);
        setPhoneError('');
        const phoneTemplate = new RegExp('\\+?[(]?[0-9]{1,4}[)]?[-\\s\\./0-9]*$');
        if (!phone) {
            setPhoneError('Empty field');
            return false;
        }
        else if (!phoneTemplate.test(phone)) {
            setPhoneError('Incorrect phone format');
            return false;
        }
        return true;
    }

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

    const handleSignIn = () => {navigation.navigate('Sign In')}

    const handleSignUp = () => {
        const checkName = validateName(nameValue);
        const checkPhone = validatePhone(phoneValue);
        const checkEmail = validateEmail(emailValue);
        const checkPassword = validatePassword(passwordValue);

        if (checkName && checkPhone && checkEmail && checkPassword) {
            setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(emailValue, passwordValue)
                .then((data) => {
                    data.user.updateProfile({
                        displayName: nameValue,
                        phoneNumber: phoneValue
                    })
                    setLoading(false);
                })
                .catch((error) => {
                    alert(error);
                    setLoading(false);
                })
        }
        else {
            Alert.alert(
                'Invalid registration parametrs',
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
                        placeholder='Name'
                        value={nameValue}
                        onChangeText={ (text) => validateName(text) }
                    />
                    <Text style={styles.error}>{nameError}</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize='none'
                        placeholder='Phone'
                        value={phoneValue}
                        onChangeText={ (text) => validatePhone(text) }
                    />
                    <Text style={styles.error}>{phoneError}</Text>
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
                        title='Sign up'
                        onPress={handleSignUp}
                    />
                    <TouchableOpacity onPress={handleSignIn}>
                        <Text style={styles.hyperlink}>Already have an account? Sign in</Text>
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

export default SignUpScreen;