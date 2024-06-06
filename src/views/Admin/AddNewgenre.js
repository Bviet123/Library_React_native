import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddNewGenre = () => {
  const [genreName, setGenreName] = useState('');
  const [description, setDescription] = useState('');

  const addGenre = async () => {
    if (genreName.trim() === '' || description.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }


    try {
      await firestore()
        .collection('genre')
        .add({
          GenreName: genreName.trim(),
          description: description.trim(),
        });
      Alert.alert('Success', 'Genre added successfully');
      //navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding author:', error);
      Alert.alert('Error', 'An error occurred while adding the Genre');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.bottomContainer}>
        <Text style={{ fontWeight: 'bold' }}>Tên thể loại</Text>
        <TextInput
          placeholder="Kinh Dị"
          onChangeText={setGenreName}
          value={genreName}
          style={styles.input}
        />
        <Text style={{ fontWeight: 'bold' }}>Giới thiệu</Text>
        <TextInput
          placeholder="Kinh dị là thể loại chứ nhiều tình tiết ......"
          multiline={true}
          numberOfLines={4}
          onChangeText={setDescription}
          value={description}
          style={styles.descriptionInput}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={addGenre} style={styles.button}>
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
    borderRadius: 30,
  },
  descriptionInput: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
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
    borderColor: '#075eec',
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
});

export default AddNewGenre;
