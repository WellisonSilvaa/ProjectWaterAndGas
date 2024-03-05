import React, { Component } from 'react'
import {
    ImageBackground,
    Text,
    StyleSheet
} from 'react-native'

import backgroundImage from '../../assets/imgs/login.jpg'

export default class Auth extends Component {
    render() {
        return (
            <ImageBackground
                source={backgroundImage}
            >
                <Text>

                </Text>
            </ImageBackground>
        )
    }
}