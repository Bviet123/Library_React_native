import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from '../views/Admin/TabNavigator';
import Login from '../views/login/Login';
import Register from '../views/login/Register'
import TabCustomer from '../views/Customer/TabCustomer'
import TransactionScreen from "../views/Admin/Transaction";


const Stack = createStackNavigator();

export default function RootComponent() {
    return (
        //<Author/>
        //<Home/>
        //<AddNewServices/>
        //<AddNewGenre/>
        //<AddNewPulisher/>
        //<ForgotPasswordScreen/>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Tab" component={TabNavigator} />
                <Stack.Screen name="TabC" component={TabCustomer} />
                <Stack.Screen name="Transaction" component={TransactionScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
