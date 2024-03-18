import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, } from "react-native";

import ProductList from "../components/ProductList";

const initialState = {
    quantidade: 0,
    num: 0,
}

export default class AddOrders extends Component {

    state = {
        ...initialState
    }


    render() {

        const inc = () => this.setState({num: this.state.num + 1})
        const dec = () => this.setState({num: this.state.num - 1})

        return (
            <View style={styles.container}>
                <View styles>
                    <ScrollView>
                        <ProductList product='Galão de água 20 Litros' value={10.00} inc={inc} dec={dec} num={this.state.num} />
                        <ProductList product='Fardo de água sem gás 510 ml' value={10.00} inc={inc} dec={dec} num={this.state.num} />
                        <ProductList product='Fardo de água com gás 510 ml' value={15.00} inc={inc} dec={dec} num={this.state.num} />
                        <ProductList product='Fardo de água sem gás 1 Litro' value={10.00} inc={inc} dec={dec} num={this.state.num} />
                        <ProductList product='Fardo de água com gás 1 Litro' value={15.00} inc={inc} dec={dec} num={this.state.num} />
                        <ProductList product='Gás 30 kg' value={95.00} inc={inc} dec={dec} num={this.state.num} />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    }
})