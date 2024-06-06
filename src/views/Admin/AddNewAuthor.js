import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import  DateTimePicker  from '@react-native-community/datetimepicker';


const AddNewAuthor = (navigation) => {
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState(null);
    const [gender, setGender] = useState(''); // New state for gender
    const [showPicker, setShowPicker] = useState(false);
    const [genderError, setGenderError] = useState('');
    const [description, setDescription] = useState(''); 
  
    
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || date; // Handle null case
      setDate(currentDate);
      setShowPicker(false); // Hide the picker after selection
    };

    const toggleDatePicker = (navigation) => {
      setShowPicker(!showPicker); // Toggle showPicker state on click
    };

    const validateGender = (newGender) => {
        const validGenderRegex = /^(Nam|Nữ)$/i; // Regular expression for "Nam" or "Nữ" (case insensitive)
        const isValid = validGenderRegex.test(newGender);
        if (!isValid) {
          setGenderError('Giới tính chỉ có thể là Nam hoặc Nữ');
        } else {
          setGenderError(''); // Clear error if valid
        }
        return isValid;
    };
    
    const addAuthor = async () => {
      if (author.trim() === '' || !date || !gender) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
  
      const formattedDate = date.toLocaleDateString();
  
      try {
        await firestore()
          .collection('authors')
          .add({
            authorName: author.trim(),
            dateOfBirth: formattedDate,
            gender: gender.trim(),
            description: description.trim(),
          });
  
        Alert.alert('Success', 'Author added successfully');
      } catch (error) {
        console.error('Error adding author:', error);
        Alert.alert('Error', 'An error occurred while adding the author');
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <Text style={{ fontWeight: 'bold' }}>Tên Tác giả</Text>
          <TextInput
            placeholder="Smith"
            onChangeText={setAuthor}
            value={author}
            style={styles.input}
          />
          <Text style={{ fontWeight: 'bold' }}>Ngày Sinh</Text>
          <TouchableOpacity onPress={toggleDatePicker} style={styles.dateButton}>
            <TextInput
              placeholder="Chọn ngày sinh"
              editable={false}
              value={date ? date.toLocaleDateString() : ''}
              onChangeText={setDate}
              style={styles.input}
            />
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        <Text style={{ fontWeight: 'bold' }}>Giới tính</Text>
        <TextInput
          placeholder="Nam/Nữ"
          onChangeText={(newGender) => {
            setGender(newGender);
            validateGender(newGender); 
          }}
          value={gender}
          style={styles.input}
        /> 
        {genderError && <Text style={{ color: 'red' }}>{genderError}</Text>}
        <Text style={{ fontWeight: 'bold' }}>Giới thiệu</Text>
        <TextInput
            placeholder="giới thiệu"
            multiline={true} 
            numberOfLines={4} 
            onChangeText={setDescription}
            value={description}
            style={styles.descriptionInput} 
        />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={addAuthor} style={styles.button}>
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
});

export default AddNewAuthor;
