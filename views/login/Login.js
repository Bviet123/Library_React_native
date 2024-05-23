import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const checkCredentials = async () => {
        if (!isValidEmail(username)) {
            Alert.alert('Email không hợp lệ', 'Vui lòng nhập địa chỉ email hợp lệ.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Mật khẩu không hợp lệ', 'Mật khẩu phải có ít nhất 6 kí tự.');
            return;
        }

        setLoading(true);
        try {
            const querySnapshot = await firestore()
                .collection('user')
                .where('email', '==', username)
                .where('password', '==', password)
                .get();

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();

                // Kiem tra quyen
                if (userData.role === 'admin') {
                    console.log('Successful admin login');
                    navigation.navigate('Tab', { userName: username });
                    console.log({ username });
                } else if (userData.role === 'User') {
                    console.log('Successful user login');
                    navigation.navigate('TabC', { userName: username });
                }
            } else {
                Alert.alert('Tên đăng nhập hoặc mật khẩu không đúng');
            }
        } catch (error) {
            console.error('Lỗi kết nối', error);
            Alert.alert('Lỗi kết nối');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Welcome <Text>SpaApp</Text>
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Địa chỉ Email</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                keyboardType="email-address"
                                onChangeText={setUsername}
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={username} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Mật khẩu</Text>
                            <TextInput
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={setPassword}
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                secureTextEntry={true}
                                value={password} />
                        </View>

                        <TouchableOpacity onPress={checkCredentials} disabled={loading}>
                            <View style={styles.btn}>
                                {loading ? (
                                    <ActivityIndicator />
                                ) : (
                                    <Text style={styles.btnText}>Đăng nhập</Text>
                                )}
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.formLink}>Quên mật khẩu?</Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>

            <TouchableOpacity
                onPress={handleRegister}
                style={{ marginTop: 'auto' }}>
                <Text style={styles.formFooter}>
                    Không có tài khoản?{' '}
                    <Text style={{ textDecorationLine: 'underline' }}>Đăng kí</Text>
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 0,
        backgroundColor: '#e8ecf4',
    },
    title: {
        fontSize: 31,
        fontWeight: '700',
        color: '#FFC0CB',
        marginBottom: 6,
    },
    /** Header */
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 36,
    },
    headerImg: {
        width: 500,
        height: 100,
        alignSelf: 'center',
        marginBottom: 36,
    },
    /** Form */
    form: {
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    formLink: {
        fontSize: 16,
        fontWeight: '600',
        color: '#075eec',
        textAlign: 'center',
        marginTop: 12,
    },
    formFooter: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
    },
    /** Input */
    input: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        borderWidth: 1,
        borderColor: '#C9D3DB',
        borderStyle: 'solid',
    },
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#FFC0CB',
        borderColor: '#075eec',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
});
