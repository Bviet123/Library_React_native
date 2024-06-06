import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import  DateTimePicker  from '@react-native-community/datetimepicker';

const AddNewPulisher = () => {
    const [pulisherName, setPulisherName] = useState('');
    const [pulisherEmail, setPulisherEmail] = useState('');
    const [pulisherPhone, setPulisherPhone] = useState('');
    const [pulisherAddress, setPulisherAdress] = useState('');

    const addPulisher = async () => {
      if (pulisherName.trim() === '' || pulisherEmail.trim() === '' || pulisherPhone.trim() === '' || pulisherAddress.trim() === '') {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }  
      try {
        await firestore()
          .collection('pulishers')
          .add({
            PulisherName: pulisherName.trim(),
            PulisherEmail: pulisherEmail.trim(),
            PulisherPhone: pulisherPhone.trim(),
            PulisherAddress: pulisherAddress.trim(),
          });
  
        Alert.alert('Success', 'Pulisher added successfully');
        //navigation.navigate('Home');
      } catch (error) {
        console.error('Error adding pulisher:', error);
        Alert.alert('Error', 'An error occurred while adding the Pulisher');
      }
    };
  
    return (
      <View style={styles.container}>
        
        <View style={styles.bottomContainer}>
            <Text style={{ fontWeight: 'bold' }}>Tên Nhà sản xuất</Text>
            <TextInput
                placeholder="Alibaba"
                onChangeText={setPulisherName}
                value={pulisherName}
                style={styles.input}
            />
            <Text style={{ fontWeight: 'bold' }}>Email liên lạc</Text>
            <TextInput
                placeholder="abc@gmail.com"
                onChangeText={setPulisherEmail}
                value={pulisherEmail}
                style={styles.input}
            />
            <Text style={{ fontWeight: 'bold' }}>Số điện thoại</Text>
            <TextInput
                placeholder="0215478895"
                onChangeText={setPulisherPhone}
                value={pulisherPhone}
                style={styles.input}
            />
            <Text style={{ fontWeight: 'bold' }}>Địa chỉ</Text>
            <TextInput
                placeholder="Bình Dương"
                onChangeText={setPulisherAdress}
                value={pulisherAddress}
                style={styles.input}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={addPulisher} style={styles.button}>
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
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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

export default AddNewPulisher;
