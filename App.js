import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import RootComponent from './src/routers/index';
import firestore from '@react-native-firebase/firestore';

const App = () => {
   const [defaultUserCreated, setDefaultUserCreated] = useState(false);

   useEffect(() => {
     const createDefaultUser = async () => {
       try {
         const userSnapshot = await firestore().collection('user').get();
         if (userSnapshot.empty && !defaultUserCreated) {
           await firestore().collection('user').add({
             email: 'buiducviet@gmail.com',
             password: '123456',
             name: 'Bùi Đức Việt',
             role: 'admin',

           });
           setDefaultUserCreated(true);
         }
       } catch (error) {
         console.error('lỗi tạo tài khoản:', error);
         Alert.alert('lỗi', 'Lỗi tạo tài khoản');
       }
     };

     createDefaultUser();
   }, [defaultUserCreated]);

  return (
    <RootComponent />
  );
};

export default App;
