import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

const Booking = ({ route }) => {
    const navigation = useNavigation();
    const { service } = route.params;
    const [updatedServiceName, setUpdatedServiceName] = useState(service.bookTitle);
    const [imageUrl, setImageUrl] = useState(service.imageUrl);
    const [updatedAuthor, setUpdatedAuthor] = useState(service.author);
    const [bookingDate, setBookingDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [decription, setDecription] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [timeAt, setTimeAt] = useState(null); 

    useEffect(() => {
        const currentTime = new Date();
        setTimeAt(currentTime);
    }, []); 

    const handleSaveBooking = async () => {
        if (!bookingDate) {
            Alert.alert('Lỗi', 'Vui lòng chọn ngày mượn');
            return;
        }

        const formattedDate = bookingDate.toLocaleDateString();
        const calculatedReturnDate = new Date(bookingDate);
        calculatedReturnDate.setDate(calculatedReturnDate.getDate() + 6);
        const formattedReturnDate = calculatedReturnDate.toLocaleDateString();

        try {
            await firestore().collection('bookings').add({
                bookTitle: updatedServiceName,
                imageUrl: imageUrl,
                bookingDate: formattedDate,
                returnDate: formattedReturnDate,
                decription: decription,
                timeAt: timeAt.toLocaleDateString(),
                borrow: false,
                bookReturn: false
            });
            Alert.alert('Thông báo', 'Mượn sách thành công! hạn trả của bạn sẽ là 1 tuần');
            navigation.navigate('HomeCustomer');
        } catch (error) {
            console.error('Failed to save booking:', error);
            Alert.alert('Error', 'Failed to save booking');
        }
    };

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || bookingDate; // Handle null case
        setBookingDate(currentDate);
        setShowPicker(false); // Hide the picker after selection
    };
    return (
        <View style={styles.container2}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image
                    source={require('../../image/back_arrow.jpg')}
                    style={{ width: 25, height: 25 }}
                />
            </TouchableOpacity>
            <View style={styles.container2}>
                <View style={styles.containerWrapper}>
                    <View style={styles.imageContainer}>
                        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Tên sách : {updatedServiceName}</Text>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Tác giả : {updatedAuthor}</Text>
                    </View>
                </View>
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Ngày mượn:</Text>
                <TouchableOpacity onPress={toggleDatePicker}>
                    <TextInput
                        style={{ width: '100%', padding: 10, height: 50, borderColor: '#ccc', borderRadius: 10, borderWidth: 2, marginBottom: 10, borderColor: 'black', backgroundColor: 'white' }}
                        placeholder="Nhập ngày-tháng-năm"
                        value={bookingDate ? bookingDate.toLocaleDateString() : ''}
                        onChangeText={setBookingDate}
                        editable={false}
                    />
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                        value={bookingDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Lời nhắn :</Text>
                <TextInput
                    style={{ width: '100%', padding: 10, height: 50, borderColor: '#ccc', borderRadius: 10, borderWidth: 2, marginBottom: 10, borderColor: 'black', backgroundColor: 'white' }}
                    placeholder="lời nhắn"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setDecription}
                    value={decription}
                />
                <View>
                    <TouchableOpacity style={{ backgroundColor: 'green', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 20, width: '100%', height: 35 }} onPress={handleSaveBooking}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Mượn sách</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container2: {
        marginTop: 10,
        padding: 20,
        backgroundColor: '#e8ecf4'
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    containerWrapper: {
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 5,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    input: {
        width: '100%',
        padding: 10,
        height: 50,
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 10,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    addButton: {
        backgroundColor: 'green',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        height: 35,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Booking;
