import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Booking from './Booking';
import DateTimePicker from '@react-native-community/datetimepicker';


const Stack = createStackNavigator();

const DetailsScreen = ({ route, navigation }) => {
    const { service } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(true);
    const [updatedServiceName, setUpdatedServiceName] = useState(service.bookTitle);
    const [updatedPrices, setUpdatedPrices] = useState(service.author);
    const [updatedGenre, setUpdatedGener] = useState(service.genre);
    const [updatedPubDate, setUpdatedPubDate] = useState(service.publicationDate);
    const [updatedPulisher, setUpdatedPulisher] = useState(service.publisher);
    const [updatedCopyRight, setUpdatedCopyRight] = useState(service.copyright);
    const [showPicker, setShowPicker] = useState(false);
    const [publicationDate, setPublicationDate] = useState(null);
    const [imageUrl, setImageUrl] = useState(service.imageUrl);

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || publicationDate;
        setPublicationDate(currentDate);
        setShowPicker(false);
    };
    const handleBorrowBook = () => {
        navigation.navigate('Booking', {service}); // Pass book details to Booking screen
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
                    <Text style={styles.label}>Tên sách:</Text>
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
                    <Text style={styles.label}>Tác giả:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={updatedPrices}
                            onChangeText={setUpdatedPrices}
                            placeholder="Tên tác giả"
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Thể loại:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={updatedGenre}
                            onChangeText={setUpdatedGener}
                            placeholder="Thể loại"
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Nhà xuất bản:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={updatedPulisher}
                            onChangeText={setUpdatedPulisher}
                            placeholder="Nhà xuất bản...."
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={{ fontWeight: 'bold' }}>Ngày xuất bản</Text>
                    <TextInput
                        placeholder="Chọn ngày xuất bản"
                        editable={false}
                        value={publicationDate ? publicationDate.toLocaleDateString() : updatedPubDate}
                        style={styles.input}
                    />
                    {showPicker && (
                        <DateTimePicker
                            value={publicationDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Bản quyền:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={updatedCopyRight}
                            onChangeText={setUpdatedCopyRight}
                            placeholder="Bản quyền thuộc về....."
                            editable={false}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <TouchableOpacity style={styles.editButton} onPress={handleBorrowBook}>
                    <Text>Mượn sách</Text>
                </TouchableOpacity>
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

export default Details;
