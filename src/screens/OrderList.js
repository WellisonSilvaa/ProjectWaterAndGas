import React, { Component, useState, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, FlatList, Pressable, Keyboard } from "react-native";
import moment from "moment";
import 'moment/locale/pt-br'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Icon from "react-native-vector-icons/FontAwesome";
import IconIonic from "react-native-vector-icons/Ionicons"

import Requests from "../components/Requests";
import { server, showError } from '../common'
import commonStyles from "../commonStyles";
import month from '../../assets/imgs/month.jpg'
import AddOrder from "./AddOrder";
import DeletOrder from "./DeletOrder";

const initialState = {
    showDoneOrders: true,
    showAddOrders: false,
    showDeletOrder: false,
    idDelete: '',
    visibleOrders: [],
    orders: []
}

export default class OrderList extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('ordersState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneOrders: savedState.showDoneOrders
        }, this.filterOrders)

        this.loadOrders()
    }

    loadOrders = async () => {
        try {
            const maxDate = moment().format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/orders?date=${maxDate}`)
            this.setState({ orders: res.data }, this.filterOrders)
        } catch (e) {
            showError(e)
        }
    }

    toogleFilter = () => {
        this.setState({ showDoneOrders: !this.state.showDoneOrders }, this.filterOrders)
    }

    filterOrders = () => {
        let visibleOrders = null
        if (this.state.showDoneOrders) {
            visibleOrders = [...this.state.orders]
        } else {
            const pending = order => order.doneAt === null
            visibleOrders = this.state.orders.filter(pending)
        }
        this.setState({ visibleOrders })
        AsyncStorage.setItem('ordersState', JSON.stringify({
            showDoneOrders: this.state.showDoneOrders
        }))
    }

    showDeleteOrder = id => {
        const newArray = id
        console.log(newArray)
        this.setState({ showDeletOrder: true, idDelete: newArray })
    }

    onDelete = async () => {
        const id = this.state.idDelete
        
        try {
            await axios.delete(`${server}/orders/${id}`)
        } catch (e) {
            showError(e)
        }

        this.setState({ showDeletOrder: false }, this.loadOrders);

    }

    toggleOrder = async orderId => {
        const orders = [...this.state.orders]
        orders.forEach(order => {
            if (order.id === orderId) {
                order.doneAt = order.doneAt
                    ? null
                    : new Date
            }
        })
        this.setState({ orders })
        try {
            await axios.put(`${server}/orders/${orderId}/toggle`)
            await this.loadOrders()
        } catch (e) {
            showError(e)
        }
    }

    handlePressOutsideModal = (event) => {
        if (event.target === event.currentTarget) {
            this.setState({ showAddOrders: false, showDeletOrder: false })
            Keyboard.dismiss();
        }
    };

    addOrder = async newOrder => {
        const currentDate = newOrder.orderTime;
        const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');

        if(newOrder.quantity === '' || !newOrder.quantity.trim()) {
            newOrder.quantity = 0
        }
        if(newOrder.quantity2 === '' || !newOrder.quantity2.trim()) {
            newOrder.quantity2 = 0
        }
        if(newOrder.change === '' || !newOrder.change.trim()) {
            newOrder.change = 0
        }

        try {
            await axios.post(`${server}/orders`, {
                id: Math.random(),
                client: newOrder.client,
                product: newOrder.product,
                quantity: newOrder.quantity,
                product2: newOrder.product2,
                quantity2: newOrder.quantity2,
                orderTime: formattedDate,
                formPayment: newOrder.formPayment,
                change: newOrder.change,
                creditOrDebit: newOrder.creditOrDebit,
                customerAddress: newOrder.customerAddress,
                additionalInfo: newOrder.additionalInfo,
                doneAt: null
            })
            this.setState({ showAddOrders: false }, this.loadOrders)
        } catch (e) {
            showError(e)
        }

    }

    render() {
        const today = moment().locale('pt-br ').format('ddd, D [de] MMMM',)
        return (
            <View style={styles.container}>
                <AddOrder
                    isVisible={this.state.showAddOrders}
                    onCancelOutModal={this.handlePressOutsideModal}
                    onCancel={() => this.setState({ showAddOrders: false })}
                    onSave={this.addOrder}
                />
                <DeletOrder
                    isVisible={this.state.showDeletOrder}
                    onCancelOutModal={this.handlePressOutsideModal}
                    onCancel={() => this.setState({ showDeletOrder: false })}
                    onDelete={this.onDelete}
                />
                <ImageBackground
                    source={month}
                    style={styles.background}
                >
                    <View style={styles.iconBar}>
                        <Pressable
                            onPress={this.toogleFilter}
                        >
                            <Icon
                                name={this.state.showDoneOrders
                                    ? 'eye'
                                    : 'eye-slash'
                                }
                                size={30}
                                color={commonStyles.colors.secondary}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.orderList}>
                    <FlatList
                        data={this.state.visibleOrders}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <Requests {...item}
                                toggleOrder={this.toggleOrder}
                                showDeleteOrder={this.showDeleteOrder}
                            />}
                    />
                </View>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#88A0D8' : commonStyles.colors.blueButtons
                        },
                        styles.addButton
                    ]}
                    onPress={() => this.setState({ showAddOrders: true })}
                >
                    <IconIonic
                        name="add-outline"
                        size={35}
                        color={commonStyles.colors.secondary}
                    />
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    orderList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: "flex-end"
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    },
    iconBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 60,
        marginHorizontal: 50
    },
    addButton: {
        position: "absolute",
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
