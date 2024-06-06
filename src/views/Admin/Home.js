import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AddNewServices from './AddNewServices';
import ServiceDetails from './ServiceDetails';
import Profile from './Profile';
import firestore from '@react-native-firebase/firestore';
import Playhoder from '../../image/Playhoder.png'

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState(''); 
    
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesSnapshot = await firestore().collection('books').get();
                const servicesData = await Promise.all(
                    servicesSnapshot.docs.map(async (doc) => {
                        const service = { id: doc.id, ...doc.data() };

                        if (service.imageUri) {
                            const imageRef = storageRef.child(service.imageUri);
                            const downloadURL = await imageRef.getDownloadURL();
                            service.imageUrl = downloadURL;
                        }

                        return service;
                    })
                );
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();

        const unsubscribe = navigation.addListener('focus', () => {
            fetchServices();
        });

        return unsubscribe;
    }, [navigation]);

    const handleServicePress = (service) => {
        navigation.navigate('ServiceDetails', { service });
    };

    const filteredServices = services.filter((service) =>
        service.bookTitle.toLowerCase().includes(searchText.toLowerCase()) ||
        service.author.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.input} onPress={() => handleServicePress(item)}>
            <View style={styles.itemContainer}>
                <Image
                    source={item.imageUrl ? { uri: item.imageUrl } : Playhoder}
                    style={styles.image}
                    onError={(error) => console.error('Error loading image:', error)}
                />
                <View style={styles.aroundContainer}>
                    <Text style={styles.Name}>{item.bookTitle}</Text>
                    <Text style={styles.author}>{item.author}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const handleSearchChange = (text) => {
        setSearchText(text); 
    };

    return (
        <View style={styles.container}>

            <View style={styles.contentContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm theo tiêu đề hoặc tác giả..."
                    onChangeText={handleSearchChange}
                    value={searchText}
                />
                <View style={styles.header}>
                    <Text style={styles.headerText}>DANH SÁCH Sách</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddNewServices')}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
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

const HomeMain = ({ route }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="HomeAD"
                component={HomeScreen}
                initialParams={route.params}
            />
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="AddNewServices" component={AddNewServices} />
            <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
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
        height: 100,
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
    author: {
        fontSize: 15,
        marginLeft: 4
    },
});

export default HomeMain;
