import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Customer = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Effect hook để lấy dữ liệu từ Firestore khi màn hình được tạo
        const fetchBookings = async () => {
            try {
                const snapshot = await firestore().collection('bookings').get();
                const bookingsData = snapshot.docs.map(doc => doc.data());
                setBookings(bookingsData);
            } catch (error) {
                console.error('Error fetching bookings: ', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <View style={styles.container}>

            <FlatList
                data={bookings}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>Service Name: {item.serviceName}</Text>
                        <Text>Prices: {item.prices}</Text>
                        <Text>Booking Date: {item.bookingDate}</Text>
                        <Text>Booking Time: {item.bookingTime}</Text>

                        {/* Thêm các trường dữ liệu khác tùy thuộc vào cấu trúc của bảng bookings */}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        marginBottom: 10,
    },
});

export default Customer;
