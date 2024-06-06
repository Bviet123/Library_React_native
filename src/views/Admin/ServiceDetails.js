import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert, Image, Button, FlatList } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';


const ServiceDetails = ({ route, navigation }) => {
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
    const [description, setDescription] = useState(service.description);


    const [imageUrl, setImageUrl] = useState(service.imageUrl);

    //Author

    const [authorsList, setAuthorsList] = useState([]);
    const [authorsListVisible, setAuthorsListVisible] = useState(false);
    const [authorInputFocused, setAuthorInputFocused] = useState(false);
    const authorInputRef = useRef(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const authorsSnapshot = await firestore().collection('authors').get();
                const authorsData = authorsSnapshot.docs.map((doc) => doc.data());
                setAuthorsList(authorsData);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchAuthors();
    }, []);

    //Genre

    const [genreList, setGenreList] = useState([]);
    const [genreListVisible, setGenreListVisible] = useState(false);
    const [genreInputFocused, setGenreInputFocused] = useState(false);
    const genreInputRef = useRef(null);

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const genreSnapshot = await firestore().collection('genre').get();
                const genresData = genreSnapshot.docs.map((doc) => doc.data());
                setGenreList(genresData);
            } catch (error) {
                console.error('Error fetching genre:', error);
            }
        };

        fetchGenre();
    }, []);

    //Pulisher

    const [publisherList, setPulisherList] = useState([]);
    const [publisherListVisible, setPulisherListVisible] = useState(false);
    const [publisherInputFocused, setPulisherInputFocused] = useState(false);
    const publisherInputRef = useRef(null);

    useEffect(() => {
        const fetchPulisher = async () => {
            try {
                const publisherSnapshot = await firestore().collection('pulishers').get();
                const publishersData = publisherSnapshot.docs.map((doc) => doc.data());
                setPulisherList(publishersData);
            } catch (error) {
                console.error('Error fetching pulisher:', error);
            }
        };

        fetchPulisher();
    }, []);

    const handleChooseImage = () => {
        ImagePicker.openPicker({}).then(image => {
            const source = { uri: image.path };
            setImageUrl(source.uri);
        }).catch(error => {
            console.log(error);
        });
    };

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || publicationDate;
        setPublicationDate(currentDate);
        setShowPicker(false);
    };
    const handleDelete = async () => {
        Alert.alert(
            'Xác nhận xoá',
            'Bạn có chắc chắn muốn xoá cuốn sách này không?',
            [
                { text: 'Huỷ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Xoá', onPress: () => deleteService(), style: 'destructive' },
            ]
        );
    };
    const handleUpdate = async () => {
        if (updatedServiceName.trim() === '' || updatedPrices.trim() === '' || updatedGenre.trim() === ''
            || updatedPubDate === '' || updatedPulisher === '' || updatedCopyRight === '') {
            Alert.alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            const querySnapshot = await firestore()
                .collection('books')
                .where('bookTitle', '==', service.bookTitle)
                .get();

            querySnapshot.forEach(async documentSnapshot => {
                await documentSnapshot.ref.update({
                    bookTitle: updatedServiceName.trim(),
                    author: updatedPrices.trim(),
                    genre: updatedGenre.trim(),
                    publisher: updatedPulisher.trim(),
                    copyright: updatedCopyRight.trim(),
                    description: description.trim(),
                    imageUrl: imageUrl,
                });
            });

            console.log('Book updated successfully');
            Alert.alert('Thông báo', 'Bạn đã chỉnh sửa thành công');
            setModalVisible(false);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error updating service:', error);
            Alert.alert('Thông báo', 'Chỉnh sửa không thành công');
        }
    };

    const deleteService = async () => {
        try {
            const querySnapshot = await firestore()
                .collection('books')
                .where('bookTitle', '==', service.bookTitle)
                .get();

            querySnapshot.forEach(async (documentSnapshot) => {
                await documentSnapshot.ref.delete();
                console.log('Book deleted successfully');
                Alert.alert('Thông báo', 'Bạn đã xoá sách thành công');
                navigation.goBack();
            });
        } catch (error) {
            console.error('Error deleting book:', error);
            Alert.alert('Thông báo', 'Xoá sách không thành công');
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
                <View style={styles.imageContainer}>
                    {imageUrl && (
                        <Image source={{ uri: imageUrl }} style={styles.image} />
                    )}
                    <TouchableOpacity onPress={handleChooseImage} style={styles.chooseImageText} >
                        <Text style={{ color: 'white' }}>Chọn ảnh</Text>
                    </TouchableOpacity>
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
                            editable={isEditMode}
                            onFocus={() => setAuthorsListVisible(true)}
                            onBlur={() => setAuthorInputFocused(false)}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    authorInputRef.current.focus();
                    setAuthorsListVisible(!authorsListVisible);
                }}>

                </TouchableOpacity>
                {authorsList.length > 0 && (authorsListVisible || authorInputFocused) && (
                    <FlatList
                        data={authorsList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <Text style={styles.itemText}>{item.title}</Text>
                                <TouchableOpacity onPress={() => {
                                    setUpdatedPrices(item.authorName);
                                    setAuthorsListVisible(false);
                                }}>
                                    <Text style={{ marginLeft: 10 }}>{item.authorName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        style={{ height: 100, borderWidth: 1 }}
                    />
                )}
                <View style={styles.section}>
                    <Text style={styles.label}>Thể loại:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={updatedGenre}
                            onChangeText={setUpdatedGener}
                            placeholder="Thể loại"
                            editable={isEditMode}
                            onFocus={() => setGenreListVisible(true)}
                            onBlur={() => setGenreInputFocused(false)}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    genreInputRef.current.focus();
                    setGenreListVisible(!genreListVisible);
                }}>
                </TouchableOpacity>
                {genreList.length > 0 && (genreListVisible || genreInputFocused) && (
                    <FlatList
                        data={genreList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <Text style={styles.itemText}>{item.title}</Text>
                                <TouchableOpacity onPress={() => {
                                    setUpdatedGener(item.GenreName);
                                    setGenreListVisible(false);
                                }}>
                                    <Text style={{ marginLeft: 10 }}>{item.GenreName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        style={{ height: 100, borderWidth: 1 }}
                    />
                )}
                <View style={styles.section}>
                    <Text style={styles.label}>Nhà xuất bản:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={updatedPulisher}
                            onChangeText={setUpdatedPulisher}
                            placeholder="Nhà xuất bản...."
                            editable={isEditMode}
                            onFocus={() => setPulisherListVisible(true)}
                            onBlur={() => setPulisherInputFocused(false)}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    publisherInputRef.current.focus();
                    setGenreListVisible(!publisherListVisible);
                }}>
                </TouchableOpacity>
                {publisherList.length > 0 && (publisherListVisible || publisherInputFocused) && (
                    <FlatList
                        data={publisherList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <Text style={styles.itemText}>{item.title}</Text>
                                <TouchableOpacity onPress={() => {
                                    setUpdatedPulisher(item.PulisherName);
                                    setPulisherListVisible(false);
                                }}>
                                    <Text style={styles.publisherItem}>{item.PulisherName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        style={{ height: 100 }}
                    />
                )}
                <View style={styles.section}>
                    <Text style={{ fontWeight: 'bold' }}>Ngày xuất bản</Text>
                    <TouchableOpacity onPress={toggleDatePicker}>
                        <TextInput
                            placeholder="Chọn ngày xuất bản"
                            editable={false}
                            value={publicationDate ? publicationDate.toLocaleDateString() : updatedPubDate}
                            style={styles.input}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Bản quyền:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={updatedCopyRight}
                            onChangeText={setUpdatedCopyRight}
                            placeholder="Bản quyền thuộc về....."
                            editable={isEditMode}
                        />
                    </View>
                </View>
                <TextInput
                    placeholder="mô tả"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setDescription}
                    value={description}
                    style={{borderWidth: 1, width: '100%', height: 100, borderRadius: 10}}
                />
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
        padding: 5,
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

export default ServiceDetails;
