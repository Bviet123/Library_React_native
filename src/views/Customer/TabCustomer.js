import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeCustomer from './HomeCustomer';
import AppoitmentCustomer from './AppoitmentCustomer';
import SettingsCustomer from './SettingsCustomer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, Text } from 'react-native';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabCustomer = ({ navigation, route }) => {
    const userName = route.params?.userName || "Default Name";

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name={"HomeCustomer"}
                component={HomeCustomer}
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
                name="AppoitmentCustomer"
                component={AppoitmentCustomer}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../../image/logo_appoint.png')} 
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="SettingsCustomer"
                component={SettingsCustomer}
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
        <Stack.Screen name="HomeCustomer" component={HomeCustomer} />
    </Stack.Navigator>
);

const TransactionStackScreen = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppoitmentCustomer" component={AppoitmentCustomer} />
    </Stack.Navigator>
);

const CustomerStackScreen = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SettingsCustomer" component={SettingsCustomer} />
    </Stack.Navigator>
);


export default TabCustomer;
