import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.iconWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <View style={styles.iconContainer}>
                    <Image
                            source={require('../../image/logo_logout.png')} 
                            style={{ width: 25, height: 25 }}
                        />
                    </View>
                </TouchableOpacity>
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
        borderRadius: 50,
    },
});

export default Settings;
