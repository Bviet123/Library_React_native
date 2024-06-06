import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SettingsCustomer = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.iconWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <View style={styles.iconContainer}>
                    <Image
                            source={require('../../image/logo_logout.png')} 
                            style={{ width: 50, height: 50, borderRadius: 30}}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={{fontWeight: "bold", fontSize: 25, color: 'black'}}>Đăng xuất</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 50
    },
});

export default SettingsCustomer;
