import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';


const GenreDetails = ({ route, navigation }) => {
    const { service } = route.params;
    const [isEditMode, setIsEditMode] = useState(true);
    const [updatedGenreName, setUpdatedGenreName] = useState(service.GenreName);
    const [updatedDescription, setUpdatedDescription] = useState(service.description);

    const handleDelete = async () => {
        Alert.alert(
            'Xác nhận xoá',
            'Bạn có chắc chắn muốn xoá thể loại này không?',
            [
                { text: 'Huỷ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Xoá', onPress: () => deleteService(), style: 'destructive' },
            ]
        );
    };
    const handleUpdate = async () => {
        if (updatedGenreName.trim() === '' || updatedDescription === '') {
            Alert.alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
        try {
            const querySnapshot = await firestore()
                .collection('genre')
                .where('GenreName', '==', service.GenreName)
                .get();

            querySnapshot.forEach(async documentSnapshot => {
                await documentSnapshot.ref.update({
                    GenreName: updatedGenreName.trim(),
                    description: updatedDescription.trim(),
                });
            });

            console.log('Genre updated successfully');
            Alert.alert('Thông báo', 'Bạn đã chỉnh sửa thành công');
            navigation.navigate('GenreHome');
        } catch (error) {
            console.error('Error updating Genre:', error);
            Alert.alert('Thông báo', 'Chỉnh sửa không thành công');
        }
    };

    const deleteService = async () => {
        try {
            const querySnapshot = await firestore()
                .collection('genre')
                .where('GenreName', '==', service.GenreName)
                .get();

            querySnapshot.forEach(async (documentSnapshot) => {
                await documentSnapshot.ref.delete();
                console.log('Genre deleted successfully');
                Alert.alert('Thông báo', 'Bạn đã xoá thể loại này thành công');
                navigation.goBack();
            });
        } catch (error) {
            console.error('Error deleting genre:', error);
            Alert.alert('Thông báo', 'Xoá thể loại không thành công');
        }
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
                <View style={styles.section}>
                    <Text style={styles.label}>Tên thể loại:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={updatedGenreName}
                            onChangeText={setUpdatedGenreName}
                            placeholder="Tên thể loại"
                            editable={isEditMode}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={{ fontWeight: 'bold' }}>Giới thiệu: </Text>
                    <TextInput
                        placeholder="giới thiệu"
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={setUpdatedDescription}
                        value={updatedDescription}
                        style={styles.descriptionInput}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <TouchableOpacity style={styles.editButton} onPress={handleUpdate}>
                    <Text>Chỉnh sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton2} onPress={handleDelete}>
                    <Text>Xoá</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        justifyContent: 'center',
    },
    editButton: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButton2: {
        height: 40,
        width: 80,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 50,
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
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
    },
    input: {
        padding: 10,
    },
    image: {
        width: 250,
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

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
    },
    modalButton: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    deleteButton: {
        color: 'red',
    },
});

export default GenreDetails;
