import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import TransactionScreen from './Transaction';
import CustomerScreen from './Customer';
import SettingsScreen from './Settings';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, Text } from 'react-native';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = ({ navigation, route }) => {

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name={"HomeAdmin"}
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../../image/logo_home.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    ),

                }}
            />
            <Tab.Screen
                name="TransacScreen"
                component={TransactionStackScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../../image/logo_transaction.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CustomerOder"
                component={CustomerStackScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../../image/logo_customer.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingsStackScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../../image/logo_setting.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const HomeStackScreen = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
);

const TransactionStackScreen = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Transaction" component={TransactionScreen} />
    </Stack.Navigator>
);

const CustomerStackScreen = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Customer" component={CustomerScreen} />
    </Stack.Navigator>
);

const SettingsStackScreen = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
);

export default TabNavigator;
