import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView,  } from "react-native";

import ProductList from "../components/ProductList";

export default class AddOrders extends Component {
    render () {
        return (
            <View style={styles.container}>
                <View styles>
                    <ScrollView>
                    <ProductList product='teste1' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
                    <ProductList product='teste2' value={30.00}/>
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