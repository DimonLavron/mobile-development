import React, {useState} from "react";
import { Text, View, StyleSheet, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


const EditEntityScreen = ({route, navigation}) => {
    const [loading, setLoading] = useState(false);

    const [descriptionValue, setDescriptionValue] = useState(route.params.description)
    const [startDateValue, setStartDateValue] = useState(new Date(route.params.startDate))
    const [endDateValue, setEndDateValue] = useState(new Date(route.params.endDate))

    const handleUpdate = async () => {
        setLoading(true);

        let response = await fetch('https://api.clockify.me/api/v1/workspaces/6001c6ee791ff71a3174ae27/time-entries/' + route.params.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'XykfoDr8mRyCmvI+'
            },
            body: JSON.stringify({
                start: startDateValue.toISOString(),
                description: descriptionValue,
                end: endDateValue.toISOString()
            })
        });

        if (response.status == 200 || response.status == 201) {
            Alert.alert('Entity successfully edited!');
            navigation.navigate('Home');
        }
        else {
            Alert.alert('Something went wrong!');
        }

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
                    <Text style={styles.text}>Description</Text>
                    <TextInput 
                        style={styles.textInput}
                        autoCapitalize='none'
                        placeholder='Description'
                        value={descriptionValue}
                        onChangeText={ (description) => setDescriptionValue(description) }
                    />
                    <Text style={styles.text}>Start Date</Text>
                    <DateTimePicker
                        style={styles.dateTimePicker}  
                        mode="datetime"
                        value={startDateValue}
                        display="default"
                        onChange={(event, date) => setStartDateValue(date)}
                    />
                    <Text style={styles.text}>End Date</Text>
                    <DateTimePicker
                        style={styles.dateTimePicker}  
                        mode="datetime"
                        value={endDateValue}
                        display="default"
                        onChange={(event, date) => setEndDateValue(date)}
                    />
                    <Button
                        title='Edit entity'
                        onPress={handleUpdate}
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
});

export default EditEntityScreen;