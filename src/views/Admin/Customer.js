import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import DetailsCustom from './CustomerDetails';

const Stack = createStackNavigator();

const Customer = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesSnapshot = await firestore().collection('bookings').get();
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
        navigation.navigate('DetailsCustomer', { service });
    };

    const filteredServices = services.filter((service) =>
        service.bookTitle.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.input, item.bookReturn ? styles.returnedBackground : styles.borrowedBackground]} onPress={() => handleServicePress(item)}>
          <View style={styles.itemContainer}>
            <Image
              source={item.imageUrl ? { uri: item.imageUrl } : placeholderImage}
              style={styles.image}
              onError={(error) => console.error('Error loading image:', error)}
            />
            <View style={styles.aroundContainer}>
              <Text style={styles.Name}>{item.bookTitle}</Text>
              <Text style={styles.author}>Ngày mượn: {item.bookingDate}</Text>
              <Text style={styles.author}>Ngày trả: {item.returnDate}</Text>
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
                    placeholder="Tìm kiếm theo tên sách..."
                    onChangeText={handleSearchChange}
                    value={searchText}
                />
                <View style={styles.header}>
                    <Text style={styles.headerText}>Danh sách sách được mượn</Text>
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

const CustomerHome = ({ route }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="CustomerMain"
                component={Customer}
                initialParams={route.params}
            />
            <Stack.Screen
                name="DetailsCustomer"
                component={DetailsCustom}
                initialParams={route.params}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    returnedBackground: {
        backgroundColor: 'lightgreen', 
    },
    borrowedBackground: {
        backgroundColor: 'lightcoral', 
    },
    chooseImageText: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30
    },
    chooseImageText2: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        marginTop: 10
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
        width: '100%',
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
        height: 80,
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
export default CustomerHome;
