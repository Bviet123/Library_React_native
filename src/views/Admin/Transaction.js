import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Author from "./Author";
import Genre from "./Genre";
import Publisher from "./Publisher";
import UserAccount from "./UserAccount";

const Stack = createStackNavigator();

const TransactionScreen = () => {

  const navigation = useNavigation();

  const handleNavigateAuthor = () => {
    navigation.navigate('Author');
  };
  const handleNavigateGenre = () => {
    navigation.navigate('Genre');
  };
  const handleNavigatePublisher = () => {
    navigation.navigate('Publisher');
  };
  const handleNavigateAccount = () => {
    navigation.navigate('userAccount');
  };
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleNavigateAuthor} style={styles.button} >
            <Image
              source={require('../../image/author_icon.png')}
              style={styles.image}
            />
            <Text style={{ fontSize: 18, alignSelf: "center", fontWeight: "bold" }}>Danh sách tác giả</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateGenre} style={styles.button} >
            <Image
              source={require('../../image/genre_icon.png')}
              style={styles.image}
            />
            <Text style={{ fontSize: 18, alignSelf: "center", fontWeight: "bold" }}>Danh sách thể loại</Text>

          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleNavigatePublisher} style={styles.button} >
            <Image
              source={require('../../image/publisher_icon.png')}
              style={styles.image}
            />
            <Text style={{ fontSize: 15, alignSelf: "center", fontWeight: "bold" }}>Danh sách nhà sản xuất</Text>

          </TouchableOpacity >
          <TouchableOpacity onPress={handleNavigateAccount} style={styles.button} >
            <Image
              source={require('../../image/user_icon.png')}
              style={styles.image}
            />
            <Text style={{ fontSize: 18, alignSelf: "center", fontWeight: "bold" }}>Danh sách tài khoản</Text>

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const Transaction = ({ route }) => {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TransactionAd" component={TransactionScreen} initialParams={route.params} />
      <Stack.Screen name="Author" component={Author} />
      <Stack.Screen name="Genre" component={Genre} />
      <Stack.Screen name="Publisher" component={Publisher} />
      <Stack.Screen name="userAccount" component={UserAccount} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
    padding: 10,
  },
  button: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
    
  },
});


export default Transaction;
