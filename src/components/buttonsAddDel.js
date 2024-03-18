import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";

export default props => {
    return (
        <View>
            <Pressable
                onPress={props.dec}
            >
                <Text>-</Text>
            </Pressable>
            <Text>{props.num}</Text>
            <Pressable
                onPress={props.inc}
            >
                <Text>+</Text>
            </Pressable>
        </View>
    )
}

