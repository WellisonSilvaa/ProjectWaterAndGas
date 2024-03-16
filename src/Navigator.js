import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Auth from "./screens/Auth";
import OrderList from "./screens/OrderList"
import AddOrders from "./screens/AddOrders";

const Stack = createStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
                <Stack.Screen name="Auth" component={Auth}  options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={OrderList}  options={{ headerShown: false }} />
                <Stack.Screen name="AddOrders" component={AddOrders} options={{ title: 'Adicionar Pedido'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;