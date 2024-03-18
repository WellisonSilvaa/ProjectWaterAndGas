import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonsAddDel from "./buttonsAddDel";

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.features}>
                <Text>{props.product}</Text>
                <Text>R${props.value} reais</Text>
            </View>
            <View>
                <ButtonsAddDel
                    inc={props.inc}
                    dec={props.dec}
                    num={props.num}
                />
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