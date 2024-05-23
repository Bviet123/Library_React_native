import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileCustomer from './ProfileCustomer'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import Details from './Details'

const Stack = createStackNavigator();

const HomeScreenCustomer = ({ navigation, route }) => {
    const [services, setServices] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesSnapshot = await firestore().collection('services').get();
                const servicesData = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        const fetchUserData = async () => {
            try {
                const userQuerySnapshot = await firestore().collection('user').get();
                userQuerySnapshot.forEach(doc => {
                    const user = doc.data();
                    setUsername(user.user);
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchServices();
        fetchUserData();

        const unsubscribe = navigation.addListener('focus', () => {
            fetchServices();
            fetchUserData();
        });

        return unsubscribe;
    }, [navigation]);


    const handleServicePress = (service) => {
        navigation.navigate('Details', { service });
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.input} onPress={() => handleServicePress(item)}>
            <View style={styles.itemContainer}>
                <Text>{item.service}</Text>
                <Text>{item.prices}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Upper View */}
            <View style={styles.upperView}>
                {/* Username */}
                <Text style={styles.username}>{username}</Text>
                {/* Profile icon */}
                <TouchableOpacity onPress={() => navigation.navigate('ProfileCustomer')}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../../image/logo_user.jpg')}
                            style={{ width: 25, height: 25 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>


                <View style={styles.header}>
                    <Text style={styles.headerText}>DANH SÁCH DỊCH VỤ</Text>

                </View>

                <FlatList
                    data={services}
                    renderItem={renderItem}
                    keyExtractor={item => String(item.id)}
                    style={styles.list}
                />
            </View>
        </View>
    );
};

const HomeCustomer = ({ route }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="HomeCustomer"
                component={HomeScreenCustomer}
                initialParams={route.params}
            />
            <Stack.Screen name="ProfileCustomer" component={ProfileCustomer} />
            <Stack.Screen name="Details" component={Details} />

        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingTop: 10
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
        fontSize: 30,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'black'
    },
    addButton: {
        backgroundColor: 'pink',
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
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    username: {
        marginRight: 'auto',
        marginLeft: 10,
    },
    iconContainer: {
        padding: 5,
    },
    list: {
        paddingTop: 20,

    }
});

export default HomeCustomer;
