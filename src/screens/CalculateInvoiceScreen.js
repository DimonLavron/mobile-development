import React, {useState} from "react";
import { Text, View, StyleSheet, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import { State } from "react-native-gesture-handler";
import CurrencyInput from "react-native-currency-input";


const CalculateInvoiceScreen = ({route, navigation}) => {
    const [loading, setLoading] = useState(false);

    const [totalValue, setTotalValue] = useState(route.params.total)
    const [rateValue, setRateValue] = useState(0);

    const handleCalculate = () => {
        setLoading(true);

        Alert.alert("Your invoice is: " + totalValue * rateValue)

        setLoading(false);
    }

    const handleBack = () => {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <Text style={styles.title}>Total hours: {totalValue}</Text>
                    <Text style={styles.text}>Rate</Text>
                    <CurrencyInput 
                        style={styles.textInput}
                        placeholder='Rate'
                        unit='$'
                        separator='.'
                        delimiter=' '
                        precision={2}
                        value={rateValue}
                        onChangeValue={setRateValue}
                    />
                    <Button
                        title='Calculate'
                        onPress={handleCalculate}
                    />
                    <Button
                        title='Back'
                        onPress={handleBack}
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
    error: {
        color: 'red',
        marginBottom: 20
    },
    textInput: {
        height: 40, 
        width: 200, 
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 30,
        marginBottom: 0,
        marginTop: 10,
    },
    hyperlink: {
        fontSize: 12,
        color: "#0000FF"
    },
    dateTimePicker: {
        height: 40, 
        width: 200, 
        margin: 10,
    },
    text: {
        fontSize: 18,
        marginTop: 30,
    },
    title: {
        fontSize: 32,
    },
});

export default CalculateInvoiceScreen;