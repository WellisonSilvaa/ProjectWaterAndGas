import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.features}>
                <Text>{props.product}</Text>
                <Text>{props.value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: '95%',
        height: 100,
        // backgroundColor: "red",
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        marginHorizontal: 10
        
    },
    features: {
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        marginLeft: 30,
        // backgroundColor: 'blue',
        width: '50%'
    }
})