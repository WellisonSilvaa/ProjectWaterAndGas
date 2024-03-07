import React from "react";
import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import Auth from "./screens/Auth";
import OrderList from "./screens/OrderList"

const Stack = createStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Home" component={OrderList} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;