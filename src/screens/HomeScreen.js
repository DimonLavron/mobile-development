import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, FlatList } from "react-native";
import { CommonActions } from "@react-navigation/native";
import firebase from "../firebase";
import moment from "moment";

const HomeScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

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

    const handleCreate = () => {
        navigation.navigate("Add New Entity");
    }

    const handleEdit = (id, description, startDate, endDate) => {
        navigation.navigate("Edit Entity", {
            id: id,
            description: description,
            startDate: startDate,
            endDate: endDate,
        })
    }

    useEffect(() => {
        fetch('https://api.clockify.me/api/v1/workspaces/6001c6ee791ff71a3174ae27/user/5f20150af5c6fb1a46e90310/time-entries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'XykfoDr8mRyCmvI+'
            }
        }).then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => Alert.alert(error))
        .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);
        let response = await fetch('https://api.clockify.me/api/v1/workspaces/6001c6ee791ff71a3174ae27/time-entries/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'XykfoDr8mRyCmvI+'
            }
        });
        fetch('https://api.clockify.me/api/v1/workspaces/6001c6ee791ff71a3174ae27/user/5f20150af5c6fb1a46e90310/time-entries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'XykfoDr8mRyCmvI+'
            }
        }).then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => Alert.alert(error))
        .finally(() => setLoading(false));
    }

    const handleRefresh = () => {
        setLoading(true);
        fetch('https://api.clockify.me/api/v1/workspaces/6001c6ee791ff71a3174ae27/user/5f20150af5c6fb1a46e90310/time-entries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'XykfoDr8mRyCmvI+'
            }
        }).then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => Alert.alert(error))
        .finally(() => setLoading(false));
    }

    const handleCalculateInvoice = () => {
        let total = 0;
        for (entity of data) {
            total += new Date(entity.timeInterval.end).getTime() - new Date(entity.timeInterval.start).getTime();
        }
        total = total / (1000 * 3600);
        navigation.navigate("Calculate Invoice", { total: total });
    }

    const Item = ({ startDate, endDate, description, id }) => (
        <View style={styles.item}>
          <Text>Start Date: {moment.utc(startDate).local().format('MMM D YYYY, h:mm:ss a')}</Text>
          <Text>End Date: {moment.utc(endDate).local().format('MMM D YYYY, h:mm:ss a')}</Text>
          <Text style={styles.title}>{description}</Text>
          <Button 
            title='edit'
            onPress={() => handleEdit(id, description, startDate, endDate)} 
          />
          <Button 
            title='delete'
            onPress={() => handleDelete(id)} 
          />
        </View>
    );
    
    const renderItem = ({ item }) => (
        <Item 
            startDate={item.timeInterval.start} 
            endDate={item.timeInterval.end} 
            description={item.description}
            id={item.id} 
        />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <Button
                        title='Refresh'
                        onPress={handleRefresh}
                    />
                    <Button
                        title='Create new entity'
                        onPress={handleCreate}
                    />
                    <Button
                        title='Calculate invoice'
                        onPress={handleCalculateInvoice}
                    />
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
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#90EE90',
        borderRadius: 20,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
});

export default HomeScreen;