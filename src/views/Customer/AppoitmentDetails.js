import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Booking from './Booking';
import DateTimePicker from '@react-native-community/datetimepicker';


const Stack = createStackNavigator();

const AppoitmentDetails = ({ route, navigation }) => {
    const { service } = route.params;
    const [updatedServiceName, setUpdatedServiceName] = useState(service.bookTitle);
    const [imageUrl, setImageUrl] = useState(service.imageUrl);
    const [bookingDate, setBookingDate] = useState(service.bookingDate);
    const [returnDate, setReturnDate] = useState(service.returnDate);
    const [decription, setDecription] = useState(service.decription);
    const [timeAt, setTimeAt] = useState(service.timeAt);

    
    const handleBorrowBook = () => {
        navigation.navigate('Booking', {service}); 
      };
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../image/back_arrow.jpg')}
                        style={{ width: 25, height: 25 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.containerWrapper}>
                <View style={styles.imageContainer}>
                    {imageUrl && (
                        <Image source={{ uri: imageUrl }} style={styles.image} />
                    )}
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Tên sách: </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={updatedServiceName}
                            onChangeText={setUpdatedServiceName}
                            placeholder="Tên Sách"
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Ngày mượn: </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={bookingDate}
                            onChangeText={setBookingDate}
                            placeholder="ngày mượn sách "
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Ngày trả: </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={returnDate}
                            onChangeText={setReturnDate}
                            placeholder="Thể loại"
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Ngày tạo: </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={timeAt}
                            onChangeText={setTimeAt}
                            placeholder="Ngày tạo"
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={{ fontWeight: 'bold' }}>Lời nhắn</Text>
                    <TextInput
                            style={styles.input}
                            value={decription}
                            onChangeText={setDecription}
                            placeholder="Lời nhắn...."
                            editable={false}
                        />
                </View>
            </View>
            
        </View>
    );
};

const Details = ({ route }) => {
    return (
        <Stack.Navigator
            initialRouteName="Details"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Details" component={DetailsScreen} initialParams={route.params} />
            <Stack.Screen name="Booking" component={Booking} options={{ title: 'Booking' }} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        padding: 20,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    topContainer2: {
        marginBottom: 10,
        borderWidth: 2,
        borderRadius: 10
    },
    backButton: {
        justifyContent: 'center',
    },
    editButton: {
        width: '100%',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerWrapper: {
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    section1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    section2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
        height: 40
    },
    input: {
        padding: 10,
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 20,
        borderRadius: 20,
    },

    chooseImageText: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 50
    },
    deleteButton: {
        color: 'red',
    },
});

export default AppoitmentDetails;
