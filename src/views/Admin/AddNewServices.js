import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';


const AddNewServices = ({ navigation }) => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState(null);
  const [publisher, setPublisher] = useState('');
  const [copyright, setCopyright] = useState('');
  const [description, setDescription] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [showPicker, setShowPicker] = useState(false);

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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || publicationDate; // Handle null case
    setPublicationDate(currentDate);
    setShowPicker(false); // Hide the picker after selection
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker); // Toggle showPicker state on click
  };
  const addBook = async () => {
    if (
      bookTitle.trim() === '' ||
      author.trim() === '' ||
      genre.trim() === '' ||
      publisher.trim() === '' ||
      copyright.trim() === ''
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const formattedDate = publicationDate.toLocaleDateString();
    try {
      await firestore()
        .collection('books')
        .add({
          bookTitle: bookTitle.trim(),
          author: author.trim(),
          genre: genre.trim(),
          publicationDate: formattedDate,
          publisher: publisher.trim(),
          description: description.trim(),
          copyright: copyright.trim(),
          imageURI: imageURI,
        });

      Alert.alert('Success', 'Book added successfully');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding book:', error);
      Alert.alert('Error', 'An error occurred while adding the book');
    }
  };

  return (
    <View style={styles.container}>
      <View >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../image/back_arrow.jpg')}
            style={{ width: 35, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{ fontWeight: 'bold' }}>Tên Sách</Text>
        <TextInput
          placeholder="Nhà sách ABC"
          onChangeText={setBookTitle}
          value={bookTitle}
          style={styles.input}

        />

        <Text style={{ fontWeight: 'bold' }}>Tác giả</Text>
        <TextInput
          placeholder="Tên tác giả"
          onChangeText={setAuthor}
          value={author}
          style={styles.input}
          ref={authorInputRef}
          onFocus={() => setAuthorsListVisible(true)}
          onBlur={() => setAuthorInputFocused(false)}
        />
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
                  setAuthor(item.authorName);
                  setAuthorsListVisible(false);
                }}>
                  <Text style={styles.authorItem}>{item.authorName}</Text>
                </TouchableOpacity>
              </View>
            )}
            style={{ height: 100 }}
          />
        )}
        <Text style={{ fontWeight: 'bold' }}>Thể loại</Text>
        <TextInput
          placeholder="Kinh Dị"
          onChangeText={setGenre}
          value={genre}
          style={styles.input}
          ref={genreInputRef}
          onFocus={() => setGenreListVisible(true)}
          onBlur={() => setGenreInputFocused(false)}
        />
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
                  setGenre(item.GenreName);
                  setGenreListVisible(false);
                }}>
                  <Text style={styles.genreItem}>{item.GenreName}</Text>
                </TouchableOpacity>
              </View>
            )}
            style={{ height: 100 }}
          />
        )}

        <Text style={{ fontWeight: 'bold' }}>Ngày xuất bản</Text>
        <TouchableOpacity onPress={toggleDatePicker}>
          <TextInput
            placeholder="Chọn ngày sinh"
            editable={false}
            value={publicationDate ? publicationDate.toLocaleDateString() : ''}
            onChangeText={publicationDate}
            style={styles.input}
          />
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={publicationDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={{ fontWeight: 'bold' }}>Nhà xuất bản</Text>
        <TextInput
          placeholder="Kim Đồng"
          onChangeText={setPublisher}
          value={publisher}
          style={styles.input}
          ref={publisherInputRef}
          onFocus={() => setPulisherListVisible(true)}
          onBlur={() => setPulisherInputFocused(false)}
        />
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
                  setPublisher(item.PulisherName);
                  setPulisherListVisible(false);
                }}>
                  <Text style={styles.publisherItem}>{item.PulisherName}</Text>
                </TouchableOpacity>
              </View>
            )}
            style={{ height: 100 }}
          />
        )}

        <Text style={{ fontWeight: 'bold' }}>Bản quyền</Text>
        <TextInput
          placeholder="CopyRight"
          onChangeText={setCopyright}
          value={copyright}
          style={styles.input}
        />
        <Text style={{ fontWeight: 'bold' }}>Mô tả</Text>
        <TextInput
          placeholder="mô tả"
          multiline={true}
          numberOfLines={4}
          onChangeText={setDescription}
          value={description}
          style={styles.descriptionInput}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={addBook} style={styles.button}>
            <Text style={{ fontSize: 20, color: 'white' }}>Thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10, 
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    height: 45,
    backgroundColor: '#C9D3DB',
    borderColor: 'black',
    marginTop: 10,
  },
  buttonsContainer: {
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  authorInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    marginLeft: 10, // Adjust spacing as needed
    fontSize: 12,
    color: '#007bff', // Or a color of your choice
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNewServices;
