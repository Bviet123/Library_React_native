import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import AddNewPulisher from './AddNewPulisher';
import PublisherDetails from './PublisherDetails';
import UserAccountDetails from './UserAccountDetails';

const Stack = createStackNavigator();

const AccountScreen = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesSnapshot = await firestore().collection('user').where('role', '==', 'user').get();
                const servicesData = await Promise.all(
                    servicesSnapshot.docs.map(async (doc) => {
                        const service = { id: doc.id, ...doc.data() };
                        return service;
                    })
                );
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching account:', error);
            }
        };

        fetchServices();

        const unsubscribe = navigation.addListener('focus', () => {
            fetchServices();
        });

        return unsubscribe;
    }, [navigation]);

    const handleServicePress = (service) => {
        navigation.navigate('UserDetails', { service });
    };

    const filteredServices = services.filter((service) =>
        service.email.toLowerCase().includes(searchText.toLowerCase())
    );
    const handleSearchChange = (text) => {
        setSearchText(text);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.input} onPress={() => handleServicePress(item)}>
            <View style={styles.borderlist}>
                <Text style={styles.email}>{item.email}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm theo tên tài khoản"
                    onChangeText={handleSearchChange}
                    value={searchText}
                />
                <View style={styles.header}>
                    <Text style={styles.headerText}>DANH SÁCH tài khoản</Text>
                </View>

                <FlatList
                    data={filteredServices}
                    renderItem={renderItem}
                    keyExtractor={item => String(item.id)}
                    style={styles.list}
                />
            </View>
        </View>
    );
};

const UserAccount = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    headerTitle: ' ',
                }}
            />
            
            <Stack.Screen name="UserDetails" component={UserAccountDetails}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInput: {
        height: 40,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10, 
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    borderlist: {
        height: 40,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',

    },
    upperView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        width: 350,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        padding: 10
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        flex: 1,
        fontSize: 18,
    },
    addButton: {
        backgroundColor: 'red',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    itemContainer: {
        flexDirection: 'row',
    },
    username: {
        marginRight: 'auto',
        marginLeft: 10,
    },
    iconContainer: {
        padding: 5,
    },
    Name: {
        fontWeight: 'bold',
        fontSize: 23,
    },
    aroundContainer: {
        paddingLeft: 10,
    },
    publisher: {
        fontSize: 15,
        marginLeft: 4
    },
});

export default UserAccount;
