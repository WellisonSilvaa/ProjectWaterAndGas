import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import commonStyles from "../commonStyles";
import Icon from 'react-native-vector-icons/FontAwesome'
import IconIonic from "react-native-vector-icons/Ionicons"

import moment from "moment";
import 'moment/locale/pt-br'


export default props => {

    const doneOrNotStyle = props.doneAt != null
        ? {
            backgroundColor: '#c7e6fd'
        }
        : {}

    const formatteDate = moment(props.orderTime).locale('pt-br').format('llll')

    return (
        <View style={[styles.container, doneOrNotStyle]}>
            <Pressable
                onPress={() => props.toggleOrder(props.id)}
                style={styles.checkContainer}
            >
                {getCheckView(props.doneAt)}
            </Pressable>
            <View>
                <View style={styles.iconsInfo}>
                    <IconIonic
                        style={styles.icons}
                        name="person-outline"
                        size={20}
                    />
                    <Text>{props.client}</Text>
                </View>
                <View style={styles.iconsInfo}>
                    <IconIonic
                        style={styles.icons}
                        name="pricetags-outline"
                        size={20}
                    />
                    <Text>{props.quantity} {props.product}</Text>
                </View>
                <View>
                    {
                        !props.quantity2
                            ? <View></View>
                            : <View style={styles.iconsInfo}>
                                <IconIonic
                                    style={styles.icons}
                                    name="pricetags-outline"
                                    size={20}
                                />
                                <Text>{props.quantity2} {props.product2}</Text>
                            </View>
                    }
                </View>
                <View style={styles.iconsInfo}>
                    <IconIonic
                        style={styles.icons}
                        name="location-outline"
                        size={20}
                    />
                    <Text>{props.customerAddress}</Text>
                </View>
                <View style={styles.iconsInfo}>
                    <IconIonic
                        style={styles.icons}
                        name={
                            props.formPayment == 'Pix'
                                ? (
                                    'wallet-outline'
                                )
                                : props.formPayment == 'Dinheiro'
                                    ? (
                                        'cash-outline'
                                    )
                                    : (
                                        'card-outline'
                                    )
                        }
                        size={20}
                    />
                    <Text>
                        {
                            props.formPayment === "Pix"
                                ? (
                                    'Forma de pagamento ' + props.formPayment
                                )
                                : (
                                    props.formPayment === 'Dinheiro'
                                        ? (
                                            'Dinheiro - Troco = R$' + props.change
                                        )
                                        : (
                                            'Cartão de ' + props.creditOrDebit
                                        )
                                )

                        }
                    </Text>
                </View>
                <View style={styles.iconsInfo}>
                    <IconIonic
                        style={styles.icons}
                        name="time-outline"
                        size={20}
                    />
                    <Text>{formatteDate}</Text>
                </View>
                <View>
                    {
                        !props.additionalInfo
                            ? <View></View>
                            : <View style={styles.iconsInfo}>
                                <IconIonic
                                    style={styles.icons}
                                    name="alert-outline"
                                    size={20}
                                    color='red'
                                />
                                <Text
                                    style={{
                                        color: 'red'
                                    }}
                                >{props.additionalInfo}</Text>
                            </View>
                    }
                </View>
            </View>
        </View>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon
                    name="check"
                    size={20}
                    color='#FFF'
                >
                </Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: '#AAA',
        borderBottomWidth: 1,
        paddingVertical: 20,
        alignItems: 'center',
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        justifyContent: "center",
        alignItems: "center"
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    iconsInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    },
    icons: {
        marginRight: 10
    }
})